import React, {useState, useEffect} from 'react';
import {getReceiptNo,updateReceiptNo} from '../../controllers/loginRoutes.js';

const DigitalBahi = ({staffMemeber, digitalBahiChangeHandle, DigitalBahiHandleSubmit}) => {
  const [receiptNo, setReceiptNo] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [inputAmount, setInputAmount] = useState(0);
  const [iserror, setIsError] = useState(false)
  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString();
    setCurrentDate(formattedDate);
    getReceiptNo().then((resp) => {
      setReceiptNo(resp);
    })
  },[]);
  const handleInputAmount = (e)=>{
    setInputAmount(e.target.value)
  }
  const payhandle= ()=>{
    if(inputAmount > 0 && inputAmount<=staffMemeber.remaining_amount){
      setIsError(false);
      // staffMemeber.remaining_amount= staffMemeber.remaining_amount - inputAmount;
      digitalBahiChangeHandle(staffMemeber.remaining_amount - inputAmount)
      setInputAmount(0);
      updateReceiptNo().then((resp)=>{
        setReceiptNo(resp);
      })
    }
    else{
      setIsError(true);
    }
  }
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
        <label htmlFor="fullName" className=" mb-1 mr-4 block font-bold text-gray-600 ">Full Name:</label>
        <span>{staffMemeber.fullName}</span>
      </div>
      <div className="flex mb-4">
        <label htmlFor="fathername" className= " mb-1 mr-4 block font-bold text-gray-600">Father's Name:</label>
        <span>{staffMemeber.fatherName}</span>
      </div>
      <div className="flex mb-4">
        <label htmlFor="salary" className= " mb-1 mr-4 block font-bold text-gray-600">Salary:</label>
        <span>₹ {staffMemeber.total_salary}</span>
      </div>
      <div className="flex mb-4">
        <label htmlFor="reamining_amount" className= " mb-1 mr-4 block font-bold text-gray-600">Reamaining Amount:</label>
        <span>₹ {staffMemeber.remaining_amount}</span>
      </div>
      <div>
        <div className="mb-4 flex items-center">
          <label htmlFor="amount" className= " mb-1 mr-4 block font-bold text-gray-600">Amount to Pay:</label>
           <input
              type="number"
              name="amount"
              value={inputAmount}
              min="0"
              className="ml-4 rounded px-4 py-2"
              onChange={handleInputAmount}
              
            />
            <button className='ml-4 bg-green-300 p-2 rounded hover:bg-green-400' onClick={payhandle}>
              Pay Now
            </button>
        </div>
      </div>
        <div className='col-span-2 text-center'>
          <button
            type="submit"
            // disabled={!isFormValid}
            className="h-10 bg-green-600 hover:bg-green-800 text-white font-semibold px-12 rounded-full focus:outline-none" onClick={DigitalBahiHandleSubmit}
          >
            Submit
          </button>

        </div>
        {iserror && <p className='text-red-400 font-sm m-[20px]'>*Invalid Amount</p>}
    </div>
    </>
  )
}

export default DigitalBahi