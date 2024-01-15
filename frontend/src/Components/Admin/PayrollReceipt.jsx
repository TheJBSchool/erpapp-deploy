import React from 'react';

const PayrollReceipt = React.forwardRef(({ payRollData }, ref) => {
  const {
    schoolName,
    receiptNo,
    currentDate,
    session,
    month,
    name,
    fatherName,
    salary,
    remainingSalary,
    paymentAmount,
  } = payRollData;

  return (
    <div  ref={ref} className="mx-auto max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 font-serif ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">{schoolName} School</h1>
        <div className='flex justify-between'>
          <p>Date: {currentDate}</p>
          <p>Receipt No: {receiptNo}</p>
        </div>
        <hr className='my-2'/>
        <h1 className='font-bold text-red-600'>Payroll Receipt</h1>

        <div className='text-sm text-slate-500 mb-2'>
            <p className='text-end'>Session: {session}</p>
            <p className='text-end'>Month: {month}</p>
        </div>


        <div className="flex justify-start">
          <div>
            <p>Employee's Name: </p>
            <p>Father's Name: </p>
          </div>
          <div className=' font-semibold text-slate-600'>
            <p> {' '+name}</p>
            <p> {fatherName}</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Salary Details</h2>
        <div className='flex justify-between'>
          <p>Total Salary (Monthly):</p>
          <p>₹ {salary}</p>
        </div>
        <hr className='mt-2 mb-4'/>
        <div className='flex justify-between'>
          <p>Remaining Salary To Be Paid:</p>
          <p>₹ {remainingSalary}</p>
        </div>
        <div className='flex justify-between'>
          <p>Payment Amount:</p>
          <p>- ₹ {paymentAmount}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Remaining:</p>
          <p>₹ {remainingSalary-paymentAmount}</p>
        </div>
      </div>
      <div className='flex flex-col items-end mb-10 mt-4'>
        <p className="mt-4">Signature</p>
        <p>{schoolName}</p>
      </div>
    </div>
  );
});

export default PayrollReceipt;
