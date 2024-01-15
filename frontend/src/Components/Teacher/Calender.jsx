import React, { useState } from 'react';
import { bgcolor1, bgcolor2 } from "../Home/custom.js";
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, endOfMonth, isSameMonth, isSameDay, getDay } from 'date-fns';
import 'tailwindcss/tailwind.css';


const Calendar = ({ students }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStudents, setSelectedStudents]= useState();

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);

    let startingDay = getDay(startDate); // Get the starting day index of the month

    let rows = [];
    let days = [];
    let day = startDate;

    // Push empty cells before the actual month starts based on the starting day index
    if (startingDay !== 0) {
      const prevMonthDays = getDaysInMonth(subMonths(startDate, 1));
      const prevMonthStart = subMonths(startDate, 1);

      for (let i = startingDay - 1; i >= 0; i--) {
        days.push(new Date(prevMonthStart.getFullYear(), prevMonthStart.getMonth(), prevMonthDays - i));
      }
    }

    while (day <= endDate) {
      for (let i = startingDay; i < 7; i++) {
        days.push(day);
        day = new Date(day);
        day.setDate(day.getDate() + 1);
      }

      rows.push(days);
      days = [];
      startingDay = 0;
    }

    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-around items-center mb-4">
          <button className="mr-2" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <img className='w-8 h-8' src={require("../../img/leftarrow.png")} alt="" />
          </button>
          <h2 className="text-lg font-bold">
            {format(monthStart, 'MMMM yyyy')}
          </h2>
          <button className="ml-2" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            <img className='w-8 h-8' src={require("../../img/rightarrow.png")} alt="" />
          </button>
        </div>
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2 px-2">Sunday</th>
              <th className="border border-gray-300 py-2 px-2">Monday</th>
              <th className="border border-gray-300 py-2 px-2">Tueday</th>
              <th className="border border-gray-300 py-2 px-2">Wednesday</th>
              <th className="border border-gray-300 py-2 px-2">Thuday</th>
              <th className="border border-gray-300 py-2 px-2">Friday</th>
              <th className="border border-gray-300 py-2 px-2">Saturday</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((week, rowIndex) => (
                <tr key={rowIndex}>
                {week.map((day, dayIndex) => (
                    <td key={dayIndex} className={`border border-gray-300 p-2 ${!day || !isSameMonth(day, monthStart) ? 'bg-gray-100' : ''}`}>
                    {day && (
                        <div className="relative">
                        <span className="text-sm">{format(day, 'd')}</span>
                        {students && students.map((student) => {
                            const studentDOB = student.DOB ? new Date(student.DOB) : null;
                            if (studentDOB && studentDOB.getMonth() === day.getMonth() && studentDOB.getDate() === day.getDate()) {
                            return (
                                <div
                                onClick={() =>handleDayClick(day)}
                                key={student._id}
                                className="absolute top-0 -left-2 w-10 h-8 border-2 border-red-300 rounded-full cursor-pointer"
                                title={`${student.name}'s Birthday`}
                                ></div>
                            );
                            }
                            return null;
                        })}
                        </div>
                    )}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>

        </table>
      </div>
    );
  };

  const handleDayClick = (clickedDay) => {
    const studentsWithBirthday = students.filter((student) => {
      const studentDOB = student.DOB ? new Date(student.DOB) : null;
      return studentDOB && studentDOB.getMonth() === clickedDay.getMonth() && studentDOB.getDate() === clickedDay.getDate();
    });
    setSelectedStudents(studentsWithBirthday);
  };

  return (
    <div style={bgcolor2} className=" border-2 mt-5 border-red-300 rounded-lg flex flex-row p-10 justify-between ">

        <div className="container mx-auto p-4">
            {renderCalendar()}
        </div>
        {selectedStudents && (
          <div className='text-md w-4/12'>
            {selectedStudents.map((selectedStudent,ind) => (  
            <div key={ind} className='shadow-md mb-4 p-4'>
              <h1 className='font-bold'>{selectedStudent.name}'s Bithday</h1>
              <hr className='p-[0.6px] mb-4 bg-slate-500'/>
              <div>
                  <div>
                      <span className='font-semibold mr-2'>Class: </span>
                      <span>{selectedStudent?.class} &nbsp;</span>
                      <span>{selectedStudent?.section}</span>
                  </div>
                  <div>
                      <span className='font-semibold mr-2'>DOB: </span>
                      <span>{selectedStudent?.DOB}</span>
                  </div>
                  <div>
                      <span className='font-semibold mr-2'>Age: </span>
                      {selectedStudent && selectedStudent.DOB &&
                          Math.floor((new Date() - new Date(selectedStudent.DOB)) / (365.25 * 24 * 60 * 60 * 1000))
                      }
                  </div>
                  <div>
                      <span className='font-semibold mr-2'>Mobile No: </span>
                      <span>{selectedStudent?.contact}</span>
                  </div>
              </div>
            </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default Calendar;
