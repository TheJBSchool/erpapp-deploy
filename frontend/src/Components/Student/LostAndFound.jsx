import React, { useState, useEffect } from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { fetchRecentItems,claimItem } from '../../controllers/loginRoutes.js';
import bag from '../../img/bag.jpeg';

const base = process.env.REACT_APP_BASE;

const LostAndFound = ({studentData}) => {
  const [recentItems, setRecentItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claimMessage, setClaimMessage] = useState('');
  const [claimingItem, setClaimingItem] = useState(0);

  const [stuClaimingItem, setStuClaimingItem]= useState();

  useEffect(() => {
    fetchRecentItems(studentData.underBy).then((resp) => {
      console.log("fetchhh",resp)
      setRecentItems(resp);

      if(resp){
        //iterate each item of resp array and map the item._id with boolean value if studentId found in item.claim array
        const itemsMap = resp.reduce((acc, item) => {
          const studentClaim = item.claimBy.find((claim) => claim.studentId === studentData._id);
          acc[item._id] = studentClaim ? studentClaim.status : "Not Claimed";
          return acc;
        }, {});
        setStuClaimingItem(itemsMap);

      }
    });
  }, []);

  console.log("stuClaimingItem",stuClaimingItem)

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
    hideClaimModal();
    const claimReqData ={
      studentId: studentData._id,
      claimMessage: claimMessage,
      status: "Sent" 
    }
    claimItem(claimingItem._id, claimReqData).then(()=>{
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
            <div key={index} className=" shadow-md m-4 w-1/6">
              <div className="flex flex-col text-center" onClick={() => showClaimModal(item)}>
                {stuClaimingItem && (
                  <p className='bg-white border py-2'>{stuClaimingItem[item._id]}</p>
                )}
                <img src={base + '/'+ item.imageUrl} alt="" className='w-full h-auto' />
                <p className='mt-1 font-semibold'>{item.itemDesc}</p>
                <div className='flex text-sm justify-center p-2'>
                  <p className='mr-2'>{new Date(item.date_created).toLocaleDateString('en-GB') }</p>
                  <p>{new Date(item.date_created).getHours() }</p>
                  <p>:</p>
                  <p>{new Date(item.date_created).getMinutes() }</p>

                </div>
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
            <img width="200" height="200" src={base + '/'+ claimingItem.imageUrl} alt="" className='my-0 mx-auto p-2' />
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
