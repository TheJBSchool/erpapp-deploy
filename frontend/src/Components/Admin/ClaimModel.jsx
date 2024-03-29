// ClaimModal.js

import React from 'react';

const ClaimModal = ({ showModal, closeModal, claimData, onApprove, onDecline }) => {
  const modalClasses = showModal
    ? 'modal absolute inset-0 flex items-center justify-center'
    : 'modal hidden';

  return (
    <div className={modalClasses}>
      <div className=""></div>

      {claimData && ( // Check if claimData is not null or undefined
        <div className="modal-content bg-white w-full md:w-1/2 lg:w-1/3 p-4 mx-4 my-8 rounded-lg shadow-lg">
          <button className="modal-close " onClick={closeModal}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <img width="200px" height="200px" src={claimData.itemUrl} alt="Claim" className="w-full" />

          <p className="mt-4"><strong>Description:</strong> {claimData.itemDesc}</p>
          <p><strong>Claim by:</strong> {claimData.claimBy.name} <strong>s/o </strong>{claimData.claimBy.father_name}</p>

          <div>
            <p><strong>Class:</strong> {claimData.claimBy.class} <strong>Section:</strong> {claimData.claimBy.section}</p>
            <p><strong>Roll No:</strong> {claimData.claimBy.rollno}</p>
          </div>
          
          <div className='flex justify-around'> 
            <button
              onClick={() => onApprove(claimData)}
              className="mt-4 bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded  focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer"
            >
              Accept Claim
            </button>
            <button
              onClick={() => onDecline(claimData)}
              className="mt-4 bg-red-500 hover:bg-red-800 text-white py-2 px-4 rounded  focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer"
            >
              Reject Claim
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ClaimModal;
