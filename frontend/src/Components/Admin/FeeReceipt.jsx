import React, { useState, useRef, useEffect} from 'react'
import { bgcolor2 } from "../Home/custom.js";
import Receipt from './Receipt';
import { useReactToPrint } from 'react-to-print';

const columns = [
  'Pre-Nursery', 'Nursery', 'LKG', 'UKG',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
];
const FeeReceipt = () => {
  const [searchStuDropdown, setSearchStuDropdown]= useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const searchReceipt = () => {
    if (formData.session && formData.section && formData.studentClass && fullName) {
      getFeeDetails({ session: stuSelected.session, class: stuSelected.class },adminId).then((resp) => {
        setCurrFee(resp.data);
        setDeadlines(resp.data.date1);
        setPayBtn(true);
      })
    } else {
      console.log("First Enter required details");
      return;
    }

    let feeArray = stuSelected.feePayments;
    let updatedQuarterIcons = [false, false, false, false, false];
    for (let quarter = 1; quarter <= 4; quarter++) 
    {
      const payment = feeArray.find(payment => payment.quarter === quarter);
      if (payment) {
        updatedQuarterIcons[quarter]=true;
      }
    }
    setQuarterIcons([...updatedQuarterIcons]);
  };
  
  const payFees = (quarter) => {
    const curr_deadline = quarterDeadlines[quarter];
    const curr_date = new Date();

    //ON TIME FEE PAY
    if(curr_deadline>=curr_date)
    {
      console.log("on time")
    }
    //LATE FEE ADD
    else
    {
      console.log("late fee")
    }
  }

  const handlePaymentAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    setPaymentAmount(amount);
  };

  // Function to process the payment and update the fees
  const handlePayment = () => {
    const updatedFeeData = { ...feeData };
    let money = paymentAmount;

    if (money <= 0) {
      // Handle the case where the payment amount is zero or negative
      // show an error message or take appropriate action
      return;
    }
    if (updatedFeeData.pandingFee > 0) {
      // Deduct from late fee
      const pandingFeeDeducted = Math.min(updatedFeeData.pandingFee, money);
      updatedFeeData.pandingFee -= pandingFeeDeducted;
      money -= pandingFeeDeducted;
    }

    // Deduct the payment amount from different fee types
    if (updatedFeeData.lateFee > 0) {
      // Deduct from late fee
      const lateFeeDeducted = Math.min(updatedFeeData.lateFee, money);
      updatedFeeData.lateFee -= lateFeeDeducted;
      money -= lateFeeDeducted;
    }

    if (updatedFeeData.admissionFee > 0) {
      // Deduct from admission fee
      // console.log(updatedFeeData.admissionFee);
      // console.log('paymentAmount')
      // console.log(paymentAmount);
      const admissionFeeDeducted = Math.min(updatedFeeData.admissionFee, money);
      // console.log(admissionFeeDeducted);
      updatedFeeData.admissionFee -= admissionFeeDeducted;
      money -= admissionFeeDeducted;
    }

    if (updatedFeeData.annualFee > 0) {
      // Deduct from annual fee
      const annualFeeDeducted = Math.min(updatedFeeData.annualFee, money);
      updatedFeeData.annualFee -= annualFeeDeducted;
      money -= annualFeeDeducted;
    }

    if (updatedFeeData.transportationFee > 0) {
      // Deduct from transportation fee
      const transportationFeeDeducted = Math.min(updatedFeeData.transportationFee, money);
      updatedFeeData.transportationFee -= transportationFeeDeducted;
      money -= transportationFeeDeducted;
    }

    // At this point, the remaining paymentAmount should be 0
    if (money > 0) {
      // Handle the case where there's remaining payment that couldn't be deducted
      // You can show an error message or take appropriate action
      return;
    }

    // Update the fee data with the deducted amounts
    setFeeData(updatedFeeData);

    // You can also update the totalPaid and remainingFee accordingly
    const remFees = feeData.pandingFee +
                    feeData.admissionFee +
                    feeData.annualFee +
                    feeData.transportationFee +
                    feeData.lateFee - paymentAmount;
    setRemainingFee(remFees);

    // You can then proceed with updating the fees in your backend.
    // Example: setFees(updatedFeeData).then((resp) => { ... });
  };

  const clickHandle = (e)=>{
    // console.log(e);
    setStuSelected(e);
    // console.log(stuSelected);
    setFullName(e.name);
    setFatherName(e.father_name);
    setRollno(e.rollno);
    setSearchStuDropdown(false);

  }

  
  const handleFullNameChange = (e)=>{
    setFullName(e.target.value);
    setSearchStuDropdown(true);

    // filter student based on inital full name
    let arr=[];
    setFilterStu(arr);
    filteredData.map((val)=>{
      if(val.name.toLowerCase().includes(fullName.toLowerCase())){
        arr.push(val);
      }
    })
    setFilterStu(arr);
  }

  const quarterSelectHandle = (e,index)=>{
    e.preventDefault();
    if(quarterIcons[index+1]===false){
      console.log("insert",index+1);
      setQuarterSelectIndex(index+1)

    }
  }
  // console.log(quarterSelectIndex);

  const payOtherHandle = (e)=>{
    e.preventDefault();
    setPayOther(true);
  }

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString();
    setCurrentDate(formattedDate);
  },[]);
  useEffect(()=>{
    getStudent({session: formData.session, section: formData.section, class: formData.studentClass},adminId).then((resp)=>{
      setFilteredData(resp.data);
    })
  });

  const [fullName,setFullName] = useState('');
  const [formData, setFormData] = useState({
    session:'',
    section: '',
    studentClass: '',
  });

  const handleInputChange = (event) => {
    const { name, value} = event.target;
    setFormData({ ...formData, [name]: value });
  };

    const printReceipt = useReactToPrint({
    content: () => receiptRef.current,
  });

  const createManualReceipt = () => {
    alert('Manual Receipt Created!');
  };

   const setDeadlines = (date) => {
    let sessionStartDate = date;
    const updatedQuarterDeadlines = [...quarterDeadlines];
    updatedQuarterDeadlines[1] = new Date(sessionStartDate);
    updatedQuarterDeadlines[1].setMonth(updatedQuarterDeadlines[1].getMonth() + 3);
    updatedQuarterDeadlines[1].setDate(updatedQuarterDeadlines[1].getDate() - 1);

    updatedQuarterDeadlines[2] = new Date(sessionStartDate);
    updatedQuarterDeadlines[2].setMonth(updatedQuarterDeadlines[2].getMonth() + 6);
    updatedQuarterDeadlines[2].setDate(updatedQuarterDeadlines[2].getDate() - 1);

    updatedQuarterDeadlines[3] = new Date(sessionStartDate);
    updatedQuarterDeadlines[3].setMonth(updatedQuarterDeadlines[3].getMonth() + 9);
    updatedQuarterDeadlines[3].setDate(updatedQuarterDeadlines[3].getDate() - 1);

    updatedQuarterDeadlines[4] = new Date(sessionStartDate);
    updatedQuarterDeadlines[4].setFullYear(updatedQuarterDeadlines[4].getFullYear() + 1);
    updatedQuarterDeadlines[4].setDate(updatedQuarterDeadlines[4].getDate() - 1);

    setQuarterDeadlines(updatedQuarterDeadlines);
  }

  const mapFeeSchemaToTableData = (feeSchema) => {
    return feeSchema.map((fee) => ({
      class: fee.class,
      'Admission Fees': fee.adm_fee,
      'Academic Fees': fee.academic_fee,
      'Late Fees': fee.late_fee,
      'Date 1': fee.date1,
      'Date 2': fee.date2,
      'Date 3': fee,
      'Date 4': fee.date4,
      'Late Fees after X days': fee.late_fee_x,
    }));
  };

  return (
    <div>
        <div style={bgcolor2} className="border-2 mt-5 border-red-300 rounded-lg p-9 ">
            <h1 className="text-3xl font-bold mb-4">Receipt Form</h1>
            {/* current Date */}
            <div className="flex mb-4">
              <label className="block mb-2 mr-3">Date: </label>
              <p>{currentDate}</p>
            </div>
              <form>
                <div className="grid grid-cols-3 gap-4">
                 

                  <div className="mb-4">
                    <label htmlFor='session' className="block mb-2">Session:</label>
                    <select id="session" className="w-full px-4 py-2 border rounded-lg " name="session" value={formData.session} onChange={handleInputChange} required>
                        <option value="">Select an option</option>
                        <option value="2022-23">2022-23</option>
                        <option value="2023-24">2023-24</option>
                        {/* <option value="E">E </option> */}
                    </select>
                  </div>

                   {/* Class */}
                  <div className="mb-4">
                    <label className="block mb-2">Class:</label>
                    <select
                      type="text"
                      name="studentClass"
                      value={formData.studentClass}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg "
                    >
                      <option value="">Select class</option>
                      {columns.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Section */}
                  <div className="mb-4">
                    <label className="block mb-2">Section:</label>
                    <select id="section" className="w-full px-4 py-2 border rounded-lg " name="section" value={formData.section} onChange={handleInputChange} required>
                        <option value="">Select an option</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D </option>
                        {/* <option value="E">E </option> */}
                    </select>
                  </div>
                  

                  {/* Full Name */}
                  <div className="mb-4">
                    <label className="block mb-2">Full Name:</label>
                    <input
                      disabled={!formData.session || !formData.section || !formData.studentClass}
                      type="text"
                      name="fullName"
                      value={fullName}
                      // onChange={handleInputChange}
                      onChange={handleFullNameChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    {/* search all students with maching above fullName inputed from user */}
                    {searchStuDropdown && (
                    <div className="bg-white w-full px-4 py-2 border rounded-lg">
                      {filterStu.map((opt,ind) =>(
                        <h1 key={ind} onClick={()=>{clickHandle(opt)}} className='hover:bg-slate-400 p-1 text-center rounded-sm border-b-2 cursor-pointer'>
                          {opt.name}
                        </h1>
                      ))}
                    </div>
                    )}
                  </div>

                  {/* Roll no */}
                  <div className="mb-4" >
                    <label htmlFor='rollno' className="block mb-2">Roll no:</label>
                    <input
                      type="text"
                      name="rollno"
                      value={rollno}
                      readOnly
                      // onChange={handleInputChange}
                      // required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-slate-100"
                    />
                  </div>

              

                  {/* Father's Name */}
                  <div className="mb-4">
                    <label className="block mb-2">Father's Name:</label>
                    <input
                      readOnly
                      type="text"
                      name="fatherName"
                      value={fatherName}
                      // onChange={handleInputChange}
                      // required
                      className="w-full px-4 py-2 border rounded-lg bg-slate-100 focus:outline-none"
                    />
                  </div>
                  {/* Search Button */}
                  <div className="col-span-3 flex justify-end">
                    <button
                      type="button"
                      onClick={searchReceipt}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Fee Details
                    </button>
                  </div>
                </div>
                  <hr className=' my-8 bg-red-300 text-red-300 h-[2px]' />
                  {/* Fee Type */}
                  {payBtn && (
                  <div> 

                    {/* quarterIcons */}
                    
                    <div className='flex mb-2'>
                      {quarterIcons.slice(1).map((val, ind) => (
                        <button onClick={(e)=>quarterSelectHandle(e,ind)} className={`px-4 py-2 ${val?'bg-green-600' : 'bg-red-600'}  text-white rounded-full mr-4 ${(quarterSelectIndex===ind+1 && val===false) ?'bg-red-700' : ''}` } key={ind}>Quarter {ind + 1}</button>
                      ))}
                      <button onClick={(e)=>quarterSelectHandle(e,-1)} className={`px-4 p bg-red-600 text-white rounded-full mr-4 ${quarterSelectIndex===0 ?'bg-red-700' : ''}` } >Other</button>
                    </div>
                    {quarterSelectIndex===0  && (
                      <div className="flex flex-col shadow-md rounded-lg p-7 text-center">
                          <div className='mb-2'>
                            <label htmlFor='pandingfee' className=" mb-2">Transportaion Fee: </label>
                            <input
                                className='mr-2 px-1 py-1'
                                type="number"
                                name="pandingfee"
                                // onChange={() => setAdmissionFeeApplied(!admissionFeeApplied)}
                              />
                            <button className='ml-4 bg-green-300 p-2 rounded hover:bg-green-400 w-fit' onClick={payOtherHandle} >
                              Pay Now
                            </button>
                          </div>
                          {payOther && (
                            <Alert severity="success">Transportation Fee Succecssfully Paid</Alert>
                          )}
                        </div>
                    )}

                    {quarterSelectIndex>0 && (
                    <div>

                     {quarterSelectIndex!==0  && (<h1>Quarter {quarterSelectIndex} Fee's Type :-</h1>)}
                    <div className="flex flex-col justify-center items-center font-semibold">
                      <div className='flex'>
                        <div className="flex flex-col items-end mr-10">
                          <label htmlFor='pandingfee' className=" mb-2">Pending Fee: </label>
                          <label htmlFor='admissionfee' className=" mb-2">Admission Fee: </label>
                          <label htmlFor='annualfee' className=" mb-2">Academic Fee:</label>
                          <label htmlFor='transfee' className=" mb-2">Transportation Fee:</label>
                           <label htmlFor='latefee' className=" mb-2">Late Fee:</label>
                        </div>

                        <div className="flex flex-col">
                          <div className='mb-2'>
                            <input
                                  readOnly
                                  className='mr-2'
                                  type="checkbox"
                                  name="pandingfee"
                                  checked={feeData.pandingFee > 0}
                                  // onChange={() => setAdmissionFeeApplied(!admissionFeeApplied)}
                                />
                            <span>{feeData.pandingFee}</span>
                          </div>
                          <div className='mb-2'>
                            <input
                                  readOnly
                                  className='mr-2'
                                  type="checkbox"
                                  name="admissionfee"
                                  checked={feeData.admissionFee> 0}
                                  // onChange={() => setAdmissionFeeApplied(!admissionFeeApplied)}
                                />
                            <span>{feeData.admissionFee}</span>
                          </div>
                          <div className='mb-2'>
                            <input
                                  readOnly
                                  className='mr-2'
                                  type="checkbox"
                                  name="annualfee"
                                  checked={feeData.annualFee}
                                  // onChange={() => setAdmissionFeeApplied(!admissionFeeApplied)}
                                />
                            <span >{feeData.annualFee}</span>
                          </div>
                          <div className='mb-2'>
                            <input
                                  readOnly
                                  className='mr-2'
                                  type="checkbox"
                                  name="transfee"
                                  checked={feeData.transportationFee >0}
                                  // onChange={() => setAdmissionFeeApplied(!admissionFeeApplied)}
                                />
                            <span >{feeData.transportationFee}</span>
                          </div>
                          <div className='mb-2'>
                            <input
                                  readOnly
                                  className='mr-2'
                                  type="checkbox"
                                  name="latefee"
                                  checked={feeData.lateFee >0 }
                                  // onChange={() => setAdmissionFeeApplied(!admissionFeeApplied)}
                                />
                            <span>{feeData.lateFee}</span>
                          </div>
                          

                          
                          
                          
                        </div>
                      </div>
                      
                      <div className="flex">
                        <label className="block mb-2 mt-5 mr-8">Total to be Paid:</label>
                        <input className='mb-2 mt-5 p-1 rounded-md px-2'
                          value= {feeData.pandingFee +feeData.admissionFee +
                            feeData.annualFee +
                            feeData.transportationFee +
                            feeData.lateFee}
                        />
                      </div>
                    </div>

                    <div className='mt-4'>
                      <div className="flex mb-4">
                        <label className="block mb-2">Payment Amount:</label>
                        <input
                          type="number"
                          name="paymentAmount"
                          value={paymentAmount}
                          onChange={handlePaymentAmountChange}
                          className="px-4 ml-4  border rounded-lg focus:outline-none "
                        />
                        <button
                          type="button"
                          onClick={handlePayment}
                          className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 rounded"
                        >
                          Enter
                        </button> 
                      </div>
                    </div>
                    
                    <div className='flex font-semibold'>
                      <div className="flex flex-col mr-10">
                        <label className=" mb-2">Fee's Paid: </label>
                        <label className=" mb-2">Remaining Fee's:</label>
                      </div>
                      <div className="flex flex-col">
                        <span className='mb-2 text-green-500'>{paymentAmount}</span>
                        <span className='mb-2 text-red-500'>{remainingFees}</span>
                      </div>
                    </div>

                  
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={printReceipt}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Print Receipt
                    </button>

                    {/* <button
                      onClick={createManualReceipt}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Create Manual Receipt
                    </button> */}
                  </div>
                  <Receipt receiptData={formData} refer={receiptRef} />
                  </div>)}
                </div>
                )}
              </form>
        </div>
    </div>
  )
}

export default FeeReceipt