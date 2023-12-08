import React, { useState, useEffect} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { all_teachers_names } from '../../controllers/loginRoutes.js';

const Teachers = [
  { id: 1, name: 'Teacher A' },
  { id: 2, name: 'Teacher B' },
  { id: 3, name: 'Teacher C' },
  // Add more teachers as needed
];

const Result = ({teacherData}) => {
  const [teacherNames, setTeacherNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [subjectRows, setSubjectRows] = useState([]);
  const [examRows, setExamRows] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [newExam, setNewExam] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [session , setSession] = useState('');

  useEffect(()=>{
    all_teachers_names().then((resp)=>{
        // console.log("teacher name resp",resp)
        setTeacherNames(resp);
    })

  },[])


  const handleSubjectChange = (event) => {
    setNewSubject(event.target.value);
  };

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleAddSubjectRow = () => {
    if (newSubject && selectedTeacher) {
      const newRow = { subject: newSubject, teacher: selectedTeacher };
      setSubjectRows([...subjectRows, newRow]);
      setNewSubject('');
      setSelectedTeacher('');
    }
  };

  const handleExamNameChange = (event) => {
    setNewExam(event.target.value);
  };

  const handleTotalMarksChange = (event) => {
    setTotalMarks(event.target.value);
  };

  const handleAddExamRow = () => {
    if (newExam && totalMarks) {
      const newRow = { examName: newExam, totalMarks: totalMarks };
      setExamRows([...examRows, newRow]);
      setNewExam('');
      setTotalMarks('');
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const subjectSubmit = ()=>{
    const obj = {
        class : teacherData.class_teacher, 
        subjects : subjectRows
    }
    console.log("subject Submit", obj)
    
  }
  const examTypeSubmit = ()=>{
    const obj = {
        class : teacherData.class_teacher,
        session : session,
        exams : examRows
    }
    console.log("Exam Submit", obj)
  }

  return (
    <div style={bgcolor2} className="border-2 border-red-300 rounded-lg p-10 h-full">
      {/* Header */}
      <div className="border-2 border-red-300 rounded-lg p-2 flex items-center">
        <img className="w-9 h-9 mr-2" src={require("../../img/result-icon.png")} alt="StudentLogo" />
        <h1 className="font-bold">Result</h1>
      </div>

      {/* Radio Buttons */}
      <div className="shadow-md p-4 mt-2">
        <div className='flex space-x-8'>
          <div>
            <label>
              <input
                type="radio"
                value="setSubjects"
                checked={selectedOption === 'setSubjects'}
                onChange={handleOptionChange}
              />
              Set Subjects
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="setExamTypes"
                checked={selectedOption === 'setExamTypes'}
                onChange={handleOptionChange}
              />
              Set Exam Types
            </label>
          </div>
        </div>
      </div>

      {/* Table for Subjects */}
      {selectedOption === 'setSubjects' && (
        <div className="mt-5">
          <div className="my-4">
            <button
              onClick={handleAddSubjectRow}
              className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md"
            >
              Add Row
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border-2 w-fit">
              <thead className='bg-green-100'>
                <tr>
                  <th className="border-2 p-3">Subject</th>
                  <th className="border-2 p-3">Teacher</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-2 p-3'>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter Subject Name"
                      value={newSubject}
                      onChange={handleSubjectChange}
                      className="p-2 border-2 rounded-md w-full"
                    />
                  </td>
                  <td>
                    <select
                      value={selectedTeacher}
                      onChange={handleTeacherChange}
                      className="p-2 border-2 rounded-md w-full"
                    >
                      <option value="">Select Teacher</option>
                      {teacherNames.length>0 && teacherNames.map((teacher) => (
                        <option key={teacher._id} value={teacher.name}>
                          {teacher.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                {subjectRows.map((row, index) => (
                  <tr key={index} className='bg-blue-50'>
                    <td className="border-2 p-3">{row.subject}</td>
                    <td className="border-2 p-3">{row.teacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="my-4">
            <button
              onClick={subjectSubmit}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Table for Exam Types */}
      {selectedOption === 'setExamTypes' && (
        <div>
          <div className="mt-5">
            <div className='my-4 flex items-center'>
              <label htmlFor="session" className="mr-2 block font-bold text-gray-600">Session: </label>
              <select
                id="session"
                className="w-fit border rounded-md py-2 px-3 focus:outline-none focus:border-red-200"
                name="session"
                value={session}
                onChange={(e)=>setSession(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="2022-23">2022-23</option>
                <option value="2023-24">2023-24</option>
              </select>
            </div>
            <div className="my-4">
              <button
                onClick={handleAddExamRow}
                className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md"
              >
                Add Row
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border-2 w-fit">
                <thead className='bg-green-100'>
                  <tr>
                    <th className="border-2 p-3">Exam Name</th>
                    <th className="border-2 p-3">Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-2 p-3'>
                    <td>
                      <select
                        className="w-fit border rounded-md py-2 px-3 focus:outline-none focus:border-red-200"
                        name="examName"
                        value={newExam}
                        onChange={handleExamNameChange}
                        required
                      >
                        <option value="">Select an option</option>

                        <option value="Quaterly Exam">Quaterly Exam</option>
                        <option value="Half yearly Exam">Half yearly Exam</option>
                        <option value="Annual Exam">Annual Exam</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Total Marks"
                        value={totalMarks}
                        onChange={handleTotalMarksChange}
                        className="p-2 border-2 rounded-md w-full"
                      />
                    </td>
                  </tr>

                  {examRows.map((row, index) => (
                    <tr key={index} className='bg-blue-50'>
                      <td className="border-2 p-3">{row.examName}</td>
                      <td className="border-2 p-3">{row.totalMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="my-4">
              <button
                onClick={examTypeSubmit}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Result;
