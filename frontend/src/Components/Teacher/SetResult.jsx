import React, { useState } from 'react';

const SetResult = ({studentNames, subjectRows, examRows}) => {
  const [marks, setMarks] = useState({});

  const handleMarksChange = (studentId, subjectId, value) => {
    const updatedMarks = { ...marks };
    if (!updatedMarks[studentId]) {
      updatedMarks[studentId] = {};
    }
    updatedMarks[studentId][subjectId] = value;
    setMarks(updatedMarks);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-lime-200">Students</th>
            {subjectRows.map(subject => (
              <th key={subject._id} title={subject.teacher} className="border px-4 py-2 bg-pink-200">{subject.subject}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentNames.map(student => (
            <tr key={student._id}>
              <td className="border px-4 py-2 bg-lime-100">{student.name}</td>
              {subjectRows.map(subject => (
                <td key={subject._id} className="border px-4 py-2">
                  <input
                    type="number"
                    className="w-20 p-1"
                    value={marks[student._id]?.[subject._id] || ''}
                    onChange={e =>
                      handleMarksChange(student._id, subject._id, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SetResult;