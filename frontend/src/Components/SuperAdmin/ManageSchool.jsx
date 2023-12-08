import React, {useState, useEffect, useContext} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { LoadingContext } from '../../App.js';
import {all_admins, changeTitle, updateLogo } from '../../controllers/loginRoutes.js';

const ManageSchool = () => {
  const [allAdmins, setAllAdmins] = useState();
  const [selectedAdmin, setSelectedAdmin] = useState();
  const [btn, setBtn]= useState(0);
  const [schoolName, setSchoolName] = useState('');
  const [logo, setLogo]=useState({school_logo: ""});
  const [msg, setMsg]=useState('');
  const [preview, setPreview] = useState(null);

  useEffect(()=>{
    all_admins().then((resp)=>{
      let adminsArray = resp.all_admins;
      let sortedAdmin = adminsArray.filter((item)=>item.name!="SuperAdmin")
    setAllAdmins(sortedAdmin);
    })
  },[])
  
  const handleChangeSchoolName = () =>{
    if(selectedAdmin){
      changeTitle(selectedAdmin,schoolName).then((resp)=>{
        if(resp){
          setMsg(resp.message);
        }
        else{
          setMsg("Failed to change School Name");
        }
      })
    }
  }
  const handleApplyLogo = (e) => {
    // console.log(logo)
    if(selectedAdmin && logo){
      updateLogo(selectedAdmin, logo).then((resp)=>{
        if(resp){
          setMsg("School Logo Updated Successfully")
        }
        else{
          setMsg("School Logo Update Failed")
        }
      })
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // console.log(base64)
    setLogo({school_logo : base64 })
  }
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
      <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
        <img className="w-9 h-9 mr-2 " src={require("../../img/result-icon.png")} alt="StudentLogo" />
        <h1 className="font-bold ">Manage School ERP</h1>
      </div>
        
        <div style={bgcolor2} className="border-2 mt-2 rounded-lg flex flex-col p-5 justify-between ">
            <div className='flex justify-center mb-6 '>
              <select onChange={(e)=>setSelectedAdmin(e.target.value)} className='rounded p-2 outline-none' name="admin_select" id="admin_select">
                <option value="">Select an Admin</option>
                {allAdmins && allAdmins.map((val, ind) => (
                  <option key={ind} value={val._id} className="px-4 py-2">{val.name}</option>
                ))}
              </select>
            </div>
            {selectedAdmin && ( 
              <div className='flex justify-center'>
                  <button onClick={()=>setBtn(1)} className='bg-gray-300 hover:bg-green-400 text-sm text-black font-bold py-2 px-4 rounded mr-2'>Change ERP app Title</button>
                  <button onClick={()=>setBtn(2)} className='bg-gray-300 hover:bg-green-400 text-sm text-black font-bold py-2 px-4 rounded mr-2'>Change ERP app Logo</button>
              </div>
            )}
            {btn===1 && (
                <>
                  <div style={bgcolor2} className='mt-8 shadow-xl flex justify-center p-10 '>
                      <input type="text" className="rounded-tl-md rounded-bl-md outline-none px-2" value={schoolName} onChange={(e)=>setSchoolName(e.target.value)} />
                      <button onClick={handleChangeSchoolName} className='bg-gray-300 hover:bg-green-400 text-sm text-black font-bold py-2 px-4 rounded-tr-md rounded-br-md mr-2'>Apply</button>
                  </div>
                </>
            )}
            {btn==2 && (
              <>
                <div style={bgcolor2} className='mt-8 shadow-xl flex justify-center p-10 '>
                  <input type="file" accept='.jpeg, .png, .jpg' onChange={(e)=> handleFileUpload(e)}  />
                  <button onClick={handleApplyLogo} className='bg-gray-300 hover:bg-green-400 text-sm text-black font-bold py-2 px-4 rounded mr-2'>Apply</button>
                </div>
                {preview && (
                  <div className="mt-4">
                    <h3>Preview:</h3>
                    <img src={preview} alt="Logo Preview" style={{ width: '200px', height: 'auto' }} />
                  </div>
                )}
              </>
            )}
        </div>
        <p>{msg}</p>
        
    </div>
  )
}

export default ManageSchool;

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}