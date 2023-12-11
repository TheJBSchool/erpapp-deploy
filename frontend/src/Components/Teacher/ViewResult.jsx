import React, { useState, useEffect } from 'react';
import { save_result, get_result } from '../../controllers/loginRoutes';

const ViewResult = ({studentNames, subjectRows, examRows, teacherData}) => {
  const [marks, setMarks] = useState({});
  const [examTypeSelect, setExamTypeSelect] = useState('');
  const [session, setSession]= useState('');
  const [totalMarks, setTotalMarks] = useState(0);


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

      const currentYearOption = `${currentYear}-${nextYear.toString().slice(2)}`;
      const nextYearOption = `${nextYear}-${(nextYear + 1).toString().slice(2)}`;
      const prevYearOption = `${prevYear}-${currentYear.toString().slice(2)}`;

      setOptions([prevYearOption, currentYearOption, nextYearOption]);
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
        get_result(obj).then((resp)=>{
            if(resp.length>0){
                setMarks(resp[0].studentsMarks)
            }
            else{
                setMarks({})
            }
        })
    }

  },[session,examTypeSelect])

  const handleChange = (e) => {
    setSession(e.target.value)
  };


  return (
    <div>
        <div className='flex justify-evenly p-4'>
            <div>
                <label htmlFor="session" className='mb-1 mr-2 font-bold text-gray-600'>Session:</label>
                <select id="session" onChange={handleChange} className='w-fit border rounded-md py-2 px-3 focus:outline-none focus:border-red-200'>
                    <option value="">Select an option</option>
                    {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="examType" className='mb-1 mr-2 font-bold text-gray-600'>Exam Type:</label>
                <select
                    id='examType'
                    className="w-fit border rounded-md py-2 px-3 focus:outline-none focus:border-red-200"
                    value={examTypeSelect}
                    onChange={handleExamNameChange}
                    required
                >
                <option value="">Select an option</option>
                {examRows.map((item)=>(
                    <option key={item._id} >{item.examName}</option>
                ))}
                </select>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full ">
                <thead>
                <tr>
                    <th className="border px-4 py-2 bg-lime-200">Students</th>
                    {subjectRows.map(subject => (
                    <th key={subject._id} title={subject.teacher} className="border px-4 py-2 bg-pink-200">{subject.subject}</th>
                    ))}
                    <th className="border px-4 py-2 bg-lime-200">Total Marks Obtained</th>
                    <th className="border px-4 py-2 bg-lime-200">Percentage</th> {/* Added column for Percentage */}
                </tr>
                </thead>
                <tbody>
                {studentNames.map(student => {
                    // Calculate total marks obtained by each student
                    const totalMarksObtained = subjectRows.reduce((total, subject) => {
                    const mark = marks[student._id]?.[subject.subject];
                    return total + (mark ? parseInt(mark) : 0);
                    }, 0);

                    // Calculate percentage based on total marks obtained and total possible marks
                    const percentage = ((totalMarksObtained / (totalMarks* subjectRows.length)) * 100).toFixed(2);

                    return (
                    <tr key={student._id}>
                        <td className="border px-4 py-2 bg-lime-100">{student.name}</td>
                        {subjectRows.map(subject => (
                        <td key={subject._id} className="border px-4 py-2 bg-yellow-100">
                            <span>{marks[student._id]?.[subject.subject] || ''}</span>
                        </td>
                        ))}
                        <td className="border px-4 py-2 bg-lime-100">{totalMarksObtained}/{totalMarks*subjectRows.length}</td>
                        <td className="border px-4 py-2 bg-lime-100">{percentage}%</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ViewResult;