import React, {useState, useEffect} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import {student_results} from '../../controllers/loginRoutes.js';
import CircularProgress from '@mui/material/CircularProgress';

const Result = ({studentData}) => {
  const [results, setResults] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [selectedResults, setSelectedResults] = useState([]);


  useEffect(()=>{
    const studentclass = studentData.class + studentData.section;
    const obj = {
      studentId: studentData._id,
      adminId: studentData.underBy,
      stuclass: studentclass
    }
    student_results(obj).then((resp)=>{
      console.log("resp",resp);
      if(resp && resp.results){
        setResults(resp.results);
      }
    })
  },[])

  const handleSessionChange = (event) => {
    const session = event.target.value;
    setSelectedSession(session);
    if(selectedExamType){
      const filteredResults = results.filter(result => result.session === session && result.examType === selectedExamType);
      if(filteredResults){
        setSelectedResults(filteredResults);
      }
    }
  };

  const handleExamTypeChange = (event) => {
    const examType = event.target.value;
    setSelectedExamType(examType);

    // Filter the results based on both session and selected exam type
    const filteredResults = results.filter(result => result.session === selectedSession && result.examType === examType);
    if(filteredResults){
      setSelectedResults(filteredResults);
    }
  };

  const calculateExamTypeTotal = () => {
    const examTypeTotals = {};

    selectedResults.forEach(result => {
      Object.keys(result.marks).forEach(subject => {
        examTypeTotals[result.examType] = (examTypeTotals[result.examType] || 0) + parseInt(result.marks[subject], 10);
      });
    });

    return examTypeTotals;
  };

  const calculateTotalSubjectMarks = () => {
    const totalSubjectMarks = {};

    selectedResults.forEach(result => {
      const marks = result.marks;
      if (marks && typeof marks === 'object') {
        totalSubjectMarks[result.examType] = Object.keys(marks).length;
      }
    });

    return totalSubjectMarks;
  };

  const examTypeTotals = calculateExamTypeTotal();
  const totalSubjectMarks = calculateTotalSubjectMarks();

  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
        {/* header */}
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/schoolfee.png")} alt="StudentLogo" />
            <h1 className="font-bold ">Result</h1>
        </div>

        <div className='main'>
            <div className="mt-4">
                {results.length>0 && 
                  <div className="container mx-auto p-4">
                    <div className='flex justify-center items-center'>
                      <div className='flex items-center'>
                        <h2 className="font-bold mr-4">Select Session:</h2>
                        <select
                          className="border border-gray-300 rounded p-2 outline-none"
                          onChange={handleSessionChange}
                          value={selectedSession}
                        >
                          <option value="">Select Session</option>
                          {Array.from(new Set(results.map(result => result.session))).map(session => (
                            <option key={session} value={session}>{session}</option>
                          ))}
                        </select>
                      </div>
                      <div className='ml-4 flex items-center'>
                        <h2 className="font-bold mr-2">Select Exam Type:</h2>
                        <select
                          className="border border-gray-300 rounded p-2 outline-none"
                          onChange={handleExamTypeChange}
                          disabled={!selectedSession}
                          value={selectedExamType}
                        >
                          <option value="">Select Exam Type</option>
                          {Array.from(new Set(results.map(result => result.examType))).map(examType => (
                            <option key={examType} value={examType}>{examType}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {selectedResults.length > 0 && (
                      <div className='mt-4'>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 font-bold text-gray-500 uppercase tracking-wider text-center">Obtained Marks</th>
                                <th className="px-6 py-3 font-bold text-gray-500 uppercase tracking-wider text-center">Total Marks</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {Object.keys(selectedResults[0].marks).map(subject => (
                                <tr key={subject}>
                                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 ">{subject}</td>
                                  {selectedResults.map(result => (
                                      <td key={`${result.examType}-${subject}`} className="px-6 py-4 whitespace-nowrap text-md text-gray-500 text-center">{result.marks[subject]}</td>
                                  ))}
                                  <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 text-center ">{selectedResults[0].totalSubjectMarks}</td>
                                </tr>
                              ))}
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-md font-bold border-t-2 border-gray-400">Total Marks</td>
                                <td className="px-6 py-4 whitespace-nowrap font-bold text-md border-t-2 border-gray-400 text-center">{examTypeTotals[selectedResults[0].examType]}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-md font-bold border-t-2 border-gray-400 text-center">{selectedResults[0].totalSubjectMarks * totalSubjectMarks[selectedResults[0].examType]}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className='mt-4 bg-slate-100 p-2'>
                            <h1 className='font-bold text-gray-600'>Percentage: <strong className='text-green-600'>{((examTypeTotals[selectedResults[0].examType])/(selectedResults[0].totalSubjectMarks * totalSubjectMarks[selectedResults[0].examType])*100).toFixed(2)}%</strong></h1>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedSession && selectedExamType && selectedResults.length===0 && (
                      <div className='flex justify-center mt-6 font-bold text-red-500'>
                        <p>This Result is not yet Declared !!!!!! </p>
                      </div>
                    )}
                  </div>
                }
                {results.length===0 && 
                  <div className='flex justify-center p-10'>
                    <CircularProgress />
                  </div>
                }
            </div>
        </div>

    </div>
  )
}

export default Result