import React from 'react';

const Receipt = ({ receiptData, refer }) => {
  return (
    <div ref={refer} className="w-96 bg-white p-6 rounded-md border border-gray-300">
      <h2 className="text-lg font-bold mb-4">Receipt</h2>
      <div className="flex justify-between mb-2">
        <span>Date:</span>
        {/* <span>{receiptData.date}</span> */}
      </div>
      <div className="flex justify-between mb-2">
        <span>Full Name:</span>
        <span>{receiptData.fullName}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Father's Name:</span>
        <span>{receiptData.fatherName}</span>
      </div>
      <hr className="my-2 border-b border-gray-400" />
      <div className="mb-2">
        <span>Class:</span>
        <span>{receiptData.studentClass}</span>
      </div>
      <div className="mb-2">
        <span>Section:</span>
        <span>{receiptData.section}</span>
      </div>
      <hr className="my-2 border-b border-gray-400" />
      <div className="mb-2">
        <span>Pending Fee:</span>
        <span>{receiptData.pandingFee}</span>
      </div>
      <div className="mb-2">
        <span>Admission Fee:</span>
        <span>{receiptData.admissionFee}</span>
      </div>
      <div className="mb-2">
        <span>Annual Fee:</span>
        <span>{receiptData.annualFee}</span>
      </div>
      <div className="mb-2">
        <span>Transportation Fee:</span>
        <span>{receiptData.transportationFee}</span>
      </div>
      <div className="mb-2">
        <span>Late Fee:</span>
        <span>{receiptData.lateFee}</span>
      </div>
      <hr className="my-2 border-b border-gray-400" />
      <div className="flex justify-between">
        <span>Total to be Paid:</span>
        <span>{receiptData.totalToBePaid}</span>
      </div>
      <div className="flex justify-between my-2">
        <span>Fee's Paid:</span>
        <span>{receiptData.paymentAmount}</span>
      </div>
      <div className="flex justify-between">
        <span>Remaining Fee's:</span>
        <span>{receiptData.remainingFees}</span>
      </div>
    </div>
  );
};

export default Receipt;
