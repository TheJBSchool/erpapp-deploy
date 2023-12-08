import React, { useEffect, useState } from 'react';
import { bgcolor2 } from "../Home/custom.js";

const MyProfile = ({teacherData}) => {
  
  return (<>
    {/* {data._id}{data.name} */}
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
          {/* header */}
          <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/teacher.png")} alt="StudentLogo" />
            <h1 className="font-bold ">My Profile</h1>
          </div>

          <div style={bgcolor2} className=" border-2 mt-5 border-red-300 rounded-lg flex flex-row p-10 justify-between ">
 
             <div className='px-8 py-6  w-full grid grid-cols-2 gap-6'>

             
                <div className='flex'>
                  <label htmlFor="name" className=" mb-1 ml-1 block font-bold text-gray-600 ">Name:
                  </label>
                  <span className=" ml-2">{teacherData.name}</span>                  
                </div>

                <div className='flex'>
                  <label htmlFor="age" className=" mb-1 ml-1 block font-bold text-gray-600 ">Age:
                  </label>
                  <span className=" ml-2">{teacherData.age}</span>
                </div>

                <div className='flex'>
                  <label htmlFor="id" className=" mb-1 ml-1 block font-bold text-gray-600 ">Username:
                  </label>
                  <span className=" ml-2">{teacherData.ID}</span>                
                  
                </div>                

                <div className='flex'>
                  <label htmlFor="group" className=" mb-1 ml-1 block font-bold text-gray-600 ">School Group:
                  </label>
                  <span className=" ml-2">{teacherData.group}</span>
                </div>

                <div className='flex'>
                  <label htmlFor="class" className=" mb-1 ml-1 block font-bold text-gray-600 ">Class Teacher:
                  </label>
                  <span className=" ml-2">{teacherData.class_teacher}</span>
                </div>

                <div className='flex'>
                  <label htmlFor="contact" className=" mb-1 ml-1 block font-bold text-gray-600 ">Contact:
                  </label>
                  <span className=" ml-2">{teacherData.contact}</span>
                  
                </div>

                <div className='flex'>
                  <label htmlFor="emergencyContact" className=" mb-1 ml-1 block font-bold text-gray-600 ">Emergency Contact:
                  </label>
                  <span className=" ml-2">{teacherData.emergency_contact}</span>
                  
                </div>


                <div className='flex'>
                  <label htmlFor="admissionDate" className=" mb-1 ml-1 block font-bold text-gray-600 ">Joining date:
                  </label>
                  <span className=" ml-2">{teacherData.joining_date}</span>
                </div>

                <div className='flex'>
                  <label htmlFor="fatherName" className=" mb-1 ml-1 block font-bold text-gray-600 ">Father's Name:
                  </label>
                  <span className=" ml-2">{teacherData.father_name}</span>                
                </div>

                <div className='flex'>
                  <label htmlFor="motherName" className=" mb-1 ml-1 block font-bold text-gray-600 ">Mother's Name:
                  </label>
                  <span className=" ml-2">{teacherData.mother_name}</span>                
                </div>

                <div className='flex'>
                  <label htmlFor="religion" className=" mb-1 ml-1 block font-bold text-gray-600 ">Religion:
                  </label>
                  <span className=" ml-2">{teacherData.religion}</span>       
                </div>

                <div className='flex'>
                  <label htmlFor="bloodGroup" className=" mb-1 ml-1 block font-bold text-gray-600 ">Blood Group:
                  </label>
                  <span className=" ml-2">{teacherData.blood_group}</span>       
                </div>

                <div className='flex'>
                  <label htmlFor="dob" className=" mb-1 ml-1 block font-bold text-gray-600 ">Date Of Birth:
                  </label>
                  <span className=" ml-2">{teacherData.DOB}</span>       
                </div>

                <div className='flex'>
                  <label htmlFor="house" className=" mb-1 ml-1 block font-bold text-gray-600 ">House:
                  </label>
                  <span className=" ml-2">{teacherData.house}</span>                
                </div>

                <div className='flex'>
                  <label htmlFor="address" className=" mb-1 ml-1 block font-bold text-gray-600 ">Address:
                  </label>
                  <span className=" ml-2">{teacherData.address}</span>                
                </div>

                <div className='flex'>
                  <label htmlFor="van" className=" mb-1 ml-1 block font-bold text-gray-600 ">Van:
                  </label>
                 <span className=" ml-2">{teacherData.van}</span>       
                </div>
            </div>
            <div className='h-fit w-fit bg-slate-200 px-6 py-4 border-2 mt-2 border-red-300 rounded-l-[100px] rounded-br-[100px] flex flex-col items-center'>
                <img className="w-40 h-30 p-5 mr-2 " src={require("../../img/teacher.png")} alt="StudentLogo" />
                <h3 className='text-[10px]'>To change profile pic</h3>
                <hr />
                <button className='bg-white px-2 rounded-2xl mt-2 hover:bg-orange-300'>Click here</button>
            </div>



          </div>
      </div>

  </>)
}

export default MyProfile