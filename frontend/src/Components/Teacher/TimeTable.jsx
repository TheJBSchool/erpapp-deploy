import React, { useEffect, useState } from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { getTeacherTimeTable, getTimetableByClass } from '../../controllers/loginRoutes.js';

const TimeTable = ({ teacherData}) => {
    const [classTimeTable, setClassTimeTable] = useState();
    const [teacherTimetable, setTeacherTimetable] = useState();
    const [selectedDay, setSelectedDay] = useState('');
    const [timeTableType, setTimeTableType] = useState('personal');

    useEffect(()=>{
        getTeacherTimeTable(teacherData.underBy).then((resp)=>{
            setTeacherTimetable(resp);
        })
        getTimetableByClass(teacherData.underBy,teacherData.class_teacher).then((resp) => {
            // console.log("resp",resp)
            if(resp){
                setClassTimeTable(resp)
            }
        })

    },[])
    const handleDayClick = (day) => {
        setSelectedDay(day);
    };
        // console.log("classTimeTable",classTimeTable)

    const filteredTimetable = selectedDay
        ? teacherTimetable.filter((item) => item.days.includes(selectedDay))
        : [];

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const sortedTimetable = [...filteredTimetable].sort((a, b) => {
        // Assuming the time format is HH:MM AM/PM
        const timeA = new Date(`01/01/2023 ${a.time}`);
        const timeB = new Date(`01/01/2023 ${b.time}`);
        return timeA - timeB;
    });
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
      {/* Header */}
        <div className="border-2 border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/timetable.png")} alt="StudentLogo" />
            <h1 className="font-bold ">Time Table</h1>
        </div>
        <div className='flex justify-end '>
            <select
            value={timeTableType}
            onChange={(e)=>setTimeTableType(e.target.value) }
            className="w-fit m-4 rounded-xl p-1 "
            >
            <option value="personal">Personal Time Table</option>
            <option value="class_wise">Class - {teacherData.class_teacher} Time Table</option>
            </select>
        </div>

        {timeTableType=== "personal" && (
        <div className="overflow-x-auto  mt-4">
            <div className='flex flex-col justify-center font-bold text-xl'>
                <div className='flex my-4 justify-center'>
                    {daysOfWeek.map((day) => (
                            <div
                                key={day}
                                className={`border p-3 bg-blue-200 cursor-pointer ${
                                    selectedDay === day ? 'bg-yellow-300' : ''
                                }`}
                                onClick={() => handleDayClick(day)}
                            >
                                {day}
                            </div>
                        ))}
                </div>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border p-3 bg-blue-300">Time</th>
                        <th className="border p-3 bg-blue-200">Subject</th>
                        <th className="border p-3 bg-blue-300">Class</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {sortedTimetable.map((item, index) => (
                        <tr key={index}>
                            <td className="border p-3 bg-blue-300">{item.time}</td>
                            <td className="border p-3 bg-blue-200">{item.subject}</td>
                            <td className="border p-3 bg-blue-300">{item.class}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
        {timeTableType=== "class_wise" && classTimeTable && (
            <div className='mt-4'>
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
                        </tr>
                    </thead>
                    <tbody>
                        {classTimeTable && classTimeTable.map((row, rowIndex) => (
                            <tr key={rowIndex} >
                                <td className="border px-4 py-2 ">
                                    <p>{row[0].startTime} to {row[0].endTime}</p>
                                </td>
                                {row  && row.map((item,ind)=>(
                                    <td key={ind} className="border px-4 py-2 ">
                                        {item.type === "Break" ? (
                                            <p className='text-red-400'>Break </p> 
                                        ):(
                                            <div>
                                                <p className='text-blue-400'>{item.subject} </p> 
                                                <p> {item.teacher}</p>
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  )
}

export default TimeTable