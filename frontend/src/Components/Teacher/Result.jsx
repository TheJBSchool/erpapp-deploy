import React, { useState, useEffect, useContext} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { all_teachers_names, save_subjects, save_examTypes, get_subjects, get_examTypes,get_studentsName } from '../../controllers/loginRoutes.js';
import { LoadingContext } from '../../App.js';
import SetResult from './SetResult.jsx';
import ViewResult from './ViewResult.jsx';

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
  const [tempNote, setTempNote]= useState('');
  const [studentNames, setStudentNames]= useState([]);

  const [newExamType, setNewExamType] = useState(false);

  const [addRowSubject, setAddRowSubject] = useState(false);
  const [addRowExam, setAddRowExam] = useState(false);

  const { isLoading, toggleLoading } = useContext(LoadingContext);

  useEffect(()=>{
    all_teachers_names(teacherData.underBy).then((resp)=>{
        // console.log("teacher name resp",resp)
        setTeacherNames(resp);
    })
    get_subjects(teacherData._id,teacherData.class_teacher).then((resp)=>{
      if(resp){
        setSubjectRows(resp[0]?.subjects);
      }
    })

    get_examTypes(teacherData._id,teacherData.class_teacher).then((resp)=>{
      // console.log(resp[0].exams);
      if(resp){
        setExamRows(resp[0]?.exams);
      }
    })

    get_studentsName(teacherData.underBy, teacherData.class_teacher).then((resp)=>{
      setStudentNames(resp);
    })

  },[])


  const handleSubjectChange = (event) => {
    setNewSubject(event.target.value);
  };

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleAddSubjectRow = () => {
    setAddRowSubject(true);
  };
  const handleSave = () => {
    if (newSubject && selectedTeacher) {
      const newRow = { subject: newSubject, teacher: selectedTeacher };
      setSubjectRows([...subjectRows, newRow]);
      setNewSubject('');
      setSelectedTeacher('');
      setAddRowSubject(false);
    }
  };

  const handleExamNameChange = (e) => {
    const selectedExam = e.target.value;

    if (selectedExam === 'create') {
      // Show input field for creating a custom exam type
      setNewExamType(true)
    }
    else{
      setNewExam(selectedExam);
    }
  };

  const handleTotalMarksChange = (event) => {
    setTotalMarks(event.target.value);
  };

  const handleAddExamRow = () => {
    setAddRowExam(true);
  };
  const handleSaveExam = () => {
    if (newExam && totalMarks) {
      const newRow = { examName: newExam, totalMarks: totalMarks };
      setExamRows([...examRows, newRow]);
      setNewExam('');
      setTotalMarks('');
      setNewExamType(false);
      setAddRowExam(false);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDeleteSubjectRow = (index) => {
    const updatedRows = [...subjectRows];
    updatedRows.splice(index, 1);
    setSubjectRows(updatedRows);
  };

  const handleDeleteExamRow = (index) => {
    const updatedRows = [...examRows];
    updatedRows.splice(index, 1);
    setExamRows(updatedRows);
  };

  const subjectSubmit = ()=>{
    const obj = {
        class : teacherData.class_teacher, 
        subjects : subjectRows,
        underBy: teacherData._id
    }
    // console.log("subject Submit", obj)
    toggleLoading(true);
    save_subjects(obj).then((resp) => {
      if (resp.status == 201) {
        setTempNote("Successful Submitted");
      } else {
        setTempNote("Failed to Submit!! ");
      }
    }).catch((error) => {
      setTempNote("Error during submit");
    }).finally(() => {
      toggleLoading(false); // Stop loading
    });

  }
    
  const examTypeSubmit = ()=>{
    const obj = {
        class : teacherData.class_teacher,
        exams : examRows,
        underBy: teacherData._id
    }
    // console.log("Exam Submit", obj)
    toggleLoading(true);
    save_examTypes(obj).then((resp) => {
      if (resp.status == 201) {
        setTempNote("Successful Submitted");
      } else {
        setTempNote("Failed to Submit!! ");
      }
    }).catch((error) => {
      setTempNote("Error during submit");
    }).finally(() => {
      toggleLoading(false); // Stop loading
    });
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
          <div>
            <label>
              <input
                type="radio"
                value="setResult"
                checked={selectedOption === 'setResult'}
                onChange={handleOptionChange}
              />
              Set Results
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
              { addRowSubject && ( <>

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
              </>)}

                {subjectRows && subjectRows.map((row, index) => (
                  <tr key={index}>
                    <td className="border-2 p-3 bg-blue-50 w-5/12">{row.subject}</td>
                    <td className="border-2 p-3 bg-blue-50 w-5/12">{row.teacher}</td>
                    <td className="border-2 p-3 ">
                      <button
                        onClick={() => handleDeleteSubjectRow(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md"
                      >
                        <img className='w-4 h4 text-black' src={require('../../img/delete.png')} alt="buttonpng" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="my-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 mr-4 text-white rounded-md"
            >
              Save
            </button>
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
                {addRowExam && (<>

                  <tr className='border-2 p-3'>
                    <td>
                      {newExamType? 
                        <input 
                          type="text"
                          name="examName"
                          placeholder="Create New Exam Type"
                          value={newExam}
                          onChange={handleExamNameChange}
                          className="p-2 border-2 rounded-md w-full"
                        /> :
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
                        <option value="create" className='text-blue-400'>Create Exam Type</option>

                      </select>
                      }
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
                </>)}

                  {examRows && examRows.map((row, index) => (
                    <tr key={index}>
                      <td className="border-2 p-3 bg-blue-50">{row.examName}</td>
                      <td className="border-2 p-3 bg-blue-50">{row.totalMarks}</td>
                      <td className="border-2 p-3 bg-transparent">
                        <button
                          onClick={() => handleDeleteExamRow(index)}
                          className="px-2 py-1 bg-red-500 text-white rounded-md"
                        >
                          <img className='w-4 h4 text-black' src={require('../../img/delete.png')} alt="buttonpng" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="my-4">
              <button
                onClick={handleSaveExam}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 mr-4 text-white rounded-md"
              >
                Save
              </button>
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

      {selectedOption === 'viewResult' && studentNames && examRows && (
        <ViewResult studentNames={studentNames} subjectRows={subjectRows} examRows={examRows} teacherData={teacherData}/>
      )}
      {selectedOption === 'setResult' && (
        <div >
          {examRows && subjectRows && studentNames && <SetResult studentNames={studentNames} subjectRows={subjectRows} examRows={examRows} teacherData={teacherData}/>}
        </div>
      )}
      <div>
        {tempNote && <p>{tempNote}</p>}
      </div>
    </div>
  )
}

export default Result;
