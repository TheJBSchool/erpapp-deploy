import React, { useState, useRef, useEffect} from 'react'
import { bgcolor2 } from "../Home/custom.js";
import ConfirmationDialog from './ConfirmationDialog.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { feeSet, updateFees, getStudent, getFeeDetails} from '../../controllers/loginRoutes.js';
import Receipt from './Receipt';
import { useReactToPrint } from 'react-to-print';

// feeArray -> for current student (which quarter fee paid and when)
// currFee -> Fee amount, deadlines for each quarter, other details for a current session and class
// quarterIcons -> each quarter fee paid or not (true/false) [1 based indexing]
// quarterDeadlines -> quarter's deadlines [1 based indexing]
const Fees = ({adminId}) => {
  const [payOther, setPayOther] = useState(false); //state for other(transportation fee) pay btn 
  const [quarterSelectIndex, setQuarterSelectIndex] = useState();
  const [quarterIcons, setQuarterIcons] = useState([false, false, false, false, false]); // first false for other
  const [quarterDeadlines, setQuarterDeadlines] = useState([
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date()
  ]);
  // console.log(quarterDeadlines);
  const [searchStuDropdown, setSearchStuDropdown]= useState(false);
  const [stuSelected, setStuSelected]= useState({
    session: '',
    class: ''
  });
  const [fullName,setFullName] = useState('');
  const [rollno, setRollno]= useState('');
  const [fatherName, setFatherName]= useState('');
  const [payBtn, setPayBtn] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [filterStu,setFilterStu]= useState([]);
  const [currFee, setCurrFee] = useState();
  const [formData, setFormData] = useState({
    session:'',
    section: '',
    studentClass: '',
  });
  const [feeDetails, setFeeDetails] = useState({
    pandingFee: 10,
    admissionFeePaid: false,
    studentClass: '',
    admissionFee: 500,
    annualFee: 1000,
    transportationFee: 200,
    lateFee: 0,
    underBy: adminId
  });

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString();
    setCurrentDate(formattedDate);
  },[]);
  useEffect(()=>{
    getStudent({session: formData.session, section: formData.section, class: formData.studentClass},adminId).then((resp)=>{
      setFilteredData(resp.data);
    })
  });
  const receiptRef = useRef();
  const [showReceipt, setShowReceipt] = useState(false);
  const initialData = [
    { class: 'Pre-Nursery', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100" , 'Date 4':"100", 'Late Fees after X days': "100"},
    { class: 'Nursery', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100" , 'Date 4':"100", 'Late Fees after X days': "100"},
    { class: 'LKG', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100" , 'Date 4':"100", 'Late Fees after X days': "100"},
    { class: 'UKG', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100" , 'Date 4':"100", 'Late Fees after X days': "100"},
    { class: '1st', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100" , 'Date 4':"100", 'Late Fees after X days': "100"},
    { class: '2nd', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100", 'Date 4':"100", 'Late Fees after X days': "100" },
    { class: '3rd', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100", 'Date 4':"100", 'Late Fees after X days': "100" },
    { class: '4th', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100", 'Date 4':"100", 'Late Fees after X days': "100" },
    { class: '5th', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100", 'Date 4':"100", 'Late Fees after X days': "100" },
    { class: '6th', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100", 'Date 4':"100", 'Late Fees after X days': "100" },
    { class: '7th', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100", 'Date 4':"100", 'Late Fees after X days': "100" },
    { class: '8th', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100", 'Date 4':"100", 'Late Fees after X days': "100" },
    { class: '9th', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100", 'Date 4':"100", 'Late Fees after X days': "100" },
    { class: '10th', 'Admission Fees': "100", 'Academic Fees': "100", 'Late Fees': "100", 'Date 1': "100", 'Date 2': "100", 'Date 3': "100", 'Date 4':"100", 'Late Fees after X days': "100" },
  ];


  const [FeeSelectedItem, SetFeeSelectedItem] = useState('');
  const [showFeeConfirmation, setShowFeeConfirmation] = useState(false);
  const [noteFee, setNoteFee] = useState(0);
  const [feeData, setFeeData] = useState({
      pandingFee: '',
      pandingFee: '',
      admissionFee: '',
      annualFee: '',
      transportationFee: '',
      lateFee: '',
      underBy: adminId
  });
  // console.log(quarterIcons);
  const [selectedSession, setSelectedSession] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [tableData, setTableData] = useState(initialData);
  const [feeSchemaData, setFeeSchemaData]= useState();
  
  const columns = [
    'Pre-Nursery', 'Nursery', 'LKG', 'UKG',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
  ];

  const rowData = [
    'Admission Fees', 'Academic Fees', 'Late Fees',
    'Late Fee Separator', // Add a separator row
    'Date 1',
    'Date 2',
    'Date 3',
    'Date 4', 
    'Late Fee Separator', // Add another separator row
    'Days after which late fee apply'
  ];

  
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


  const handleCellChange = (value, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = value;

    //convert table to schema data and set schemaData state here
    const updatedSchemaData = newData.map((row) => ({
      class: row.class,
      adm_fee: row['Admission Fees'],
      academic_fee: row['Academic Fees'],
      late_fee: row['Late Fees'],
      date1: row['Date 1'],
      date2: row['Date 2'],
      date3: row['Date 3'],
      date4: row['Date 4'],
      late_fee_x: row['Late Fees after X days'],
      underBy: adminId
    }));

    setFeeSchemaData(updatedSchemaData);
    setTableData(newData);
  };

  const handleConfirm = () => {
    setShowFeeConfirmation(false);
    // setLoading(true);

    let check=0;
    for(let i=0;i<feeSchemaData.length;i++)
    {
      for (const key in feeSchemaData[i]) {
        if (feeSchemaData[i].hasOwnProperty(key)) {
          const value = feeSchemaData[i][key];
          if(value<=0) {check=1; break;}
        }
      }
      if(check==1)
        break;
    }
    if(check==1)
    {
      setNoteFee(1);
      return;
    }
    setNoteFee(0);
    for(let i=0;i<feeSchemaData.length;i++)
    {
      feeSet(feeSchemaData[i]).then((resp)=>{
        console.log(resp);  
      })
    }

    // if(FeeSelectedItem === "setfees"){
    //   setFees().then((resp) => {
    //       if (resp.status !== 201) {
    //         const data = resp.json();
    //         setFeeSchemaData(data);
    //         setTableData(mapFeeSchemaToTableData(data)); 
    //       } 
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     })
    //     .finally(() => {
    //       setLoading(false); // Stop loading
    //   });
    // }
    // else{
    //   updateFees(feeSchemaData).then((resp) => {

    //       if (resp.status !== 201) {
    //         setSuccess(true);
    //       } else {
    //         setSuccess(false); 
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     })
    //     .finally(() => {
    //       setLoading(false); // Stop loading
    //   });

    // }


    // setTimeout(() => {
    //   console.log("Delayed for 1 second.");
      
    // }, "2000");
  };

  const formSubmit = () =>{
        // console.log(feeSchemaData);
        setShowFeeConfirmation(true);
  }
  const handleCloseDialog = () => {
    setShowFeeConfirmation(false);
  };

  const loadinghandler = (()=>{setLoading(!loading)})

  const backhandler = (()=> {
    setSuccess(false);
    SetFeeSelectedItem("");
  });

// receipt part
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [remainingFees, setRemainingFee] = useState(0);
  
  const handleInputChange = (event) => {
    const { name, value} = event.target;
    // console.log(name);
    // console.log(value);
    // const inputValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotalFee = () => {
    const {pandingFee, admissionFee, annualFee, transportationFee, lateFee } = formData;
    return pandingFee + admissionFee + annualFee + transportationFee + lateFee;
  };

  const totalFee = calculateTotalFee();
  let totalPaid = formData.admissionFeePaid ? formData.admissionFee : 0;
  const remainingFee = totalFee - totalPaid;

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


  return (
    <>
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
      {/* header */}
      <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
        <img className="w-9 h-9 mr-2 " src={require("../../img/schoolfee.png")} alt="StudentLogo" />
        <h1 className="font-bold ">Fees Management</h1>
      </div>

      <button className="m-1 mt-4 w-fit" onClick={backhandler}>
        <img className="w-9 h-9 " src={require("../../img/backsimp.png")} alt="StudentLogo" />
      </button>

      {FeeSelectedItem === "" && (
      <div className='main'>
        <div style={bgcolor2} className="border-2 mt-5 border-red-300 rounded-lg grid grid-cols-3 gap-12 p-10 ">

          <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => SetFeeSelectedItem('setfees')} >
            <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/setfees.png')} />
            <p className="font-bold text-sm">Set Fees's</p>
          </div>

          <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => SetFeeSelectedItem('editfees')}>
            <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/editfees.png')} />
            <p className="font-bold text-sm">Edit Fees's</p>
          </div>

          <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => SetFeeSelectedItem('feereceipt')}>
            <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/feereceipt.png')} />
            <p className="font-bold text-sm">Receipt</p>
          </div>
        </div>
      </div>
      )}


      {(FeeSelectedItem === "setfees" || FeeSelectedItem === "editfees" )  && (
      <div className='main'>
        <div style={bgcolor2} className="border-2 mt-5 border-red-300 rounded-lg p-9 ">
          <div className='flex '>
            <img className="h-8 w-8 mb-4 mr-2" alt="Timetable" src={require('../../img/setfees.png')} />
            <h1 className="font-bold mb-8">{FeeSelectedItem==="setfees" ? 'Set': FeeSelectedItem==="editfees"? 'Edit': ''} Fee's</h1>
          </div>

          {loading ? (
              <div className="text-center">
                <CircularProgress size={40} thickness={4} />
                <p>Submitting...</p>
              </div>
            ) : success ? (
              <>
                <Alert severity="success"> Fees {FeeSelectedItem==="setfees" ? 'Set': FeeSelectedItem==="editfees"? 'Update': ''} Successfully</Alert>
                <div className='flex flex-row justify-end '>
                  <button
                    className="h-10 m-8  bg-blue-200 hover:bg-blue-400 text-white font-semibold px-12 rounded-full focus:outline-none"
                    onClick={backhandler}
                  >
                    Back To Fees
                  </button>
                </div>
              </>
            ) : (
            
            <>
              <div className="flex flex-col space-x-2 mb-6 ">
                <div className="overflow-x-auto">
                <div className='text-center'>
                  <label htmlFor="session" className='font-bold text-md mr-2'>Session: </label>
                  <select name="session" className='rounded p-1' value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="2022-23">2022-23</option>
                    <option value="2023-24">2023-24</option>
                  </select>
                </div>
                  <div className='p-8   rounded-lg w-fit'>
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2"></th>
                        {columns.map((column, columnIndex) => (
                          <th key={columnIndex} className="px-4 py-2">{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rowData.map((row, rowIndex) => {
                        if (row === 'Late Fee Separator') {
                          return (
                            <tr key={rowIndex}>
                              <td colSpan={columns.length + 1} className="bg-red-200"></td>
                            </tr>
                          );
                        } else if (row === 'Date 1' || row === 'Date 2' || row === 'Date 3' || row === 'Date 4') {
                          return (
                            <tr key={rowIndex}>
                              <td className="px-4 py-2">{row}</td>
                              {tableData.map((data, columnIndex) => (
                                <td key={columnIndex} className="px-4 py-2 w-8">
                                  <input
                                    type="date" // Set the input type to "date"
                                    value={data[row]}
                                    onChange={(e) => handleCellChange(e.target.value, columnIndex, row)}
                                  />
                                </td>
                              ))}
                            </tr>
                          );
                        } else {
                          return (
                            <tr key={rowIndex}>
                              <td className="px-4 py-2">{row}</td>
                              {tableData.map((data, columnIndex) => (
                                <td key={columnIndex} className="px-4 py-2">
                                  <input
                                    className='w-full'
                                    type="number"
                                    value={data[row]}
                                    onChange={(e) => handleCellChange(e.target.value, columnIndex, row)}
                                  />
                                </td>
                              ))}
                            </tr>
                          );
                        }
                      })}

                    </tbody>
                  </table>
                  </div>
                </div>
                {noteFee==1 && <p className='text-red-400 font-sm m-[20px]'>*Please fill all cells properly</p>}
                <div className=' grid justify-items-end mt-5'>
                  <button 
                    className="h-10 bg-blue-600 hover:bg-blue-800 text-white font-semibold px-6 rounded-full focus:outline-none" 
                    onClick={formSubmit}
                    disabled={!selectedSession}
                    type="submit" >{FeeSelectedItem==="setfees" ? 'Apply Settings': FeeSelectedItem==="editfees"? 'Update': ''}</button>
                </div>
              </div>
            </>
            )};
        </div>
      </div>
      )}
      {FeeSelectedItem === "feereceipt" && (
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
      )}



    </div>
    {showFeeConfirmation && <ConfirmationDialog handleConfirm={handleConfirm} open={showFeeConfirmation} onClose={handleCloseDialog}/>}
    </>
  )
}

export default Fees