import React, { useState, useRef, useEffect} from 'react'
import { bgcolor2 } from "../Home/custom.js";
import ConfirmationDialog from './ConfirmationDialog.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { feeSet, updateFees, getStudent, getFeeDetails, UpdateStuFee, saveReceipt, updateReceiptNo, feeSetValidation, allFeeReq} from '../../controllers/loginRoutes.js';
import Receipt from './Receipt';
import { useReactToPrint } from 'react-to-print';

// feeArray -> for current student (which quarter fee paid and when)
// currFee -> Fee amount, deadlines for each quarter, other details for a current session and class
// quarterIcons -> each quarter fee paid or not (true/false) [1 based indexing]
// quarterDeadlines -> quarter's deadlines [1 based indexing]
const Fees = ({adminId, schoolName}) => {
  const receiptRef = useRef();
  const [paymentMsg, setpaymentMsg]= useState('');
  const [payOther, setPayOther] = useState(false); //state for other(transportation fee) pay btn 
  const [quarterSelectIndex, setQuarterSelectIndex] = useState();
  const [quarterIcons, setQuarterIcons] = useState([false, false, false, false, false]); // first false for Transportation
  const [isAccessible, setIsAccessible] = useState([false, false, false, false, false]); // first false for Transportation
  const [quarterDeadlines, setQuarterDeadlines] = useState([
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date()
  ]);
  // console.log(quarterDeadlines);
  const [searchStuDropdown, setSearchStuDropdown]= useState(false);
  const [stuSelected, setStuSelected]= useState();
  const [students, setStudents] = useState([]);
  const [filterStu,setFilterStu]= useState([]);

  const [fullName,setFullName] = useState('');
  const [rollno, setRollno]= useState('');
  const [fatherName, setFatherName]= useState('');
  const [payBtn, setPayBtn] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currFee, setCurrFee] = useState();
  // console.log("currFee",currFee)
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

  const [totalToBePaid, setTotalToBePaid] = useState(0);
   const [selectedFees, setSelectedFees] = useState({
    admissionFee: true,
    academicFee: false,
  });

  const [lateFeeInput, setLateFeeInput] = useState(0);
  const [receiptData, setReceiptData]= useState();
  const [feeSetSuccess, setFeeSetSuccess]= useState(false);
  const [allFeeRequest, seAllFeeRequest]= useState([]);

  useEffect(()=>{
    allFeeReq(adminId).then((resp)=>{
      // console.log("allFeeReq",resp)
      seAllFeeRequest(resp);
    })
  },[])

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString();
    setCurrentDate(formattedDate);
  },[]);

  useEffect(()=>{
    if(formData){
      getStudent({session: formData.session, section: formData.section, class: formData.studentClass},adminId).then((resp)=>{
        setStudents(resp.data);
        // console.log("students fee",resp.data)
      });

    }

  },[formData]);

  useEffect(() => {
    // Calculate total based on selected fees
    if(stuSelected){
      let total = 0;
      const feeDetails = stuSelected.feePayments["Quater"+quarterSelectIndex];
      if (selectedFees.admissionFee) {
        total += parseFloat(feeDetails?.adm_fee || 0);
      }
      if (selectedFees.academicFee) {
        total += parseFloat(feeDetails.acdm_fee);
      }
      if (lateFeeInput>0) {
        total += parseFloat(lateFeeInput);
      }

      setTotalToBePaid(total);
    }
  }, [selectedFees, quarterSelectIndex,lateFeeInput, stuSelected]);

  useEffect(()=>{
    if(stuSelected){

      let StuFeeObj = stuSelected.feePayments;

      let updatedQuarterIcons = [false, false, false, false, false];
      let accessible= [false, false, false, false, false];

      let onlyone=true;

      for (let quarter = 1; quarter <= 4; quarter++) {
          let currentQuarter = StuFeeObj[`Quater${quarter}`];

          // Check if all fees for the current quarter are zero
          if (currentQuarter.isPaid) {
              updatedQuarterIcons[quarter] = true; // Update the corresponding index
          }

          if( currentQuarter.fee_applied===true && currentQuarter.isPaid===false && onlyone){
              accessible[quarter]=true;
              onlyone=false;
          }
      }

      setQuarterIcons([...updatedQuarterIcons]);
      setIsAccessible(accessible);
    }
  },[stuSelected]);


  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setSelectedFees((prevSelectedFees) => ({
      ...prevSelectedFees,
      [name]: checked,
    }));
  };

  
  const [showReceipt, setShowReceipt] = useState(false);
  const initialData = [
    { class: 'Pre-Nursery', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date() , 'Date 4': new Date(), 'Late Fees after X days': "2"},
    { class: 'Nursery', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date() , 'Date 4': new Date(), 'Late Fees after X days': "2"},
    { class: 'LKG', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date() , 'Date 4': new Date(), 'Late Fees after X days': "2"},
    { class: 'UKG', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date() , 'Date 4': new Date(), 'Late Fees after X days': "2"},
    { class: '1', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date() , 'Date 4': new Date(), 'Late Fees after X days': "2"},
    { class: '2', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date(), 'Date 4': new Date(), 'Late Fees after X days': "2" },
    { class: '3', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date(), 'Date 4': new Date(), 'Late Fees after X days': "2" },
    { class: '4', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date(), 'Date 4': new Date(), 'Late Fees after X days': "2" },
    { class: '5', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date(), 'Date 4': new Date(), 'Late Fees after X days': "2" },
    { class: '6', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date(), 'Date 4': new Date(), 'Late Fees after X days': "2" },
    { class: '7', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date(), 'Date 4': new Date(), 'Late Fees after X days': "2" },
    { class: '8', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date(), 'Date 4': new Date(), 'Late Fees after X days': "2" },
    { class: '9', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date(), 'Date 4': new Date(), 'Late Fees after X days': "2" },
    { class: '10', 'Admission Fees': "5000", 'Academic Fees': "10000", 'Late Fees': "100", 'Date 1': new Date(), 'Date 2': new Date(), 'Date 3': new Date(), 'Date 4': new Date(), 'Late Fees after X days': "2" },
  ];


  const [FeeSelectedItem, SetFeeSelectedItem] = useState('');
  const [showFeeConfirmation, setShowFeeConfirmation] = useState(false);
  const [noteFee, setNoteFee] = useState(0);
  const [selectedSession, setSelectedSession] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [tableData, setTableData] = useState(initialData);
  const [feeSchemaData, setFeeSchemaData]= useState(); // have atleast one value in table then it will not show error
  const [feeSetStatus, setFeeSetStatus]= useState();
  
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
      session: selectedSession,
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
    // for(let i=0;i<feeSchemaData.length;i++)
    // {
    //   feeSet(feeSchemaData[i],adminId).then((resp)=>{
    //   })
    // }
    feeSetValidation("feeSet",feeSchemaData,adminId, selectedSession).then((resp)=>{
      // console.log("feeSetValidation",resp)
      if(resp.msg==="success"){
        alert(`Fee for session ${selectedSession} sent for Approval`);
        setTableData(initialData);
        setFeeSetSuccess(true);
        setInterval(()=>{
          setFeeSetSuccess(false);
        },5000)
      }
      else{
        alert(`Something went wrong. Unable to send Request`);
      }
    })
  };

  const formSubmit = () =>{
        // console.log(feeSchemaData);
        setShowFeeConfirmation(true);
  }
  const handleCloseDialog = () => {
    
    setShowFeeConfirmation(false);
  };

  const backhandler = (()=> {
    setSuccess(false);
    SetFeeSelectedItem("");
  });

// receipt part
  const [paymentAmount, setPaymentAmount] = useState(0);
  
  const handleInputChange = (event) => {
    const { name, value} = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const printReceipt = useReactToPrint({
    content: () => receiptRef.current,
  });


  const searchReceipt = () => {
    if (formData.session && formData.studentClass && fullName) {
      getFeeDetails({ session: formData.session, class: formData.studentClass },adminId).then((resp) => {
        // console.log("getFeeDetails",resp);
        setCurrFee(resp[0]);
        setPayBtn(true);
      })
    } 


  };
  

  const handlePaymentAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    if(amount <= totalToBePaid){
      setPaymentAmount(amount);
    }else if(amount){
      setPaymentAmount(0);
    }
  };

  // Function to process the payment and update the fees
  const handlePayment = (quaterNo) => {
    const isConfirm = window.confirm(`Are You Sure Want to Pay ${paymentAmount}`);
    if(isConfirm){
      const quater = "Quater"+quaterNo;
      

      const receipt_data = {
        underBy: adminId,
        schoolName: schoolName ,
        receiptNo: 0,
        session: stuSelected.session,
        studentId: stuSelected._id,
        studentClass: stuSelected.class,
        studentSection: stuSelected.section,
        studentRollNo: stuSelected.rollno,
        studentName: stuSelected.name,
        studentFatherName: stuSelected.father_name,
        quater: quater,
        total_acdm_fee: currFee.academic_fee/4,
        acdm_fee:stuSelected.feePayments[quater].acdm_fee,
        late_fee:lateFeeInput,
        totalToBePaid: stuSelected.feePayments[quater].acdm_fee + lateFeeInput,
        paymentAmount: paymentAmount,
        remainingAmount: stuSelected.feePayments[quater].acdm_fee + lateFeeInput-paymentAmount
      }

      if(stuSelected.feePayments[quater].adm_fee){
        receipt_data.total_adm_fee = currFee.adm_fee;
        receipt_data.adm_fee=stuSelected.feePayments[quater].adm_fee;

        const t= receipt_data.totalToBePaid;
        receipt_data.totalToBePaid = t+ stuSelected.feePayments[quater].adm_fee;

        const temp = receipt_data.remainingAmount;
        receipt_data.remainingAmount = temp + stuSelected.feePayments[quater].adm_fee;
      }

      const updatedFeeData = {
        adm_fee:stuSelected.feePayments[quater].adm_fee, 
        acdm_fee:stuSelected.feePayments[quater].acdm_fee,
        late_fee:lateFeeInput,
        late_fee_ispaid: stuSelected.feePayments[quater].late_fee_ispaid,
        isPaid: false
      };
      let money = paymentAmount;

      if (money <= 0) {
        // Handle the case where the payment amount is zero or negative
        // show an error message or take appropriate action
        return;
      }
      if (updatedFeeData.adm_fee > 0) {
        const admissionFeeDeducted = Math.min(updatedFeeData.adm_fee, money);
        updatedFeeData.adm_fee -= admissionFeeDeducted;
        money -= admissionFeeDeducted;
      }

      if (updatedFeeData.acdm_fee > 0 && selectedFees.academicFee) {
        const acadmicFeeDeducted = Math.min(updatedFeeData.acdm_fee, money);
        updatedFeeData.acdm_fee -= acadmicFeeDeducted;
        money -= acadmicFeeDeducted;
      }

      if (updatedFeeData.late_fee > 0) {
        const lateFeeDeducted = Math.min(updatedFeeData.late_fee, money);
        updatedFeeData.late_fee -= lateFeeDeducted;
        money -= lateFeeDeducted;
      }
      if(updatedFeeData.late_fee===0){
        updatedFeeData.late_fee_ispaid=true;
      }
      else{
        updatedFeeData.late_fee_ispaid=false;
      }

      if(updatedFeeData.acdm_fee===0 && updatedFeeData.late_fee===0){
        if(updatedFeeData.adm_fee && updatedFeeData.adm_fee !==0 ){
          updatedFeeData.isPaid = false;
        }
        else{
          updatedFeeData.isPaid = true;
        }
      }

      //Update to Database
      UpdateStuFee(stuSelected._id,quater, updatedFeeData).then((resp)=>{
        // console.log("UpdateStuFee Success");
        // console.log("resp",resp);
        setpaymentMsg(resp.message);
        setInterval(()=>{
          setpaymentMsg('');
        },5000);
        setStuSelected(resp.student)
        if(resp.student){
          setLateFeeInput(resp.student.feePayments[quater].late_fee);
        }
        setPaymentAmount(0);

        updateReceiptNo(adminId).then((res)=>{
          receipt_data.receiptNo= res;
          // console.log("updateReceiptNo",res)
          setReceiptData(receipt_data);
          saveReceipt(receipt_data).then((r)=>{
            // console.log("respsaveReceipt",r);
          });
        })

      });
    }
  };

  const clickHandle = (e)=>{
    setStuSelected(e);
    setFullName(e.name);
    setSearchStuDropdown(false);
    if(quarterSelectIndex>0){
      const quater= "Quater"+quarterSelectIndex;
      setLateFeeInput(e.feePayments[quater].late_fee);
    }
  }

  
  const handleFullNameChange = (e)=>{
    const name= e.target.value;
    setFullName(name);
    setSearchStuDropdown(true);

    let filteredStudents = students.filter((item) => item.name.toLowerCase().includes(name));
    setFilterStu(filteredStudents);
  }

  const quarterSelectHandle = (e,index)=>{
    e.preventDefault();
    if(quarterIcons[index+1]===false){
      setQuarterSelectIndex(index+1)
    }
    setSelectedFees({
      admissionFee: true,
      academicFee: false,
    });
    const no =index+1;
    const quater= "Quater"+no;
    setLateFeeInput(stuSelected?.feePayments[quater]?.late_fee);
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
            <p className="font-bold text-sm">Fees's Status</p>
          </div>

          <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => SetFeeSelectedItem('feereceipt')}>
            <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/feereceipt.png')} />
            <p className="font-bold text-sm">Receipt</p>
          </div>
        </div>
      </div>
      )}


      {(FeeSelectedItem === "setfees" )  && (
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
                              {row==="Admission Fees" ? (<td className="px-4 py-2"> {row}<span className='text-[10px]'> (one time)</span></td>): row==="Academic Fees"? (<td className="px-4 py-2">{row} <span className='text-[10px]'>(anually)</span></td>): (<td className="px-4 py-2">{row}</td>) }
                              {tableData.map((data, columnIndex) => (
                                <td key={columnIndex} className="px-4 py-2">
                                  <input
                                    className='w-full'
                                    type="number"
                                    value={data[row] || ''}
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

                {feeSetSuccess && (
                  <div className='mt-2 mb-2'>
                    <Alert severity="success">Fee Set Approval sent to Super Admin</Alert>
                  </div>
                )}
              </div>
            </>
            )}
        </div>
      </div>
      )}
      {FeeSelectedItem === "editfees" && (
        <div style={bgcolor2} className="border-2 mt-5 border-red-300 rounded-lg p-9 ">
          <div className='flex '>
            <img className="h-8 w-8 mb-4 mr-2" alt="Timetable" src={require('../../img/setfees.png')} />
            <h1 className="font-bold mb-8">Fee's Status</h1>
          </div>
          <div className='shadow-md'>
            {allFeeRequest.length>0 && allFeeRequest.map((item,ind)=>{
              return <div key={ind} className=' bg-slate-100 border-2 rounded-lg m-2 p-4  grid grid-cols-4 '>
                
                <p className='font-bold'>Session : <strong className='ml-2 text-zinc-600'>{item.session} </strong></p>
                <p className='font-bold col-span-2'>Date Created : <strong className='ml-2 text-zinc-600'>{new Date(item.date_created).toLocaleDateString('en-GB')} </strong></p>
                <p className='font-bold'>Status : <strong className={`ml-2 font-bold ${item.status==="Approved"? "text-green-600" : item.status==="Declined"?"text-red-600":"text-yellow-500" }`}>{item.status} </strong></p>
                
                  <div className='col-span-4'> 

                    <div className=' overflow-x-auto'>
                      <table className="border-collapse border border-gray-600 w-full mt-4">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border border-gray-600 px-4 py-2">Session</th>
                            {item.data.map((fee, index) => (
                              <th key={index} className="border border-gray-600 px-4 py-2">{fee.class}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Admission Fee</td>
                            {item.data.map((fee, index) => (
                              <td key={index} className="border border-gray-600 px-4 py-2">{fee.adm_fee}</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Academic Fee</td>
                            {item.data.map((fee, index) => (
                              <td key={index} className="border border-gray-600 px-4 py-2">{fee.academic_fee}</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Late Fee</td>
                            {item.data.map((fee, index) => (
                              <td key={index} className="border border-gray-600 px-4 py-2">{fee.late_fee}</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Late Fee <span className='text-[12px]'>(applied After x Days)</span></td>
                            {item.data.map((fee, index) => (
                              <td key={index} className="border border-gray-600 px-4 py-2">{fee.late_fee_x}</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Dates</td>
                            {item.data.map((fee, index) => (
                              <td key={index} className="border border-gray-600 px-4 py-2">
                                <ul className="list-disc list-inside text-[15px]">
                                  <li className='flex'>{new Date(fee.date1).toLocaleDateString('en-GB')}</li>
                                  <li className='flex'>{new Date(fee.date2).toLocaleDateString('en-GB')}</li>
                                  <li className='flex'>{new Date(fee.date3).toLocaleDateString('en-GB')}</li>
                                  <li className='flex'>{new Date(fee.date4).toLocaleDateString('en-GB')}</li>
                                  {/* Add more dates if available */}
                                </ul>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
              </div>
            })}
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
                      value={stuSelected?.rollno || ''}
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
                      value={stuSelected?.father_name || ''}
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
                        <button onClick={(e)=>quarterSelectHandle(e,ind)} className={`px-4 py-2 ${val?'bg-green-600' : 'bg-red-600'}  text-white rounded-full mr-4 ${(quarterSelectIndex===ind+1 && val===false) ?'bg-red-700 ' : ''}` } key={ind}>Quarter {ind + 1}</button>
                      ))}
                      <button onClick={(e)=>quarterSelectHandle(e,-1)} className={`px-4 p bg-red-600 text-white rounded-full mr-4 ${quarterSelectIndex===0 ?'bg-red-700' : ''}` } >Transportation Fee</button>
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

                    {quarterSelectIndex>0 && stuSelected.feePayments["Quater"+quarterSelectIndex].isPaid===false && (
                    <div>

                    {(stuSelected.feePayments["Quater"+quarterSelectIndex].fee_applied)  ? ( 
                      <div>
                      {isAccessible[quarterSelectIndex] ? (
                        <div>

                          {quarterSelectIndex!==0  && (<h1>Quarter {quarterSelectIndex} Fee's Type :-</h1>)}
                          <h1>{stuSelected.feePayments["Quater"+quarterSelectIndex].ispaid}</h1>
                          <div className="flex flex-col justify-center items-center font-semibold">
                            
                            <div className='flex'>
                              <div className="flex flex-col items-end mr-10">
                                {stuSelected.feePayments["Quater"+quarterSelectIndex].adm_fee>0 && ( 
                                  <label htmlFor='admissionfee' className=" mb-2">Admission Fee: </label>
                                )}
                                <label htmlFor='annualfee' className=" mb-2">Academic Fee:</label>
                                <label htmlFor='latefee' className=" mb-2">Late Fee:</label>
                              </div>

                              <div className="flex flex-col">
                                
                                {stuSelected.feePayments["Quater"+quarterSelectIndex].adm_fee>0 && ( 

                                  <div className='mb-2'>  
                                    <input
                                      checked={stuSelected.feePayments["Quater"+quarterSelectIndex]?.adm_fee >0}
                                      className='mr-2'
                                      type="checkbox"
                                      name="admissionFee"
                                      readOnly
                                    />
                                    <span>{stuSelected.feePayments["Quater"+quarterSelectIndex]?.adm_fee}</span>
                                    <span className='text-green-600'>{stuSelected.feePayments["Quater"+quarterSelectIndex].adm_fee>0 ? "":" Paid" }</span>
                                  </div>
                                )}
                                <div className='mb-2'>
                                  <input
                                      checked={selectedFees.academicFee}
                                      className='mr-2'
                                      type="checkbox"
                                      name="academicFee"
                                      onChange={handleCheckboxChange}
                                    />
                                  <span >{stuSelected.feePayments["Quater"+quarterSelectIndex].acdm_fee}</span>
                                </div>
                                <div className='mb-2'>
                                  <input type="number" className='px-2 py-1 outline-none' min={0} value={lateFeeInput} onChange={(e)=> setLateFeeInput(e.target.value)} />
                                </div>
                                

                                
                                
                                
                              </div>
                            </div>
                            
                            
                            <div className="flex">
                              <label className="block mb-2 mt-5 mr-8">Total to be Paid:</label>
                              <input className='mb-2 mt-5 p-1 rounded-md px-2 bg-yellow-50 outline-none' value={totalToBePaid} readOnly    />
                            </div>
                          </div>

                          <div className='mt-4'>
                            <div className="flex mb-4">
                              <label className="block mb-2">Payment Amount:</label>
                              <input
                                type="number"
                                name="paymentAmount"
                                value={paymentAmount}
                                min={0}
                                max={parseInt(totalToBePaid)}
                                onChange={handlePaymentAmountChange}
                                className="px-4 ml-4  border rounded-lg focus:outline-none "
                              />
                              <button
                                type="button"
                                onClick={()=>handlePayment(quarterSelectIndex)}
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
                              <span className='mb-2 text-red-500'>{totalToBePaid-paymentAmount}</span>
                            </div>
                          </div>

                          { paymentMsg && (
                            <div className='mt-2 mb-2'>
                              <Alert severity="success">{paymentMsg}</Alert>
                            </div>
                          )}

                        
                        <div className="flex justify-end mt-4">
                          <a
                            onClick={printReceipt}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2"
                          >
                            Print Receipt
                          </a>

                          {/* <button
                            onClick={createManualReceipt}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                          >
                            Create Manual Receipt
                          </button> */}
                        </div>
                        {receiptData && (
                          <Receipt receiptData={receiptData} ref={receiptRef} />
                        )}
                        </div>
                      ) :(
                        <div>
                          <p className='text-red-600 font-extrabold'>First pay the Quater{quarterSelectIndex-1} Fees.</p>
                        </div>
                      )}
                  </div>
                  ) : <div>
                        <span className='text-red-400 font-extrabold mb-8'>{stuSelected.feePayments["Quater"+quarterSelectIndex].fee_applied ? "": "Fee Not Applied"}</span>
                      </div>
                   }
                  </div>
                  )}
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

export default Fees;


