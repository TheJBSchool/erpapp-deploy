import React, { useState, useEffect } from 'react';
import { bgcolor2 } from "../Home/custom.js";
import {all_teachers} from '../../controllers/loginRoutes.js';
import TeacherTimeTable from './TeacherTimeTable.jsx';
import { getTimetableByClass, saveTimetable } from '../../controllers/loginRoutes.js';

const TimeTable = ({adminId}) => {
  const [msgNote, setMsgNote] = useState('');
  const [success, setSuccess]= useState(false);
  const [teachers, setTeachers] = useState([]);
  const [timeTableType, setTimeTableType] = useState('class_wise');

  useEffect(() => {
    all_teachers(adminId).then((resp) => {
      setTeachers(resp.all_teachers);
      // console.log("tearcher data ", resp.all_teachers);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
 

  const classNames = [
    'Pre-Nursery', 'Nursery', 'LKG', 'UKG',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
  ];
  const [classDropdown, setClassDropdown] = useState('')
  const initialCell = [
    { day:'Mon', startTime: '', endTime: '', type: '', teacher: '', subject: '' },
    { day:'Tues', startTime: '', endTime: '', type: '', teacher: '', subject: '' },
    { day:'Wed', startTime: '', endTime: '', type: '', teacher: '', subject: '' },
    { day:'Thus', startTime: '', endTime: '', type: '', teacher: '', subject: '' },
    { day:'Fri', startTime: '', endTime: '', type: '', teacher: '', subject: '' },
    { day:'Sat', startTime: '', endTime: '', type: '', teacher: '', subject: '' },
  ];

  const [timetable, setTimetable] = useState([]);

  const addRow = () => {
    // const newRow = Array(7).fill({ ...initialCell });
    setTimetable([...timetable, initialCell]);
  };

  const handleAddBreak = (rowIndex, cellIndex) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[rowIndex][cellIndex].type = 'Break';
    setTimetable(updatedTimetable);
  };
  const handleReset= (rowIndex)=>{
    const updatedTimetable = [...timetable];
    updatedTimetable[rowIndex] = initialCell;
    setTimetable(updatedTimetable);
  }

  const handleAddPeriod = (rowIndex, cellIndex) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[rowIndex][cellIndex].type = 'Period';
    setTimetable(updatedTimetable);
  };

  const handleTeacherChange = (rowIndex, cellIndex, event) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[rowIndex][cellIndex].teacher = event.target.value;
    setTimetable(updatedTimetable);
  };

  const handleSubjectChange = (rowIndex, cellIndex, event) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[rowIndex][cellIndex].subject = event.target.value;
    setTimetable(updatedTimetable);
  };

  const handleTimeChange = (rowIndex, field, event) => {
    const updatedTimetable = [...timetable];
    for(var i=0;i<6;i++){
      updatedTimetable[rowIndex][i][field] = event.target.value;
    }
    setTimetable(updatedTimetable);
  };
  

  const handleClass = (e)=>{
    setClassDropdown(e.target.value);
  }
  // console.log(timetable)
  const changeTimeTableType = (e)=>{
    setTimeTableType(e.target.value)

  }
  //  useEffect(() => {
  //   console.log(timetable);
  // },[timetable])

  //backend api call
  const fetchTimetable = async () => {
    if (classDropdown) {
      try {
        const timetableData = await getTimetableByClass(adminId, classDropdown); // Fetch timetable data by class
        if (timetableData.length > 0) {
          setTimetable(timetableData); // Set existing timetable for editing
        } else {
          setTimetable([]); // No timetable found, provide an interface to create a new timetable
        }
      } catch (error) {
        console.log("Error fetching timetable:", error);
      }
    }
  };

  useEffect(() => {
    fetchTimetable(); // Fetch timetable data on initial load
  }, [classDropdown]);

  const saveOrUpdateTimetable = async () => {
    // console.log("Going to save: ",timetable)
    try {
      await saveTimetable(adminId, classDropdown, timetable); // Save or update the timetable for the selected class
      setMsgNote('Time Table set Successfully');
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.log("Error on saving:", error);
    }
  };

  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
      {/* Header */}
      <div className="border-2 border-red-300 rounded-lg p-2 flex items-center">
        <h1 className="font-bold">Time Table</h1>
      </div>
      <div className='flex justify-end '>
        <select
          value={timeTableType}
          onChange={(e)=>changeTimeTableType(e) }
          className="w-fit m-4 rounded-xl p-1 "
        >
          <option value="class_wise">Class wise Time Table</option>
          <option value="teacher_wise">Teacher's Time Table</option>
        </select>
        
      </div>

      {timeTableType=== "teacher_wise" && (
        <TeacherTimeTable adminId={adminId} teachers={teachers}/>
      )}

      


      {timeTableType=== "class_wise" && (
      <div className="mt-4 shadow-md rounded-lg px-8 py-6 ">
        <div className='m-4 text-center'>
          <label htmlFor="teachername" className='font-bold'>Class: </label>
          <select
            value={classDropdown}
            className="w-fit mx-2 p-1 rounded"
            onChange={(e)=>handleClass(e)}
          >
            <option value="">Select class</option>
            {classNames.map((className, index) => (
              ['A', 'B', 'C', 'D'].map((section, secIndex) => (
                <option key={`${index}-${secIndex}`} value={`${className}${section}`}>{className} - {section}</option>
              ))
            ))}
          </select>
          
        </div>
        <button onClick={addRow} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">
          Add Row
        </button>
        <div className="table-container" style={{ overflowX: 'auto' }}>
        <table className="table-auto min-w-max bg-white">
          <thead>
            <tr className='bg-slate-300'>
              <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Monday</th>
                <th className="border px-4 py-2">Tuesday</th>
                <th className="border px-4 py-2">Wednesday</th>
                <th className="border px-4 py-2">Thursday</th>
                <th className="border px-4 py-2">Friday</th>
                <th className="border px-4 py-2">Saturday</th>
                <th className="border px-4 py-2 underline">Reset</th>
            </tr>
          </thead>
          <tbody>
            {timetable.length>0 && timetable.map((row, rowIndex) => (
              <tr key={rowIndex} >
                <td className="border px-4 py-2 flex ">
                  <input
                    type="time"
                    value={row[0].startTime}
                    onChange={(event) => handleTimeChange(rowIndex, 'startTime', event)}
                    className="w-full mx-1 bg-transparent"
                  />
                  <p>to</p>
                  <input
                    type="time"
                    value={row[0].endTime}
                    onChange={(event) => handleTimeChange(rowIndex, 'endTime', event)}
                    className="w-full mx-1 bg-transparent"
                  />
                </td>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border px-4 py-2 text-sm text-center">
                    {cell.type === 'Break' ? 'Break' : (
                      <div>
                        {cell.type === 'Period' ? (
                          <div className=''>
                            <div className='flex'>
                              <label htmlFor="teachername" className='font-bold'>Teacher: </label>
                              <select
                                value={cell.teacher}
                                onChange={(event) => handleTeacherChange(rowIndex, cellIndex, event)}
                                className="mb-2 w-fit"
                              >
                                <option value="">Select Teacher</option>
                                {teachers && teachers.map((teacher, index) => (
                                  <option key={index} value={teacher.name}>
                                    {teacher.name}
                                  </option>
                                ))}
                                {/* Add options for teachers */}
                              </select>
                              
                            </div>
                            {cell.teacher && (
                              <div className='flex'>
                                <label htmlFor="subject" className='font-bold'>Subject: </label>
                                <select
                                  value={cell.subject}
                                  onChange={(event) => handleSubjectChange(rowIndex, cellIndex, event)}
                                  className="w-fit"
                                >
                                  <option value="">Select Subject</option>
                                  {teachers && teachers.find((teacher) => teacher.name === cell.teacher)?.teaching_subject.map((subject, index) => (
                                      <option key={index} value={subject}>
                                        {subject}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            )}
                          </div>
                        ) : (
                            <div className='flex flex-col text-sm items-center'>
                              <button
                                onClick={() => handleAddPeriod(rowIndex, cellIndex)}
                                className="bg-blue-500 text-white px-2 py-1 rounded mb-2 w-fit "
                              >
                                Period
                              </button>
                              <button
                                onClick={() => handleAddBreak(rowIndex, cellIndex)}
                                className="bg-gray-500 text-white px-2 py-1 rounded w-fit"
                              >
                                Break
                              </button>
                            </div>
                            
                        )}
                      </div>
                    )}
                  </td>
                  
                ))}
                <td>
                  <div className='flex justify-center '>
                      <button
                        onClick={() => handleReset(rowIndex)}
                        className="w-fit bg-orange-400  text-black  rounded text-right text-sm p-1"
                      >
                        Reset
                      </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        </div>
        <div className="text-end">
          <button onClick={saveOrUpdateTimetable} className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
            Submit
          </button>
        </div>
        <div className="text-start">
          {success && (
            <p className='text-green-500'>{msgNote}</p>
          )}
        </div>
      </div>
      )}
    </div>
  );
};

export default TimeTable;
