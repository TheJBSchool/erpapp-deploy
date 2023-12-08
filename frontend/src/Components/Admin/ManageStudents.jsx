import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { bgcolor1, bgcolor2 } from "../Home/custom.js";
import { register_student, all_students, studentUpdate, studentDelete, searchStudents, studentSearchBar } from '../../controllers/loginRoutes.js';
import StudentForm from './StudentForm';
import '../../App.css'

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [finalStudents, setFinalStudents] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    group: "",
    class: "",
    section: "",
    ID: "",
    name: ""
  });
  useEffect(() => {
    all_students().then((resp) => {
      setStudents(resp.all_students);
    })
  }, [])
  useEffect(()=>{
    filterStudents();
  },[searchFilter])
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    ID: '',
    rollno: '',
    password: '',
    session: '',
    class: '',
    section: '',
    group: '',
    contact: '',
    emergency_contact: '',
    house: '',
    admission_date: '',
    guardian: '',
    father_name: '',
    mother_name: '',
    religion: '',
    blood_group: '',
    DOB: '',
    address: '',
    van: '',
  });
  const [note, setNote] = useState("");
  const [temp, tempNote] = useState("x");
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [showExistingStudents, setShowExistingStudents] = useState(false); // State to control existing user visibility
  const [StuEdit, setStuEdit] = useState(false);
  const [StuEditId, setStuEditId] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
  const filterStudents = () => {
    setFinalStudents([]);
    let arr = [];
    for (let i = 0; i < students.length; i++) {
      if ((searchFilter.name && !students[i].name.includes(searchFilter.name))||(searchFilter.class && searchFilter.class !== students[i].class)||(searchFilter.group && searchFilter.group !== students[i].group)||(searchFilter.ID && !students[i].ID.includes(searchFilter.ID))||(searchFilter.section && searchFilter.section !== students[i].section)) { }
      else arr.push(students[i]);
    } 
    setFinalStudents(arr);
  }
  const findStudentToEdit = (id) => {
    setStuEditId(id);
    setFormData(students.find((student) => student._id === id));
  };
  const handleEdit = (sid) => {
    findStudentToEdit(sid);
    setStuEdit(true);
    setShowForm(true);
    setSuccess(false);
  }
  const handleNewEntryClick = () => {
    setFormData({
      name: '',
      age: '',
      ID: '',
      rollno: '',
      password: '',
      session: '',
      class: '',
      section: '',
      group: '',
      contact: '',
      emergency_contact: '',
      house: '',
      admission_date: '',
      // guardian: '',
      father_name: '',
      mother_name: '',
      religion: '',
      blood_group: '',
      DOB: '',
      address: '',
      van: ''
    });
    setSuccess(false);
  };
  const handleExistingUserClick = () => {
    setShowForm(false);
    setShowExistingStudents(true);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submit Clicked");
    setLoading(true); // Start loading

    if (StuEdit) {
      studentUpdate(StuEditId, formData).then((resp) => {
        if (resp.status !== 201) {
          tempNote("Student Data Update unsuccessful ");
          // console.log("Update unsuccessful ");
        } else {
          tempNote("Student Data Updated successfully ");
          // console.log("Update successful ");
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
    else {
      register_student(formData)
        .then((resp) => {
          if (resp.status !== 201) {
            tempNote("unsuccessful registration");
            console.log("unsuccessful registration");
          } else {
            tempNote("successful registration");
            console.log("successful registration");
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
  //For delete the student
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [studentToDeleteId, setStudentToDeleteId] = useState(null);
  const handleDelete = (id) => {
    setStudentToDeleteId(id);
    setShowDeleteConfirmation(true);
  };
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setStudentToDeleteId(null);
  };
  const handleConfirmDelete = () => {
    console.log(studentDelete);
    if (studentToDeleteId) {
      studentDelete(studentToDeleteId)
        .then(() => {
          // Update students array and handle success
          setStudents(students.filter(student => student._id !== studentToDeleteId));
          setFinalStudents(students.filter(student => student._id !== studentToDeleteId));
          setStudentToDeleteId(null);
          setShowDeleteConfirmation(false);
          // console.log("Deleted successfully");

        })
        .catch(error => {
          // Handle error
          console.error("Error deleting student: ", error);
        });
    }
  };
  const getClassOptionsSearch = () => {
    if (searchFilter?.group === 'Pre') {
      return ['Pre-Nursery', 'Nursery', 'LKG', 'UKG'];
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
  };

  return (
    <>
      <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 backdrop-blur-[100px]">
        {/* header */}
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
          <img className="w-9 h-9 mr-2 " src={require("../../img/student.png")} alt="StudentLogo" />
          <h1 className="font-bold ">Manage Student</h1>
        </div>
        {/* main */}
        <div className='main'>
          {showForm ? (
            <div className="mt-12 p-4">
              <h2 className="text-2xl font-bold mb-4">Student Information</h2>
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
                  <StudentForm
                    formData={formData}
                    handleFormChange={handleFormChange}
                    formSubmit={formSubmit}
                  />
                </>
              )};
            </div>
          ) : showExistingStudents ? (<>
            <div className="mt-12 p-4 bg-gray-100 rounded-lg">
              <h1 className='font-semi-bold text-2xl mb-6'>Existing Students</h1>
              <div className="flex space-x-2 justify-start mb-6">
                {/* Add search bars for user ID and name */}
                <div className="relative">
                  <input
                    type="text"
                    name='ID'
                    className="w-32 px-2 py-1 border rounded mr-4 text-sm"
                    placeholder="&#128269; Enter User ID"
                    value={searchFilter.ID}
                    onChange={handleDropDownChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name='name'
                    className="w-32 px-2 py-1 border rounded mr-4 text-sm"
                    placeholder="&#128269; Enter Name"
                    value={searchFilter.name}
                    onChange={handleDropDownChange}
                  />
                </div>
                {/* dropdown filters */}
                <div className="relative">
                  <label htmlFor="groupDropdown" className="mr-2 text-sm font-medium">Group:</label>
                  <select
                    id="groupDropdown"
                    name='group'
                    className="w-32 px-2 py-1 border rounded mr-4"
                    // value={searchFilter.group}
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
                    // value={searchFilter.class}
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
                        Roll No.
                      </th>
                      <th scope="col" className="px-5 py-3 border text-center">
                        Group
                      </th>
                      <th scope="col" className="px-5 py-3 border text-center">
                        Class
                      </th>
                      <th scope="col" className="px-5 py-3 border text-center">
                        Section
                      </th>
                      <th scope="col" className="px-5 py-3 border text-center">
                        Contact
                      </th>
                      {/* <th scope="col" className="px-5 py-3 border text-center">
                        Emergency Contact
                      </th> */}
                      <th scope="col" className="px-5 py-3 border text-center">
                        House
                      </th>
                      <th scope="col" className="px-5 py-3 border text-center">
                        Admission Date
                      </th>
                      {/* <th scope="col" className="px-5 py-3 border text-center">
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
                      </th>*/}
                      <th scope="col" className="px-5 py-3 border text-center ">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalStudents.map((val, ind) => (
                      <tr key={val._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center whitespace-nowrap dark:text-white'>{ind + 1}</td>
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center whitespace-nowrap dark:text-white'>{val.name}</td>
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.age}</td>
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.ID}</td>
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.rollno}</td>
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.group}</td>
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.class}</td>
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.section}</td>
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.contact}</td>
                        {/* <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.emergency_contact}</td> */}
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.house}</td>
                        <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.admission_date}</td>
                        {/* <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.father_name}</td> */}
                        {/* <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.mother_name}</td> */}
                        {/* <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.religion}</td> */}
                        {/* <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.blood_group}</td> */}
                        {/* <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.DOB}</td> */}
                        {/* <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.address}</td> */}
                        {/* <td className='px-1 py-2 font-medium text-gray-900 border text-center dark:text-white'>{val.van}</td> */}
                        <td className='px-1 flex  '>
                          <button
                            className="bg-gray-300 hover:bg-green-400 text-sm text-black font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleEdit(val._id)}
                          >
                            <img className='w-4 h4 text-black' src={require('../../img/edit-text.png')} alt="buttonpng" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(val._id)}
                            className="bg-gray-300 hover:bg-red-400 text-sm text-black font-bold py-2 px-4 rounded"
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
          </>) : (
            <div>
              <div className="pt-10 grid grid-cols-2 gap-20">
                <div className="border-2 border-red-300 rounded-lg p-8 flex flex-col items-center hover:bg-red-100 hover:cursor-pointer" onClick={() => setShowForm(true)}>
                  <img className="w-30 h-24 mr-2 " src={require("../../img/add-new.png")} alt="Add Stu" />
                  <h1 className="mt-3 font-bold ">New Entry</h1>
                </div>

                <div className="border-2 border-red-300 rounded-lg p-8 flex flex-col items-center hover:bg-red-100 hover:cursor-pointer" onClick={() => setShowExistingStudents(true)}>
                  <img className="w-30 h-24 mr-2 " src={require("../../img/exist-user.png")} alt="exist Stu" />
                  <h1 className="mt-3 font-bold ">Existing Students</h1>
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
          )}
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>Do you want to delete this student?</p>
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

export default ManageStudent;