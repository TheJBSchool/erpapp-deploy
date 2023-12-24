import React from 'react';

const StudentForm = ({ formData, handleFormChange, formSubmit}) => {

  const getClassOptions = () => {
    if (formData.group === 'Pre') {
      return ['Pre-Nursery', 'Nursery', 'LKG', 'UKG'];
    } else if (formData.group === 'Primary') {
      return ['1', '2', '3', '4', '5'];
    } else if (formData.group === 'Secondary') {
      return ['6', '7', '8', '9', '10'];
    }
    return [];
  };

  return (
    <>
      {/* Rest of your form JSX */}
        <form className=" bg-white shadow-md rounded-lg px-8 py-6  grid grid-cols-2 gap-6">
            <div>
            <label htmlFor="name" className=" mb-1 ml-1 block font-bold text-gray-600 ">Name
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="text" id="name" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="name" value={formData.name} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="age" className=" mb-1 ml-1 block font-bold text-gray-600 ">Age
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="number" id="age" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="age" value={formData.age} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="id" className=" mb-1 ml-1 block font-bold text-gray-600 ">Username
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="text" id="id" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="ID" value={formData.ID} onChange={handleFormChange} required />
            </div>
            <div>
            <label htmlFor="rollno" className=" mb-1 ml-1 block font-bold text-gray-600 ">Roll no.
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="text" id="rollno" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="rollno" value={formData.rollno} onChange={handleFormChange} required />
            </div>
            <div>
            <label htmlFor="password" className=" mb-1 ml-1 block font-bold text-gray-600 ">Password
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="password" id="password" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="password" value={formData.password} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="group" className=" mb-1 ml-1 block font-bold text-gray-600 ">School Group
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <select id="group" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="group" value={formData.group} onChange={handleFormChange} required>
                <option value="">Select an option</option>
                <option value="Pre">Pre-school</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
            </select>
            </div>

            <div>
            <label htmlFor="session" className=" mb-1 ml-1 block font-bold text-gray-600 ">Session
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <select id="session" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="session" value={formData.session} onChange={handleFormChange} required>
                <option value="">Select an option</option>
                <option value="2022-23">2022-23</option>
                <option value="2023-24">2023-24</option>
            </select>
            </div>

            <div>
            <label htmlFor="class" className=" mb-1 ml-1 block font-bold text-gray-600 ">Class
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <select
                id="class"
                disabled={formData.group === ''}
                className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200"
                name="class"
                value={formData.class}
                onChange={handleFormChange}
                required
            >
                <option value="">Select an option</option>
                {getClassOptions().map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
                ))}
            </select>
            </div>

            <div>
            <label htmlFor="section" className=" mb-1 ml-1 block font-bold text-gray-600 ">Section
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <select id="section" disabled={formData.class === ''} className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="section" value={formData.section} onChange={handleFormChange} required>
                <option value="">Select an option</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D </option>
                {/* <option value="E">E </option> */}
            </select>
            </div>

            <div>
            <label htmlFor="contact" className=" mb-1 ml-1 block font-bold text-gray-600 ">Contact
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="number" id="contact" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="contact" value={formData.contact} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="emergencyContact" className=" mb-1 ml-1 block font-bold text-gray-600 ">Emergency Contact
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="number" id="emergencyContact" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="emergency_contact" value={formData.emergency_contact} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="house" className=" mb-1 ml-1 block font-bold text-gray-600 ">House
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="text" id="house" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="house" value={formData.house} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="admissionDate" className=" mb-1 ml-1 block font-bold text-gray-600 ">Admission date
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="date" id="admissionDate" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="admission_date" value={formData.admission_date} onChange={handleFormChange} required />
            </div>

            {/* <div>
            <label htmlFor="guardian" className=" mb-1 ml-1 block font-bold text-gray-600 ">Guardian
            </label>
            <input type="text" id="guardian" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="guardian" value={formData.guardian} onChange={handleFormChange} />
            </div> */}

            <div>
            <label htmlFor="fatherName" className=" mb-1 ml-1 block font-bold text-gray-600 ">Father's Name
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="text" id="fatherName" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="father_name" value={formData.father_name} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="motherName" className=" mb-1 ml-1 block font-bold text-gray-600 ">Mother's Name
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="text" id="motherName" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="mother_name" value={formData.mother_name} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="religion" className=" mb-1 ml-1 block font-bold text-gray-600 ">Religion
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <select id="religion" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="religion" value={formData.religion} onChange={handleFormChange} required>
                <option value="">Select an option</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Sikh">Sikh</option>
                <option value="Christian">Christian </option>
                <option value="Other">Other </option>
            </select>
            </div>

            <div>
            <label htmlFor="bloodGroup" className=" mb-1 ml-1 block font-bold text-gray-600 ">Blood Group
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <select id="bloodGroup" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="blood_group" value={formData.blood_group} onChange={handleFormChange} required>
                <option value="">Select an option</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
            </select>
            </div>

            <div>
            <label htmlFor="dob" className=" mb-1 ml-1 block font-bold text-gray-600 ">Date Of Birth
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="date" id="dob" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="DOB" value={formData.DOB} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="address" className=" mb-1 ml-1 block font-bold text-gray-600 ">Address
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="text" id="address" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="address" value={formData.address} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="van" className=" mb-1 ml-1 block font-bold text-gray-600 ">Van
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <select id="van" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="van" value={formData.van} onChange={handleFormChange} required>
                <option value="">Select an option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
            </select>
            </div>

            <div className=" col-start-1 col-end-3 flex justify-center">
            <button
                type="submit"
                className="h-10 bg-green-300 hover:bg-green-600 text-white font-semibold px-12 rounded-full focus:outline-none" onClick={formSubmit}
            >
                Submit
            </button>
            </div>
        </form>
    </>
  );
};

export default StudentForm;
