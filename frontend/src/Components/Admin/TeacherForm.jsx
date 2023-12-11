import React, {useState} from 'react';
import Multiselect from 'multiselect-react-dropdown';
import CreatableSelect from 'react-select/creatable';


const TeacherForm = ({ formData, handleFormChange, formSubmit, loading, success }) => {
    const existingSubjects = [
    { value: 'math', label: 'Math' },
    { value: 'science', label: 'Science' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'sanskrit', label: 'Sanskrit' },
    { value: 'english', label: 'English' },
    ];
    const classNames = [
        'Pre-Nursery', 'Nursery', 'LKG', 'UKG',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
    ];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const classOptions = [];
    classNames.map((grade)=> {
        for (let section = 'A'; section <= 'D'; section = String.fromCharCode(section.charCodeAt(0) + 1)) {
            classOptions.push(`${grade}${section}`);
        }
    })
    const handleChange = selectedOption => {
        setSelectedOptions(selectedOption);
        const selectedSubjects = selectedOption ? selectedOption.map(option => option.label) : [];
        handleFormChange({ target: { name: 'teaching_subject', value: selectedSubjects } });
            
    };

    const handleCreate = inputValue => {
        const newSkill = {  value: inputValue.toLowerCase(), label: inputValue};
        setSelectedOptions([...selectedOptions, newSkill]);
        const subjects = [...selectedOptions, newSkill];
        const final_subjects= subjects? subjects.map(option => option.label) : [];
        handleFormChange({ target: { name: 'teaching_subject', value: final_subjects } });
    };
    

  return (
    <>
        <form className=" bg-white shadow-md rounded-lg px-8 py-6  grid grid-cols-2 gap-6">
        <div>
        <label htmlFor="name" className=" mb-1 ml-1 block font-bold text-gray-600 ">Name <span className="text-red-500">*</span> </label>
        <input type="text" id="name" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="name" value={formData.name} onChange={handleFormChange} required />
        </div>


        <div>
        <label htmlFor="ID" className=" mb-1 ml-1 block font-bold text-gray-600 ">Username
            <span className="text-red-500">*</span> </label>
        <input type="text" pattern="[a-zA-Z0-9]+[a-zA-Z0-9 ]+" id="ID" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="ID" value={formData.ID} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="password" className=" mb-1 ml-1 block font-bold text-gray-600 ">Password <span className="text-red-500">*</span> </label>
        <input type="password" id="password" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="password" value={formData.password} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="age" className=" mb-1 ml-1 block font-bold text-gray-600 ">Age <span className="text-red-500">*</span> </label>
        <input type="number" id="age" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="age" value={formData.age} onChange={handleFormChange} required />
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
            <label htmlFor="class" className=" mb-1 ml-1 block font-bold text-gray-600 ">Class
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <Multiselect selectedValues={formData.class} isObject={false} options={classOptions} onSelect={(e) => { formData.class = e }} onRemove={(e) => { formData.class = e }} showCheckbox showArrow />
        </div>

        <div>
        <label htmlFor="class_teacher" className=" mb-1 ml-1 block font-bold text-gray-600 ">Class teacher</label>
        <select
            id='class_teacher'
            className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" 
            name="class_teacher"
            value={formData.class_teacher} 
            onChange={handleFormChange}
          >
            <option value="">Select class</option>
            {classNames.map((className, index) => (
              ['A', 'B', 'C', 'D'].map((section, secIndex) => (
                <option key={`${index}-${secIndex}`} value={`${className}${section}`}>{className} - {section}</option>
              ))
            ))}
          </select>
        </div>

        {/* enable it type multi inputs (like multiple subjects) */}
        <div>
            <label htmlFor="teaching_subject" className="mb-1 ml-1 block font-bold text-gray-600">Teaching Subjects</label>
            <CreatableSelect
                id="teaching_subject"
                name="teaching_subject"
                defaultValue={formData.teaching_subject?.map(subject => ({ label: subject, value: subject }))}
                onChange={handleChange}
                onCreateOption={handleCreate}
                options={existingSubjects}
                isMulti
            />
        </div>  


        <div>
        <label htmlFor="contact" className=" mb-1 ml-1 block font-bold text-gray-600 ">Contact <span className="text-red-500">*</span> </label>
        <input type="number" id="contact" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="contact" value={formData.contact} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="emergencyContact" className=" mb-1 ml-1 block font-bold text-gray-600 ">Emergency Contact <span className="text-red-500">*</span> </label>
        <input type="number" id="emergencyContact" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="emergency_contact" value={formData.emergency_contact} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="house" className=" mb-1 ml-1 block font-bold text-gray-600 ">House <span className="text-red-500">*</span> </label>
        <input type="text" id="house" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="house" value={formData.house} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="joiningDate" className=" mb-1 ml-1 block font-bold text-gray-600 ">Joining Date <span className="text-red-500">*</span> </label>
        <input type="date" id="joiningDate" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="joining_date" value={formData.joining_date} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="fatherName" className=" mb-1 ml-1 block font-bold text-gray-600 ">Father's Name <span className="text-red-500">*</span> </label>
        <input type="text" id="fatherName" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="father_name" value={formData.father_name} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="motherName" className=" mb-1 ml-1 block font-bold text-gray-600 ">Mother's Name <span className="text-red-500">*</span> </label>
        <input type="text" id="motherName" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="mother_name" value={formData.mother_name} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="religion" className=" mb-1 ml-1 block font-bold text-gray-600 ">Religion <span className="text-red-500">*</span> </label>
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
        <label htmlFor="bloodGroup" className=" mb-1 ml-1 block font-bold text-gray-600 ">Blood Group <span className="text-red-500">*</span> </label>
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
        <label htmlFor="dob" className=" mb-1 ml-1 block font-bold text-gray-600 ">Date Of Birth <span className="text-red-500">*</span> </label>
        <input type="date" id="dob" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="DOB" value={formData.DOB} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="address" className=" mb-1 ml-1 block font-bold text-gray-600 ">Address <span className="text-red-500">*</span> </label>
        <input type="text" id="address" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="address" value={formData.address} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="van" className=" mb-1 ml-1 block font-bold text-gray-600 ">Van <span className="text-red-500">*</span> </label>
        <select id="van" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="van" value={formData.van} onChange={handleFormChange} required>
            <option value="">Select an option</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
        </select>
        </div>
        <div className=" col-start-1 col-end-3 flex justify-center">
        <button type="submit" className="h-10 bg-green-300 hover:bg-green-600 text-white font-semibold px-12 rounded-full focus:outline-none" onClick={formSubmit}> Submit</button>
        </div>
    </form>
    </>
  )
}

export default TeacherForm