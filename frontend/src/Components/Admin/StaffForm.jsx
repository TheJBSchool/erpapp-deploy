import React, {useState, useEffect} from 'react'

const StaffForm = ({formData, handleFormChange, formSubmit}) => {
    const [error, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(()=>{
        // console.log("form Data ",formData)
         setIsFormValid( formData.fullName && formData.fatherName && formData.contact && formData.dob && formData.jobPosition && formData.aadharNo && formData.joining_date && formData.total_salary);
    })
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid) {
            formSubmit(e);
        } else {
            setError('*Please fill in all the required fields.');
        }
    };
  return (
    <>
    <form className="mt-4 bg-white shadow-md rounded-lg px-8 py-6  grid grid-cols-2 gap-6">
        <div>
        <label htmlFor="fullName" className=" mb-1 ml-1 block font-bold text-gray-600 ">Full Name
            <span className="text-red-500">&nbsp;*</span>
        </label>
        <input type="text" id="fullName" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="fullName" value={formData.fullName} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="fatherName" className=" mb-1 ml-1 block font-bold text-gray-600 ">Father's Name
            <span className="text-red-500">&nbsp;*</span>
        </label>
        <input type="text" id="fatherName" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="fatherName" value={formData.fatherName} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="contact" className=" mb-1 ml-1 block font-bold text-gray-600 ">Contact
            <span className="text-red-500">&nbsp;*</span>
        </label>
        <input type="number" id="contact" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="contact" value={formData.contact} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="emergency_contact" className=" mb-1 ml-1 block font-bold text-gray-600 ">Emergency Contact
        </label>
        <input type="number" id="emergency_contact" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="emergency_contact" value={formData.emergency_contact} onChange={handleFormChange}  />
        </div>

        <div>
        <label htmlFor="dob" className=" mb-1 ml-1 block font-bold text-gray-600 ">Date Of Birth
            <span className="text-red-500">&nbsp;*</span>
        </label>
        <input type="date" id="dob" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="dob" value={formData.DOB} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="jobPosition" className=" mb-1 ml-1 block font-bold text-gray-600 ">Job Position
            <span className="text-red-500">&nbsp;*</span>
        </label>
        <input type="text" id="jobPosition" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="jobPosition" value={formData.jobPosition} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="aadharNo" className=" mb-1 ml-1 block font-bold text-gray-600 ">Aadhar Number
            <span className="text-red-500">&nbsp;*</span>
        </label>
        <input type="text" id="aadharNo" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="aadharNo" value={formData.aadharNo} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="joining_date" className=" mb-1 ml-1 block font-bold text-gray-600 ">Joining date
            <span className="text-red-500">&nbsp;*</span>
        </label>
        <input type="date" id="joining_date" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="joining_date" value={formData.joining_date} onChange={handleFormChange} required />
        </div>

        <div>
        <label htmlFor="total_salary" className=" mb-1 ml-1 block font-bold text-gray-600 ">Salary
            <span className="text-red-500">&nbsp;*</span>
        </label>
        <input type="number" id="total_salary" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="total_salary" value={formData.total_salary !== null ? formData.total_salary:''} onChange={handleFormChange} required />
        </div>



        <div className=" col-start-1 col-end-3 flex justify-center">
        <button
            type="submit"
            // disabled={!isFormValid}
            className="h-10 bg-green-300 hover:bg-green-600 text-white font-semibold px-12 rounded-full focus:outline-none" onClick={handleSubmit}
        >
            Submit
        </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
    </form>
    </>

  )
}

export default StaffForm