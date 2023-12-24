import React, { useState } from 'react';
import { getTeacherTimeTable } from '../../controllers/loginRoutes.js';

const TeacherTimeTable = ({adminId, teachers }) => {
    const [selectedTeacher, setSelectedTeacher] = useState();
    const [teacherTimetable, setTeacherTimetable] = useState([]);

    const [selectedDay, setSelectedDay] = useState(''); // Track selected day

    const handleTeacherChange = async (e) => {
        setSelectedTeacher(e.target.value);
        setSelectedDay(''); // Reset selected day when teacher changes

        if (e.target.value) {
            try {
                const timetableData_teacher = await getTeacherTimeTable(adminId, e.target.value);
                setTeacherTimetable(timetableData_teacher);
            } catch (error) {
                console.log("Error fetching timetable:", error);
            }
        }
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

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
        <div className="mt-4 shadow-md rounded-lg px-8 py-6">
            <div className='m-4 text-center'>
                <div className='flex'>
                    <label htmlFor="teachername" className='font-bold mr-4'>Teacher: </label>
                    <select
                        value={selectedTeacher}
                        onChange={(e) => handleTeacherChange(e)}
                        className="mb-2 w-fit"
                    >
                        <option value="">Select Teacher</option>
                        {teachers && teachers.map((teacher, index) => (
                            <option key={index} value={teacher.name}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedTeacher && (
                    <div className="overflow-x-auto  mt-4">
                        <div className='flex flex-col justify-center font-bold text-xl'>
                            <p className='bg-white'> {selectedTeacher}'s Time Table</p>
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
            </div>
        </div>
    );
};

export default TeacherTimeTable;
