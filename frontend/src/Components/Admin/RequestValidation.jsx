import React, {useState, useEffect, useContext} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { result_approval,all_students_names, approve_result} from '../../controllers/loginRoutes.js';
import { LoadingContext } from '../../App.js';

const ResquestValidation = ({adminId}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [resultRequests, setResultRequests] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [resultInd, setResultInd] = useState(-1);
  const [studentsData, setStudentsData] = useState([]);

  const { isLoading, toggleLoading } = useContext(LoadingContext);

  useEffect(()=>{
    result_approval(adminId).then((resp)=>{
      setResultRequests(resp);
    })

    all_students_names().then((resp) => {
      setStudentsData(resp);
    }).catch((error) => {
      console.error('Error fetching students:', error);
    });
  },[])

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleViewResult = (item,index) => {
    setSelectedResult(item);
    setResultInd(index);
  };

  const approveResult = (resultId) =>{
    toggleLoading(true);
    approve_result(resultId,adminId).then((resp)=>{
      console.log("approve result",resp)
      setResultRequests(resp);

      toggleLoading(false);
    })
  }
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
        {/* header */}
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/requestvalidation.png")} alt="StudentLogo" />
            <h1 className="font-bold ">Request Validation</h1>
        </div>
        <div className="shadow-md p-4 mt-2">
          <div className='flex space-x-8'>
            <div>
              <label>
                <input
                  type="radio"
                  value="result"
                  checked={selectedOption === 'result'}
                  onChange={handleOptionChange}
                />
                Result Approvals
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
            <div>
              <label>
                <input
                  type="radio"
                  value="viewResult"
                  checked={selectedOption === 'viewResult'}
                  onChange={handleOptionChange}
                />
                View Results
              </label>
            </div>
          </div>
      </div>
      {selectedOption === 'result' && (
        <div>
          {resultRequests.length>0 && resultRequests.map((item,ind)=>{
            return <div key={ind} className=' bg-slate-100 border-2 rounded-lg m-2 p-2 grid grid-cols-3 gap-4'>
              <p>Session : {item.session}</p>
              <p>Class: {item.class}</p>
              <p>Examination: {item.examType}</p>
              <p>Created By : {item.createdBy.name}</p>
              <div>
                <button className='px-2 rounded-lg bg-sky-200 hover:bg-sky-300 text-sm' onClick={() => handleViewResult(item,item._id)}>View Result</button>
              </div>
              {selectedResult && resultInd===item._id && (
                <div className='mt-4 col-span-3 overflow-auto'>
                  <table className='table-auto border-collapse border border-gray-500'>
                    <thead>
                      <tr>
                        <th className='border border-gray-500 px-4 py-2'>Student Name</th>
                        {/* Assuming subjects are consistent across all students */}
                        {Object.keys(selectedResult.studentsMarks[Object.keys(selectedResult.studentsMarks)[0]]).map((subject) => (
                          <th key={subject} className='border border-gray-500 px-4 py-2'>{subject}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(selectedResult.studentsMarks).map((studentId) => {
                        const studentName = studentsData.find((student) => student._id === studentId)?.name || 'Unknown';
                        return (
                          <tr key={studentId}>
                            <td className='border border-gray-500 px-4 py-2'>{studentName}</td>
                            {Object.entries(selectedResult.studentsMarks[studentId]).map(([subject, marks]) => (
                              <td key={subject} className='border border-gray-500 px-4 py-2'>{marks}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {resultInd===item._id && 
                <div className='col-span-3 flex justify-end'>
                  <button className='px-2 py-1 bg-green-400 hover:bg-green-500 rounded-lg' onClick={()=>approveResult(item._id)}>Approve</button>
                </div>
              }
            </div>
          })}
        </div>
      )}
    </div>
  )
}

export default ResquestValidation