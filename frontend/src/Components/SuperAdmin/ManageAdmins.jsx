import React, {useState, useEffect, useContext} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { all_admins, register_admin,adminUpdate, adminDelete } from '../../controllers/loginRoutes.js';
import { LoadingContext } from '../../App.js';

const ManageAdmins = () => {
  const { isLoading, toggleLoading } = useContext(LoadingContext);
  const [allAdmins, setAllAdmins] = useState();
  const [isCreating, setIsCreating]= useState(false);
  const [tempmsg, setTempmsg] = useState('');
  const [adminData, setAdminData]= useState({
    name:'',
    ID: '',
    email: '',
    password:'',
    school_name: '',
    principal_name: '',
    aadhar_no: 0,
    contact:0,
    address:''
  })
  const [isEditing, setIsEditing]= useState();

  useEffect(()=>{
    all_admins().then((resp)=>{
      let adminsArray = resp.all_admins;
      let sortedAdmin = adminsArray.filter((item)=>item.name!="SuperAdmin")
    setAllAdmins(sortedAdmin);
    })
  },[])

  const handleNew = ()=>{
    setIsCreating(true)
  }
  const handleBack = ()=>{
    setIsCreating(false)
  }
  const handleCreateAdmin = ()=>{
    if(isEditing){
      toggleLoading(true);
      adminUpdate(isEditing,adminData).then((resp)=>{
        let adminsArray = resp.all_admins;
        let sortedAdmin = adminsArray.filter((item)=>item.name!="SuperAdmin")
        setAllAdmins(sortedAdmin);
        toggleLoading(false);
        alert(`${adminData.name} is Successfully Updated`);
        setIsEditing(0);
        setIsCreating(false)
      }).catch((err=>{
          console.log(err);
          setTempmsg(err);
          toggleLoading(false);
        })
      )
      return;
    }
    if(adminData.ID && adminData.email && adminData.password && adminData.contact && adminData.address && adminData.name && adminData.name !="SuperAdmin" ){
      toggleLoading(true);
      register_admin(adminData).then((resp)=>{
        console.log(resp);
        let adminsArray = resp.all_admins;
        let sortedAdmin = adminsArray.filter((item)=>item.name!="SuperAdmin")
        setAllAdmins(sortedAdmin);
        toggleLoading(false);
        alert(`${adminData.name} is Successfully Created`);
        setIsCreating(false)
      }).catch((err=>{
        console.log(err);
        setTempmsg(err);
        toggleLoading(false);
      })
      )
    }
  }
  const handleAdmin = (e)=>{
    const {name,value} = e.target;
    setAdminData((prevData)=>({
      ...prevData,
      [name]: value,
    }));
  }
  const handleEdit =(id)=>{
    setIsEditing(id);
    let tobeEdit= allAdmins.filter((item)=> item._id===id)
    // console.log(tobeEdit[0])
    setAdminData(tobeEdit[0])
    setIsCreating(true);
  }
  const handleDelete =(id)=>{
    let choice= window.confirm("Are you sure want to delete this Admin");
    if(choice){
      toggleLoading(true);
      adminDelete(id).then((resp)=>{
        let adminsArray = resp.all_admins;
        let sortedAdmin = adminsArray.filter((item)=>item.name!="SuperAdmin")
        setAllAdmins(sortedAdmin);
        toggleLoading(false);
        alert(`Successfully Deleted`);
      }).catch((err=>{
          console.log(err);
          setTempmsg(err);
          toggleLoading(false);
        })
      )
    }

  }
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
      <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
        <img className="w-9 h-9 mr-2 " src={require("../../img/attendence-icon.png")} alt="StudentLogo" />
        <h1 className="font-bold ">Manage Admins</h1>
      </div>
        {isCreating? (
          <div> 
            <div className='grid grid-cols-3 gap-14 mt-5 p-4 '>
              <div>
                  <label htmlFor="name" className=" mb-1 ml-1 block font-bold text-gray-600 ">Name
                  </label>
                  <input onChange={handleAdmin} type="text" id="name" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="name" value={adminData.name}   />
              </div>

              <div>
                  <label htmlFor="id" className=" mb-1 ml-1 block font-bold text-gray-600 ">Username
                  </label>
                  <input onChange={handleAdmin} type="text" id="id" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="ID" value={adminData.ID}   />
              </div>

              <div>
                  <label htmlFor="email" className=" mb-1 ml-1 block font-bold text-gray-600 ">Email
                  </label>
                  <input onChange={handleAdmin} type="email" id="email" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="email" value={adminData.email}   />
              </div>

              <div>
                  <label htmlFor="password" className=" mb-1 ml-1 block font-bold text-gray-600 ">Password
                  </label>
                  <input onChange={handleAdmin} type="password" placeholder='Set Password' id="password" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="password" value={adminData.password} />
              </div>
              
              <div>
                  <label htmlFor="school_name" className=" mb-1 ml-1 block font-bold text-gray-600 ">School Name
                  </label>
                  <input onChange={handleAdmin} type="text" id="school_name" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="school_name" value={adminData.school_name}   />
              </div>

              <div>
                  <label htmlFor="principal_name" className=" mb-1 ml-1 block font-bold text-gray-600 ">Principal Name
                  </label>
                  <input onChange={handleAdmin} type="text" id="principal_name" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="principal_name" value={adminData.principal_name}   />
              </div>

              <div>
                  <label htmlFor="aadhar_no" className=" mb-1 ml-1 block font-bold text-gray-600 ">Aadhar No.
                  </label>
                  <input onChange={handleAdmin} type="number" id="aadhar_no" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="aadhar_no" value={adminData.aadhar_no}   />
              </div>

              <div>
                  <label htmlFor="contact" className=" mb-1 ml-1 block font-bold text-gray-600 ">Contact No.
                  </label>
                  <input onChange={handleAdmin} type="number" id="contact" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="contact" value={adminData.contact}   />
              </div>

              <div>
                  <label htmlFor="address" className=" mb-1 ml-1 block font-bold text-gray-600 ">Address
                  </label>
                  <input onChange={handleAdmin} type="text" id="address" className="bg-white w-fit border rounded-md py-2 px-3 focus:outline-none  focus:border-red-100" name="address" value={adminData.address}   />
              </div>

            </div>
            <div className='flex justify-end'>

              <button className='mr-2 bg-blue-400 px-4 py-2 rounded' onClick={handleBack} >
                  Back
              </button>
              <button className='bg-green-400 px-4 py-2 rounded' onClick={handleCreateAdmin} >
                  {`${isEditing? 'Update':'Create'}`}
              </button>
            </div>
            {tempmsg && <p>{tempmsg}</p>}
          </div>
        ): (
      <div style={bgcolor2} className="border-2 mt-2 border-red-300 rounded-lg flex flex-col p-5 justify-between ">
        <div>
          <button onClick={handleNew} className='m-2 px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded'>Create New</button>
        </div>
        {allAdmins && ( 
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse block md:table ">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-3">ID</th>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">School Name</th>
                <th className="border border-gray-300 p-3">Principal Name</th>
                <th className="border border-gray-300 p-3">Email</th>
                <th className="border border-gray-300 p-3">Contact</th>
                <th className="border border-gray-300 p-3">Address</th>
                <th className="border border-gray-300 p-3">Action</th>
                {/* Add more table headers based on your data */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {allAdmins.map((admin) => (
                <tr key={admin._id} className="md:table-row">
                  <td className="border border-gray-300 p-3">{admin.ID}</td>
                  <td className="border border-gray-300 p-3">{admin.name}</td>
                  <td className="border border-gray-300 p-3">{admin.school_name}</td>
                  <td className="border border-gray-300 p-3">{admin.principal_name}</td>
                  <td className="border border-gray-300 p-3">{admin.email}</td>
                  <td className="border border-gray-300 p-3">{admin.contact}</td>
                  <td className="border border-gray-300 p-3">{admin.address}</td>
                  <td className="border border-gray-300 p-3 flex flex-col justify-center items-center">
                    <button
                      title='Edit'
                      className="w-8 h-8 bg-gray-300 hover:bg-green-400 text-sm text-black font-bold py-2 px-2 rounded mb-2"
                      onClick={() => handleEdit(admin._id)}
                    >
                      <img className='w-full text-black' src={require('../../img/edit-text.png')} alt="buttonpng" />
                    </button>
                    <button
                      title='Delete'
                      onClick={() => handleDelete(admin._id)}
                      className="w-8 h-8 bg-gray-300 hover:bg-red-400 text-sm text-black font-bold py-2 px-2 rounded"
                    >
                      <img className='w-full text-black' src={require('../../img/delete.png')} alt="buttonpng" />
                    </button>
                  </td>
                  {/* Add more table data cells based on your data */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

      </div>
      )}
    </div>
  )
}

export default ManageAdmins