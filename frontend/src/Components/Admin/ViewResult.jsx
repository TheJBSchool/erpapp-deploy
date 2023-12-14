import React from 'react'

const ViewResult = ({selectedResult, studentsData}) => {
  return (
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
  )
}

export default ViewResult