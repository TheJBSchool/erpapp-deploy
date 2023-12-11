import React, { useEffect, useState, useContext} from 'react'
import { bgcolor2 } from "../Home/custom.js";

const MyProfile = ({adminData}) => {

  return (<>
    {/* {adminData._id}{adminData.name} */}

        {/* RightSidePanel */}
        <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
          {/* header */}
          <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/admin_profile.png")} alt="StudentLogo" />
            <h1 className="font-bold ">My Profile</h1>
          </div>

          <div style={bgcolor2} className="border-2 mt-5 border-red-300 rounded-lg flex flex-row p-10 justify-between ">
            

            <div className='grid grid-cols-2 gap-14 mt-5 '>
              <div>
                  <label htmlFor="name" className=" mb-1 ml-1 block font-bold text-gray-600 ">Name
                  </label>
                  <input disabled  type="text" id="name" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="name" value={adminData.name}   />
              </div>

              <div>
                  <label htmlFor="id" className=" mb-1 ml-1 block font-bold text-gray-600 ">Username
                  </label>
                  <input disabled  type="text" id="id" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="ID" value={adminData.ID}   />
              </div>

              <div>
                  <label htmlFor="email" className=" mb-1 ml-1 block font-bold text-gray-600 ">Email
                  </label>
                  <input disabled  type="email" id="id" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="email" value={adminData.email}   />
              </div>

              

              <div>
                  <label htmlFor="contact" className=" mb-1 ml-1 block font-bold text-gray-600 ">Contact No.
                  </label>
                  <input disabled  type="text" id="contact" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="contact" value={adminData.contact}   />
              </div>

              <div>
                  <label htmlFor="address" className=" mb-1 ml-1 block font-bold text-gray-600 ">Address
                  </label>
                  <input disabled  type="text" id="address" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="address" value={adminData.address}   />
              </div>

            </div>
            <div className='h-fit w-fit bg-slate-200 px-6 py-4 border-2 mt-2 border-red-300 rounded-l-[100px] rounded-br-[100px] flex flex-col items-center'>
                <img className="w-40 h-40 mr-2 " src={require("../../img/admin_profile.png")} alt="StudentLogo" />
            </div>

          </div>
        </div>
  </>)
}

export default MyProfile