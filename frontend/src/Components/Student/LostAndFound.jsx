import React, { useState, useEffect } from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { fetchRecentItems,student_claim_req } from '../../controllers/loginRoutes.js';
import bag from '../../img/bag.jpeg';

const LostAndFound = ({studentData}) => {
  const [recentItems, setRecentItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claimMessage, setClaimMessage] = useState('');
  const [claimingItem, setClaimingItem] = useState(0);

  useEffect(() => {
    fetchRecentItems().then((resp) => {
      setRecentItems(resp);
    });
  }, []);

  const showClaimModal = (item) => {
    setIsModalOpen(true);
    // Additional logic related to the selected item if needed
    setClaimingItem(item);
  };

  const hideClaimModal = () => {
    setIsModalOpen(false);
    setClaimMessage(''); // Clear the input field when closing the modal
  };

  const handleClaim = () => {
    // Add logic to handle the claim action
    // You can send the claim message and item details to the server, for example
    // console.log('Claim Message:', claimMessage);
    hideClaimModal();
    const claimReqData ={
        itemId: claimingItem._id, 
        claimBy:  {
          student: studentData,
          claimMessage: claimMessage, 
        }
    }
    // console.log("claimingItem",claimingItem);
    // console.log("claimReqData",claimReqData);
    student_claim_req(claimReqData).then(()=>{
      alert("Claimed Request sent Successfully!");
    })

  };
  const backgroundBlurStyle = {
    filter: isModalOpen ? 'blur(5px)' : 'none',
  };

  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
      {/* header */}
      <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
        <img className="w-9 h-9 mr-2 " src={require("../../img/schoolfee.png")} alt="StudentLogo" />
        <h1 className="font-bold">LostAndFound</h1>
      </div>
      <div style={{ ...bgcolor2, ...backgroundBlurStyle }} className="border-2 mt-5 border-red-300 rounded-lg p-8 overflow-y-auto">
        <div className="cursor-pointer flex flex-wrap">
          {recentItems.map((item, index) => (
            <div key={index} className="m-4 w-1/6">
              <div className="flex flex-col" onClick={() => showClaimModal(item)}>
                <img src={bag} alt="" className='w-full h-auto' />
                <p>{item.itemDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claim Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Claim Item: <strong>{claimingItem.itemDesc}</strong></h2>
            <img src={bag} alt="" className='w-full h-15' />
            <input
              type="text"
              placeholder="Enter your claim message"
              value={claimMessage}
              onChange={(e) => setClaimMessage(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button onClick={handleClaim} className="bg-green-500 text-white p-2 mr-2">Claim</button>
              <button onClick={hideClaimModal} className="bg-red-500 text-white p-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LostAndFound;
