import React, { useState, useEffect, useContext } from 'react';
import { save_result, get_result, lock_result, unlock_req } from '../../controllers/loginRoutes';
import { LoadingContext } from '../../App.js';

const SetResult = ({studentNames, subjectRows, examRows, teacherData}) => {
  const [marks, setMarks] = useState({});
  const [examTypeSelect, setExamTypeSelect] = useState('');
  const [session, setSession]= useState('');
  const [totalMarks, setTotalMarks] = useState(0);
  const [currentFetchedResult, setCurrentFetchedResult] = useState({});
  const [inputError, setInputError] = useState('');

  const { isLoading, toggleLoading } = useContext(LoadingContext);

  const handleMarksChange = (studentId, subjectId, value) => {
    const updatedMarks = { ...marks };
    if (!updatedMarks[studentId]) {
      updatedMarks[studentId] = {};
    }
    updatedMarks[studentId][subjectId] = value;
    setMarks(updatedMarks);
  };

  const handleExamNameChange = (e) => {
    const selectedExamName = e.target.value;
    setExamTypeSelect(selectedExamName);

    const selectedExam = examRows.find((item) => item.examName === selectedExamName);
    if (selectedExam) {
      setTotalMarks(selectedExam.totalMarks);
    } else {
      setTotalMarks(0);
    }
  };

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getCurrentYear = () => {
      const currentYear = new Date().getFullYear();
      const nextYear = currentYear + 1;
      const prevYear = currentYear - 1;
      const prevprevYear = currentYear - 2;

      const currentYearOption = `${currentYear}-${nextYear.toString().slice(2)}`;
      const nextYearOption = `${nextYear}-${(nextYear + 1).toString().slice(2)}`;
      const prevYearOption = `${prevYear}-${currentYear.toString().slice(2)}`;
      const dayBeforePrevYearOption = `${prevprevYear}-${prevYear.toString().slice(2)}`;

      setOptions([dayBeforePrevYearOption, prevYearOption, currentYearOption, nextYearOption]);
    };

    getCurrentYear();
  }, []);

  useEffect(()=>{
    if(session && examTypeSelect){
        const obj = {
            class: teacherData.class_teacher,
            session: session,
            examType:examTypeSelect
        }
        get_result(teacherData.underBy, obj).then((resp)=>{
            if(resp.length>0){
                setCurrentFetchedResult(resp[0]);
                setMarks(resp[0].studentsMarks)
            }
            else{
                setCurrentFetchedResult({});
                setMarks({});
            }
        })
    }

  },[session,examTypeSelect])

  const handleChange = (e) => {
    setSession(e.target.value)
  };

  const resultSubmit = (e) => {
    toggleLoading(true);
    const obj = {
        class: teacherData.class_teacher,
        examType: examTypeSelect,
        totalSubjectMarks: totalMarks,
        session: session,
        studentsMarks: marks,
        underBy: teacherData.underBy,
        createdBy: {
          teacherId: teacherData._id,
          name: teacherData.name,
        },
        approved: false,
        locked: false,
        editable:false,
        last_modified: new Date(),
    }
    // console.log('result',obj);
    save_result(obj).then((resp)=>{
        if(resp){
          setCurrentFetchedResult(resp.resp)
        }
        toggleLoading(false);
    })
  };

  const handleLock = ()=>{
    lock_result(currentFetchedResult._id).then((resp)=>{
      if(resp){
        alert("Result Locked Successfully");
      }
      setCurrentFetchedResult(resp);
    })
  }

  const handleUnlock = ()=>{
    const obj = {
      type: "unlock",
      date_created: new Date(),
      underBy: teacherData.underBy,
      createdBy: {
        teacherId: teacherData._id,
        name: teacherData.name,
      },
      resultId: currentFetchedResult._id
    }
    unlock_req(obj).then((resp)=>{
      toggleLoading(true);
      console.log("unlock req",resp)
      if(resp.status === 201){
        alert("Unlock Request sent to Admin Successfully!!");
        toggleLoading(false);
      }
      else{
        alert("Failed to sent Unlock Request!!");
        toggleLoading(false);
      }
    })
  }

  return (
    <div>
      <div className="flex justify-evenly p-4">
        <div>
          <label
            htmlFor="session"
            className="mb-1 mr-2 font-bold text-gray-600"
          >
            Session:
          </label>
          <select
            id="session"
            onChange={handleChange}
            className="w-fit border rounded-md py-2 px-3 focus:outline-none focus:border-red-200"
          >
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="examType"
            className="mb-1 mr-2 font-bold text-gray-600"
          >
            Exam Type:
          </label>
          <select
            id="examType"
            className="w-fit border rounded-md py-2 px-3 focus:outline-none focus:border-red-200"
            value={examTypeSelect}
            onChange={handleExamNameChange}
            required
          >
            <option value="">Select an option</option>
            {examRows.map((item) => (
              <option key={item._id}>{item.examName}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full ">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-lime-200">Students</th>
              {subjectRows.map((subject) => (
                <th
                  key={subject._id}
                  title={"Faculty: " + subject.teacher}
                  className="border px-4 py-2 bg-pink-200"
                >
                  {subject.subject}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentNames.map((student) => (
              <tr key={student._id}>
                <td className="border px-4 py-2 bg-lime-100">{student.name}</td>
                {subjectRows.map((subject) => (
                  <td
                    key={subject._id}
                    className="border px-4 py-2 bg-yellow-100"
                  >
                    <input
                      type="number"
                      className="w-20 p-1 outline-none"
                      disabled={
                        !examTypeSelect ||
                        !session ||
                        (currentFetchedResult &&
                          session &&
                          currentFetchedResult.examType &&
                          currentFetchedResult.examType === examTypeSelect &&
                          currentFetchedResult.session === session &&
                          currentFetchedResult.editable === false )
                      }
                      min={0}
                      max={totalMarks}
                      value={marks[student._id]?.[subject.subject] || ""}
                      onChange={(e) => {
                        const inputValue = parseInt(e.target.value);
                        if (!isNaN(inputValue)) {
                          if (inputValue >= 0 && inputValue <= totalMarks) {
                            handleMarksChange(student._id, subject.subject, inputValue);
                            setInputError(''); // Clear any previous error
                          } else if (inputValue < 0) {
                            setInputError('Value should be greater than or equal to 0');
                          } else {
                            setInputError(`Value should be less than or equal to ${totalMarks}`);
                          }
                        } else {
                          handleMarksChange(student._id, subject.subject, "");
                          setInputError('Please enter a valid number or Leave it in case of Absent');
                        }
                      }}
                    />
                    
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {inputError && ( // Display error message if inputError is not empty
          <div className='mt-4'>
              <span className="text-red-500 text-sm">* {inputError}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-end mt-2">
        <div className='flex justify-end'>

          <button
            className={`px-4 py-2 bg-green-400 hover:bg-green-500 rounded-lg ${
              currentFetchedResult &&
              session &&
              currentFetchedResult.examType &&
              currentFetchedResult.examType === examTypeSelect &&
              currentFetchedResult.session === session &&
              currentFetchedResult.editable === false &&
              currentFetchedResult.approved === false ||
              currentFetchedResult.locked === true
                ? "hidden"
                : ""
            } `}
            onClick={resultSubmit}
          >
            Submit for Approval
          </button>

          {currentFetchedResult && session &&
          currentFetchedResult.examType &&
          currentFetchedResult.examType === examTypeSelect &&
          currentFetchedResult.session === session && currentFetchedResult.approved === true && currentFetchedResult.locked === false && <button className={`ml-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-lg `} onClick={handleLock}>Lock</button>}

          {currentFetchedResult && session &&
          currentFetchedResult.examType &&
          currentFetchedResult.examType === examTypeSelect &&
          currentFetchedResult.session === session && currentFetchedResult.approved === true && currentFetchedResult.locked === true && <button className={`ml-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-lg `} onClick={handleUnlock}>Request to Unlock</button>}

        </div>
        {currentFetchedResult &&
          session &&
          currentFetchedResult.examType &&
          currentFetchedResult.examType === examTypeSelect &&
          currentFetchedResult.session === session &&
          (currentFetchedResult.editable === false && currentFetchedResult.approved == false ? (
            <p className="text-red-400">
              *This Result is yet to approved by Admin
            </p>
          ) : (
            ""
          ))}
      </div>
    </div>
  );
};

export default SetResult;