import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { bgcolor1, bgcolor2 } from "../Home/custom.js";
import { register_teacher, all_teachers,teacherUpdate, teacherDelete,teacherSearchBar } from '../../controllers/loginRoutes.js';
import Multiselect from 'multiselect-react-dropdown';
import TeacherForm from "./TeacherForm";

const ManageTeachers = ({adminId}) => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    group: '',
    class: '',
    section: ''
  });
  const [searchName, setSearchName]= useState('')
  const [searchTeacherId, setSearchTeacherId]= useState('')
  useEffect(()=>{
    all_teachers(adminId).then((resp) => {
      setTeachers(resp.all_teachers);
      setFilteredTeachers(resp.all_teachers);
      // console.log(teachers);
    })
  },[])

  useEffect(() => {
    if(teachers && searchFilter){
      if(searchFilter.group ===""){
        setFilteredTeachers(teachers);
        return;
      }
      const clss = searchFilter.class + searchFilter.section;
      let filteredTeachers = teachers.filter( teacher =>{
        return (
          teacher.group=== searchFilter.group && (searchFilter.class==="" || teacher.class_teacher=== clss && teacher.class.includes(clss))
        )
      })
      if(filteredTeachers){
        setFilteredTeachers(filteredTeachers);
      }
    }
  }, [searchFilter])
  const [formData, setFormData] = useState({
    name: '',
    ID: '',
    age: '',
    password: '',
    class: [],
    class_teacher: '',
    group: '',
    contact: '',
    emergency_contact: '',
    house: '',
    joining_date: '',
    father_name: '',
    mother_name: '',
    religion: '',
    blood_group: '',
    DOB: '',
    address: '',
    van: '',
    underBy: adminId
  });
  const [note, setNote] = useState("");
  const [temp, tempNote] = useState("x");
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [showExistingTeachers, setShowExistingTeachers] = useState(false); // State to control existing user 

  const [TEdit, setTEdit] = useState(false);
  const [TEditId, setTEditId] = useState();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  

  const handleNewEntryClick = () => {
    setFormData({
      name: '',
      ID: '',
      age: '',
      password: '',
      class: [],
      class_teacher: '',
      group: '',
      contact: '',
      emergency_contact: '',
      house: '',
      joining_date: '',
      father_name: '',
      mother_name: '',
      religion: '',
      blood_group: '',
      DOB: '',
      address: '',
      van: '',
      underBy: adminId
    });
    setSuccess(false);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleExistingUserClick = () => {
    setShowForm(false);
    setShowExistingTeachers(true);
  };

  const findTeacherToEdit = (id) => {
    setTEditId(id);
    setFormData(teachers.find((teacher) => teacher._id === id));
  };
  const handleEdit = (tid) =>{
    findTeacherToEdit(tid);
    setTEdit(true);
    setShowForm(true);
    setSuccess(false);
  }
  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if(TEdit){
      teacherUpdate(TEditId,formData)
        .then((resp) => {
          if (resp.status !== 201) {
              tempNote("Teacher Data Update unsuccessful ");
              // console.log("Update unsuccessful ");
            } else {
              tempNote("Teacher Data Updated successfully ");
              // console.log("Teacher Data Updated successfully ");
              setTEdit(false);
              setSuccess(true); // Mark the submission as successful
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            tempNote("Error during Update");
          })
          .finally(() => {
            setLoading(false); // Stop loading
      });
    }
    else{
      register_teacher(formData)
        .then((resp) => {
          if (resp.status !== 201) {
            tempNote("unsuccessful registration");
          } else {
            tempNote("successful registration");
            setSuccess(true); // Mark the submission as successful
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          tempNote("Error during registration");
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });
    }
  };
  //For delete the teacher
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [teacherToDeleteId, setTeacherToDeleteId] = useState(null);

  const handleDelete = (id) => {
    setTeacherToDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setTeacherToDeleteId(null);
  };

  const handleConfirmDelete = () => {
    if (teacherToDeleteId) {
      teacherDelete(teacherToDeleteId)
        .then(() => {
          // Update students array and handle success
          setTeachers(teachers.filter(teacher => teacher._id !== teacherToDeleteId));
          setTeacherToDeleteId(null);
          setShowDeleteConfirmation(false);
          // console.log("Deleted successfully");
         
        })
        .catch(error => {
          // Handle error
          console.error("Error deleting teacher: ", error);
        });
    }
  };

  //filter

  const handleSearchByName = (e)=>{
    let t_name= e.target.value;
    setSearchName(t_name);
    t_name = t_name.toLowerCase()
    let filteredStudents = teachers.filter((item) => item.name.toLowerCase().includes(t_name))
    setFilteredTeachers(filteredStudents);
  }

  const handleSearchByTeacherId = (e)=>{
    let t_id= e.target.value;
    setSearchTeacherId(t_id)
    let filteredStudents = teachers.filter((item) => item.ID.toLowerCase().includes(t_id))
    setFilteredTeachers(filteredStudents);
  }

  const getClassOptionsSearch = () => {
    if (searchFilter?.group === 'Pre') {
      return ['Pre Nursery','Nursery', 'LKG', 'UKG'];
    } else if (searchFilter?.group === 'Primary') {
      return ['1', '2', '3', '4', '5'];
    } else if (searchFilter?.group === 'Secondary') {
      return ['6', '7', '8', '9', '10'];
    }
    return [];
  };
  const handleDropDownChange = (e) => {
    const { name, value } = e.target;
    setSearchFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(searchFilter);
  };
  return (
    <>
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 ">
      {/* header */}
      <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
        <img className="w-9 h-9 mr-2 " src={require("../../img/teacher.png")} alt="StudentLogo" />
        <h1 className="font-bold ">Manage Teachers</h1>
      </div>

      {/* main */}
      <div className='main'>
        {showForm ? (
          <div className="mt-12 p-4">
            <h2 className="text-2xl font-bold mb-4">Teacher Information</h2>
            {loading ? (
              <div className="text-center">
                <CircularProgress size={40} thickness={4} />
                <p>Submitting...</p>
              </div>
            ) : success ? (
              <>
                <h1 className='font-semibold text-xl mb-5 text-center'>Form Submitted</h1>
                <Alert severity="success">{temp}</Alert>
                <div className='flex flex-row justify-end '>
                  <button
                    className="h-10 m-8  bg-blue-200 hover:bg-blue-400 text-white font-semibold px-12 rounded-full focus:outline-none"
                    onClick={handleNewEntryClick}
                  >
                    Register New Entry
                  </button>
                </div>
              </>
            ) : (
              <>
                <TeacherForm
                  formData={formData}
                  handleFormChange={handleFormChange}
                  formSubmit={formSubmit}
                  loading={loading}
                  success={success}
                />
              </>
            )};
          </div>
        ) : (showExistingTeachers ? (
          <>
            {/* <div className="mt-12 p-4 bg-gray-100 rounded-lg">
              {teachers.map((val, ind) => {
                if (val.group == "Primary" && val.emergency_contact == 2) {
                  return <li key={ind}>{val.name}</li>
                }
              })}
              
            </div> */}
            <div className="mt-12 p-4 bg-gray-100 rounded-lg">
              <h1 className='font-semi-bold text-2xl mb-6'>Existing Teachers</h1>

              
              <div className="flex space-x-2 justify-end mb-6">
                {/* Add search bars for user ID and name */}
                <div className="relative">
                  <input
                    type="text"
                    name='name'
                    className="w-32 px-2 py-1 border rounded mr-4 text-sm"
                    placeholder="&#128269; Enter Name"
                    value={searchName}
                    onChange={handleSearchByName}
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name='userId'
                    className="w-32 px-2 py-1 border rounded mr-4 text-sm"
                    placeholder="&#128269; Enter User ID"
                    value={searchTeacherId}
                    onChange={handleSearchByTeacherId}
                  />
                </div>
                {/* dropdown filters */}
                <div className="relative">
                  <label htmlFor="groupDropdown" className="mr-2 text-sm font-medium">Group:</label>
                  <select
                    id="groupDropdown"
                    name='group'
                    className="w-32 px-2 py-1 border rounded mr-4"
                    value={searchFilter.group}
                    onChange={handleDropDownChange}
                  >
                    <option value="">All</option>
                    <option value="Pre">Pre-school</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                  </select>
                </div>
                <div className="relative">
                  <label htmlFor="classDropdown" className="mr-2 text-sm font-medium">Class:</label>
                  <select
                    id="classDropdown"
                    name='class'
                    className="w-32 px-2 py-1 border rounded mr-4"
                    value={searchFilter.class}
                    onChange={handleDropDownChange}
                  >
                    <option value="">All</option>
                    {getClassOptionsSearch().map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <label htmlFor="sectionDropdown" className="mr-2 text-sm font-medium">Section:</label>
                  <select
                    id="sectionDropdown"
                    name='section'
                    className="w-32 px-2 py-1 border rounded mr-4"
                    value={searchFilter.section}
                    onChange={handleDropDownChange}
                  >
                    <option value="">All</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D </option>
                  </select>
                </div>

                {/* enable if don't want to search automatic */}
                {/* <div className='relative'>
                  <button
                    type='submit'
                    className="px-2 py-1 mr-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={handleSearch}
                  >
                  Search
                  </button>
                </div> */}
              </div>

              <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>            
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-5 py-3 border text-center ">
                    S_No.
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center ">
                    Name
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Age
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    ID
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Class Teacher
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Group
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Contact
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Emergency Contact
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    House
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Joining Date
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Father's Name
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Mother's Name
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Religion
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Blood Group
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    DOB
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Address
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center">
                    Van
                  </th>
                  <th scope="col" className="px-5 py-3 border text-center ">
                    Actions
                  </th>
                </tr>
              </thead>
                <tbody>
                  {filteredTeachers.map((val, ind) => (
                    <tr key={val._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center whitespace-nowrap dark:text-white'>{ind+1}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center whitespace-nowrap dark:text-white'>{val.name}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.age}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.ID}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.class_teacher}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.group}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.contact}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.emergency_contact}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.house}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.joining_date}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.father_name}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.mother_name}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.religion}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.blood_group}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.DOB}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.address}</td>
                      <td  className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.van}</td>
                      <td  className='px-1 flex '>
                        <button
                          className="bg-gray-300 hover:bg-green-400 text-sm text-black font-bold py-2 px-4 rounded mr-2"
                          onClick={()=> handleEdit(val._id)} 
                        >
                          <img className='w-4 h4 text-black' src={require('../../img/edit-text.png')} alt="buttonpng" />
                          edit 
                        </button>
                        <button
                          className="bg-gray-300 hover:bg-red-400 text-sm text-black font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(val._id)}
                        >
                          <img className='w-4 h4 text-black' src={require('../../img/delete.png')} alt="buttonpng" />
                          del
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="pt-10 grid grid-cols-2 gap-20">
              <div className="border-2 border-red-300 rounded-lg p-8 flex flex-col items-center hover:bg-red-100 hover:cursor-pointer" onClick={() => setShowForm(true)}>
                <img className="w-30 h-24 mr-2 " src={require("../../img/add-new.png")} alt="Add Stu" />
                <h1 className="mt-3 font-bold ">New Entry</h1>
              </div>

              <div className="border-2 border-red-300 rounded-lg p-8 flex flex-col items-center hover:bg-red-100 hover:cursor-pointer" onClick={() => setShowExistingTeachers(true)}>
                <img className="w-30 h-24 mr-2 " src={require("../../img/exist-user.png")} alt="exist Stu" />
                <h1 className="mt-3 font-bold ">Existing Teachers</h1>
              </div>
            </div>

            <div className="mt-12 p-4 h-60 border-red-900 rounded-lg  bg-slate-100">
              <h1 className="font-bold">Note-</h1>
              {/* add note functionality */}
              <textarea
                className="w-full h-40 p-3 mt-2 bg-transparent border rounded outline-none"
                value={note}
                onChange={handleNoteChange}
                placeholder="Add a note..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>Do you want to delete this teacher?</p>
            <div className="flex justify-end mt-4">
              <button
                type='submit'
                className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={handleCancelDelete}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ManageTeachers;