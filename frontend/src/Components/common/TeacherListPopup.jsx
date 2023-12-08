// TeacherListPopup.js

import React from 'react';

const TeacherListPopup = ({ teachers, selectedTeachers, handleTeacherSelection, onClose, onForward }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-95">
      {/* Overlay with blurred background */}
      <div className="absolute inset-0 backdrop-filter backdrop-blur-sm"></div>

      {/* Modal content */}
      <div className="z-50 relative bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-bold mb-4 text-center">Select Teachers to Forward</h2>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher._id} className="mb-2">
              <label htmlFor={`teacher_${teacher._id}`} className="flex items-center">
                <input
                  type="checkbox"
                  id={`teacher_${teacher._id}`}
                  value={teacher._id}
                  checked={selectedTeachers.includes(teacher._id)}
                  onChange={() => handleTeacherSelection(teacher._id)}
                  className="mr-2"
                />
                {teacher.name} {/* Assuming 'name' is the property that holds teacher's name */}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-6">
          <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onForward}>
            Forward Message
          </button>
          <button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherListPopup;
