import React, { useEffect, useState, useContext} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import StaffForm from './StaffForm.jsx';
import Alert from '@mui/material/Alert';
import { LoadingContext } from '../../App.js';
import DigitalBahi from './DigitalBahi.jsx';
import {registerStaff, getStaff} from '../../controllers/loginRoutes.js';

const Payroll = ({adminId}) => {
  const [exitStaffData, setExistStaffData] = useState([]); // existing staff-> table data store in it
  const [notValidTable, setNotValidTable] = useState(0);
  const { isLoading, toggleLoading } = useContext(LoadingContext);
  const [success, setSuccess] = useState(false);
  const [payrollData, setPayrollData]= useState({ // for new entry and edit staff purpose
    fullName: '',
    fatherName: "",
    contact: '',
    emergency_contact: '',
    dob: '',
    jobPosition: '',
    aadharNo: '',
    joining_date: '',
    underBy: adminId
  })

  const [prData, setPrData]=useState([]);
  // console.log(payrollData);
  const [payrollDropdown, setPayrollDropdown] = useState({
    staffpayroll: '',
    session: '',
    month: ''
  });

  const [digtalBahiIndex, setDigitalBahiIndex] = useState();

  useEffect(() => {
    if (payrollDropdown.session && payrollDropdown.month && exitStaffData.length > 0) {
      const updatedPrData = [];
      exitStaffData.forEach((staff) => {
        const sessionFound = staff.sessions.find(
          (session) => session.session_name === payrollDropdown.session
        );

        if (sessionFound && sessionFound.months[payrollDropdown.month]) {
          const selectedMonth = sessionFound.months[payrollDropdown.month];

          // Update prData state based on the selected month's data
          const staffData= {
            total_working_days: selectedMonth.total_working_days,
            present: selectedMonth.present,
            absent: selectedMonth.absent,
            half_days: selectedMonth.half_days,
            paid_leaves: selectedMonth.paid_leaves,
            available_leaves: selectedMonth.available_leaves,
            remaining_leaves: selectedMonth.remaining_leaves,
            total_salary: selectedMonth.total_salary,
            deducted_salary: selectedMonth.deducted_salary,
            remaining_amount: selectedMonth.remaining_amount,
          };
          updatedPrData.push(staffData);
        } 
        else{
          const staffData = {
            total_working_days: 0,
            present: 0,
            absent: 0,
            half_days: 0,
            paid_leaves: 0,
            available_leaves: 0,
            remaining_leaves: 0,
            total_salary: staff.total_salary,
            deducted_salary: 0,
            remaining_amount: 0,
          };
          updatedPrData.push(staffData);
        }
      });
      setPrData(updatedPrData);
    }
  }, [payrollDropdown.session, payrollDropdown.month, exitStaffData]);

  useEffect(() => {
    getStaff(adminId).then((resp)=>{
      console.log("staffs",resp);
      setExistStaffData(resp);
    })
  }, []);

  console.log("prData",prData);


  const months = ['January', 'February', 'March', 'April', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'];
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPayrollDropdown((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangePayrollData = (e)=>{
    const { name, value } = e.target;
      setPayrollData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  };
  const handleStaffFormSubmit = (e) => {
    e.preventDefault();
    toggleLoading(true);
    registerStaff(payrollData).then((resp)=>{
      // console.log(resp);
      setTimeout(()=>{
        toggleLoading(false);
        setSuccess(true);
      },2000);
    })
    .catch((err)=>{
      console.log("An error occured: ", err)
      setTimeout(()=>{
        toggleLoading(false);
        setSuccess(false);
      },2000);
    })
    setPayrollData({fullName: '',
      fatherName: "",
      contact: '',
      emergency_contact: '',
      dob: '',
      jobPosition: '',
      aadharNo: '',
      joining_date: '',
      underBy: adminId
      }
    );
  };
  const handleNewEntryClick = () =>{
    setPayrollData({
    fullName: '',
    fatherName: "",
    contact: '',
    emergency_contact: '',
    dob: '',
    jobPosition: '',
    aadharNo: '',
    joining_date: '',
    underBy: adminId
  })
    setSuccess(false);
  }
  const backhandler = ()=>{
    setPayrollDropdown((prevData)=>({
      ...prevData,
      ['staffpayroll']: ''
    }));
    setSuccess(false);
  }

  // exist staff table
 const tableDataChangeHandle = (e, index) => {
    const { name, value } = e.target;
    const updatedExitStaffData = [...exitStaffData];

    updatedExitStaffData[index] = {
      ...updatedExitStaffData[index],
      [payrollDropdown.session]: {
        ...updatedExitStaffData[index][payrollDropdown.session],
        [payrollDropdown.month]: {
          ...updatedExitStaffData[index][payrollDropdown.session][payrollDropdown.month],
          [name]: name === 'fullName' ? value : parseFloat(value) || 0,
        },
      },
    };
    

    // Validate salary when there's a change in any cell
    validateAndUpdateTable(index, updatedExitStaffData);

  };

  const validateAndUpdateTable = (index, updatedExitStaffData) => {
    const staffMember = updatedExitStaffData[index][payrollDropdown.session][payrollDropdown.month];

    // Calculate remaining leaves based on attendance
    const tempRemainingLeaves = staffMember.available_leaves - (staffMember.absent + 0.5 * staffMember.half_days);
    staffMember.remaining_leaves = Math.max(0, tempRemainingLeaves);

    // Calculate deducted salary based on remaining leaves
    if (staffMember.remaining_leaves <= 0) {
      staffMember.deducted_salary = staffMember.total_salary + (staffMember.remaining_leaves * (staffMember.total_salary / staffMember.total_working_days));
    } else {
      staffMember.deducted_salary = 0; // Reset deducted salary if leaves are available
    }

    // Update the staff member's data
    updatedExitStaffData[index][payrollDropdown.session][payrollDropdown.month] = staffMember;

    // Set the updated data back to state
    setExistStaffData(updatedExitStaffData);
  };

  const isTableValid = (index, data) => {
    for (const staff of data) {
      if (staff.present + staff.absent + staff.half_days !== staff.total_working_days) {
        return index+1;
      }
    }
    return 0;
  };

  const tableSubmit = ()=>{
    toggleLoading(true);
    setTimeout(()=>{
      toggleLoading(false);
      setSuccess(true);
    },3000);
    setTimeout(()=>{
      setSuccess(false);
    },50000)
  }
  const handleEditButton = (index)=>{
    // payroll data me partcular staff memeber insert krna h
    // console.log("exitStaff", exitStaffData[index]);
    setPayrollData(exitStaffData[index])
    setPayrollDropdown((prevData) => ({
      ...prevData,
      ['staffpayroll']: "Edit Staff",
    }));
  }
  const handleDigitalBahi = (index) =>{
    setDigitalBahiIndex(index);
    setPayrollDropdown((prevData) => ({
      ...prevData,
      ['staffpayroll']: "Digital Bahi",
    }));
  }
  const digitalBahiChangeHandle =(val)=>{ //call on DigitalBahi.jsx component
    const updatedExitStaffData = [...exitStaffData];
    updatedExitStaffData[digtalBahiIndex] = {
      ...updatedExitStaffData[digtalBahiIndex],
      ['remaining_amount']: val
    };
    setExistStaffData(updatedExitStaffData);
  };
  const DigitalBahiHandleSubmit = ()=>{  //call on input of DigitalBahi.jsx component
    setPayrollDropdown((prevData) => ({ 
      ...prevData,
      ['staffpayroll']: "",
    }));
  }
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
      {/* header */}
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
          <img className="w-12 h-9 mr-2 " src={require("../../img/payroll.png")} alt="StudentLogo" />
          <h1 className="font-bold ">Payroll Mangement</h1>
        </div>
          {payrollDropdown.staffpayroll && (
            <div className='flex items-center'>
              <button className="m-1 mt-4 w-fit " onClick={backhandler}>
                <img className="w-9 h-9 mr-5" src={require("../../img/backsimp.png")} alt="StudentLogo" />
              </button>
              <h1 className='font-bold'>{payrollDropdown.staffpayroll}</h1>
            </div>
          )}
          {payrollDropdown.staffpayroll=== "Digital Bahi" && (
            <DigitalBahi staffMemeber={exitStaffData[digtalBahiIndex]} digitalBahiChangeHandle={digitalBahiChangeHandle} DigitalBahiHandleSubmit={DigitalBahiHandleSubmit}/>
          )}

          {(payrollDropdown.staffpayroll === "New Staff Entry" || payrollDropdown.staffpayroll === "Edit Staff") && ( 
            success ? (
                <>
                  <Alert severity="success" className='mt-4'>Staff Successfully Registered</Alert>
                  <div className='flex flex-row justify-end '>
                    <button
                      className="h-10 m-8  bg-blue-200 hover:bg-blue-400 text-white font-semibold px-12 rounded-full focus:outline-none"
                      onClick={handleNewEntryClick}
                    >
                      Add New Staff Entry
                    </button>
                  </div>
                </>
            ) : (
              <StaffForm formData={payrollData} handleFormChange={handleChangePayrollData} formSubmit={handleStaffFormSubmit}/>
            )
          )}

          {(payrollDropdown.staffpayroll === "" || payrollDropdown.staffpayroll === "Exist Staff") && (
          <div style={bgcolor2} className="border-2 mt-5 border-red-300 rounded-lg p-10 ">
            
              <dir className='dropdowns flex justify-between'>
                <div className='flex  items-center'>
                  <label htmlFor="staffpayroll" className='font-bold text-md mr-2 w-full'>Staff Payroll: </label>
                  <select name="staffpayroll" className='rounded p-1' value={payrollDropdown.staffpayroll}
                    onChange={handleFormChange}>
                    <option value="">Select an option</option>
                    <option value="New Staff Entry">New Staff Entry</option>
                    <option value="Exist Staff">Existing Staff Entry</option>
                  </select>
                </div>
                <div className='flex  items-center'>
                  <label htmlFor="session" className='font-bold text-md mr-2 w-full'>Session: </label>
                  <select name="session" className='rounded p-1' value={payrollDropdown.session}
                    onChange={handleFormChange}>
                    <option value="">Select an option</option>
                    <option value="2022-23">2022-23</option>
                    <option value="2023-24">2023-24</option>
                    <option value="2024-25">2024-25</option>
                  </select>
                </div>  
                <div className='flex  items-center'>
                  <label htmlFor="month" className='font-bold text-md mr-2 w-full'>Month: </label>
                  <select name="month" className='rounded p-1' value={payrollDropdown.month}
                    onChange={handleFormChange}>
                    <option value="">Select an option</option>
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </dir>
              {payrollDropdown.staffpayroll === "Exist Staff" && payrollDropdown.session && payrollDropdown.month &&  (
                <div className='border-2 border-red-200 rounded p-4 bg-white flex flex-col'>
                  <table className="w-full px-2">
                    <thead className='bg-slate-300'>
                      <tr>
                        <th className="text-center border-[1px] border-black px-2">Name</th>
                        <th className="text-center border-[1px] border-black px-2">Total Working Days</th>
                        <th className="text-center border-[1px] border-black px-2">Present</th>
                        <th className="text-center border-[1px] border-black px-2">Absent</th>
                        <th className="text-center border-[1px] border-black px-2">Half Days</th>
                        <th className="text-center border-[1px] border-black px-2">Paid Leaves <p className='text-[10px]'>(per month)</p></th>
                        <th className="text-center border-[1px] border-black px-2">Available Leaves</th>
                        <th className="text-center border-[1px] border-black px-2">Remaining Leaves</th>
                        <th className="text-center border-[1px] border-black px-2">Total Salary</th>
                        <th className="text-center border-[1px] border-black px-2">Deducted Salary</th>
                        <th className="text-center border-[1px] border-black px-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exitStaffData.map((staff, index) => (
                        <tr key={index}>
                          <td className="text-center border border-black bg-slate-200">
                            <input
                              type="text"
                              name="fullName"
                              value={exitStaffData[index]?.fullName }
                              className="px-2 w-full bg-slate-200"
                              onChange={(e) => tableDataChangeHandle(e, index)}
                            />
                          </td>
                          <td className="text-center border border-black">
                            <input
                              type="number"
                              name="total_working_days"
                              value={prData[index]?.total_working_days }
                              min="0"
                              max="31"
                              className="w-full px-2"
                              onChange={(e) => tableDataChangeHandle(e, index)}
                            />
                          </td>
                          <td className="text-center border border-black">
                            <input
                              type="number"
                              name="present"
                              value={prData[index]?.present }
                              min="0"
                              className="w-full px-2"
                              onChange={(e) => tableDataChangeHandle(e, index)}
                            />
                          </td>
                          <td className="text-center border border-black">
                            <input
                              type="number"
                              name="absent"
                              value={prData[index]?.absent }
                              min="0"
                              className="w-full px-2"
                              onChange={(e) => tableDataChangeHandle(e, index)}
                            />
                          </td>
                          <td className="text-center border border-black">
                            <input
                              type="number"
                              name="half_days"
                              value={prData[index]?.half_days }
                              min="0"
                              className="w-full px-2"
                              onChange={(e) => tableDataChangeHandle(e, index)}
                            />
                          </td>
                          <td className="text-center border border-black">
                            <input
                              type="number"
                              name="paid_leaves"
                              value={prData[index]?.paid_leaves }
                              min="0"
                              className="w-full px-2"
                              onChange={(e) => tableDataChangeHandle(e, index)}
                            />
                          </td>
                          <td className="text-center border border-black">
                            <input
                              readOnly
                              type="number"
                              name="available_leaves"
                              value={prData[index]?.available_leaves }
                              min="0"
                              className="w-full px-2"
                              onChange={(e) => tableDataChangeHandle(e, index)}
                            />
                          </td>
                          <td className="text-center border border-black">
                            <input
                              readOnly
                              type="number"
                              name="remaining_leaves"
                              min="0"
                              value={(prData.remaining_leaves || 0) < 0 ? 0 : (prData.remaining_leaves || 0)}
                              className="w-full px-2"
                              onChange={(e) => tableDataChangeHandle(e, index)}
                            />
                          </td>
                          <td className="text-center border border-black">
                            <input
                              type="number"
                              name="total_salary"
                              value={prData[index]?.total_salary }
                              min="0"
                              className="w-full px-2"
                              readOnly
                              onChange={(e) => tableDataChangeHandle(e, index)}
                            />
                          </td>
                          <td className="text-center border border-black">
                            <input
                              type="number"
                              name="deducted_salary"
                              value={prData[index]?.deducted_salary }
                              min="0"
                              className="w-full px-2"
                              readOnly
                              onChange={(e) => tableDataChangeHandle(e, index)}
                            />
                          </td>

                          <td className="text-center border border-black flex">
                              <button
                                className="bg-green-300 hover:bg-green-400 text-[9px] text-black font-bold py-2 px-2 rounded mr-2"
                                onClick={()=>handleDigitalBahi(index)}
                              >
                                Digital Bahi
                              </button>
                              <button
                                onClick={()=>handleEditButton(index)}
                                className="bg-red-300 hover:bg-red-400 text-[9px] text-black font-bold py-2 px-2 rounded"
                              >
                                Edit
                              </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {notValidTable>0 && <p className='text-red-400 font-sm m-[20px]'>*Error at {notValidTable} Please ensure that 'Present + Absent + Half Days' equals 'Total Working Days' for all staff.</p>}
                  <div className=' grid justify-items-end mt-5'>
                    <button 
                      className="h-10 bg-blue-600 hover:bg-blue-800 text-white font-semibold px-6 rounded-full focus:outline-none" 
                      onClick={tableSubmit}
                      disabled={notValidTable}
                      type="submit" >Update</button>
                  </div>
                  {success && (
                  <Alert severity="success" className='mt-4'>Table Data Successfully Updated</Alert>
                  )}
                </div>
              )}
          </div>
          )}


    </div>
  )
}

export default Payroll