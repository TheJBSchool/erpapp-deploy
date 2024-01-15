import React, {useState, useEffect, useRef} from 'react';
import {getReceiptNo, updateReceiptNo, paySalary} from '../../controllers/loginRoutes.js';
import { useReactToPrint } from 'react-to-print';
import PayrollReceipt from './PayrollReceipt.jsx';

const DigitalBahi = ({adminId,schoolName, session, month, staffMemeber, prData}) => {
  const receiptRef = useRef();
  const [receiptNo, setReceiptNo] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [inputAmount, setInputAmount] = useState(0);
  const [iserror, setIsError] = useState(false);
  const [showReceipt, setShowReceipt]= useState(false);
  const [receiptDataToShow, setReceiptDataToShow] = useState({});
  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString('en-GB');
    setCurrentDate(formattedDate);
  },[]);

  const handleInputAmount = (e)=>{
    const input =e.target.value;
    setInputAmount(input);
    if(input > 0 && input<=prData.remaining_amount){
      setIsError(false);
    }
    else{
      setIsError(true);
    }
  }

  const payhandle= ()=>{
    if(inputAmount > 0 && inputAmount<=prData.remaining_amount){
      setIsError(false);
      paySalary({staffId:staffMemeber._id, session, month, inputAmount: prData.remaining_amount- inputAmount}).then((resp)=>{
        if(resp.msg==="Success"){
          updateReceiptNo(adminId).then((res)=>{
            if(res){
              setReceiptNo(res);
              const receiptDataDigitalBahi = {schoolName, receiptNo:res, currentDate,session, month, name:staffMemeber.fullName, fatherName:staffMemeber.fatherName, salary: prData.deducted_salary.toFixed(2), remainingSalary:prData.remaining_amount, paymentAmount:inputAmount }
              setReceiptDataToShow(receiptDataDigitalBahi);
            }
          })

          prData.remaining_amount -= inputAmount; 
          setInputAmount(0);
          alert(`Payment of ${inputAmount} Successfully Done`);
          setShowReceipt(true);
        }
        else{
          console.log("paySalary",resp);
          setShowReceipt(false);
        }
      });
    }
    else{
      setIsError(true);
      setShowReceipt(false);
    }
  }

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });
  return (
    <>
    <div className="mt-4 shadow-md rounded-lg px-8 py-6  grid grid-cols-2 gap-6">
      <div className="flex mb-4">
        <label className="block mb-2 mr-3">Date: </label>
        <p>{currentDate}</p>
      </div>
      <div className="flex mb-4">
        <label className="block mb-2 mr-3">Receipt No: </label>
        <p>{receiptNo}</p>
      </div>
      <div className="flex mb-4">
        <label className="mb-1 mr-4 block font-bold text-gray-600 ">Session: </label>
        <p>{session}</p>
      </div>
      <div className="flex mb-4">
        <label className="mb-1 mr-4 block font-bold text-gray-600 ">Month: </label>
        <p>{month}</p>
      </div>
      <div className="flex mb-4">
        <label htmlFor="fullName" className=" mb-1 mr-4 block font-bold text-gray-600 ">Full Name:</label>
        <span>{staffMemeber.fullName}</span>
      </div>
      <div className="flex mb-4">
        <label htmlFor="fathername" className= " mb-1 mr-4 block font-bold text-gray-600">Father's Name:</label>
        <span>{staffMemeber.fatherName}</span>
      </div>
      <div className="flex mb-4">
        <label htmlFor="salary" className= " mb-1 mr-4 block font-bold text-gray-600">Salary:</label>
        <span>₹ {prData.deducted_salary.toFixed(2)}</span>
      </div>
      <div className="flex mb-4">
        <label htmlFor="reamining_amount" className= " mb-1 mr-4 block font-bold text-gray-600">Remaining Amount:</label>
        <span>₹ {prData.remaining_amount}</span>
      </div>
      <div>
        <div className="mb-4 flex items-center">
          <label htmlFor="amount" className= " mb-1 mr-4 block font-bold text-gray-600">Amount to Pay:</label>
           <input
              type="number"
              name="amount"
              value={inputAmount}
              min="0"
              max={prData.deducted_salary.toFixed(2)}
              className="ml-4 rounded px-4 py-2"
              onChange={handleInputAmount}
              
            />
            <button className='ml-4 bg-green-300 p-2 rounded hover:bg-green-400' onClick={payhandle}>
              Pay Now
            </button>
        </div>
      </div>
        {iserror && <p className='text-red-400 font-sm m-[20px]'>*Invalid Amount</p>}
        {showReceipt && (
          <div className='col-span-2 text-center'>
            <button
              onClick={handlePrint}
              className="h-10 bg-green-600 hover:bg-green-800 text-white font-semibold px-12 rounded-full focus:outline-none" 
            >
              Print Reciept
            </button>

            <div className='mt-4'>
              <PayrollReceipt payRollData={receiptDataToShow} ref={receiptRef} />
            </div>

          </div>
        )}
    </div>
    </>
  )
}

export default DigitalBahi