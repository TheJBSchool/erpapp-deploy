import React, {useState, useEffect, useContext} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { LoadingContext } from '../../App.js';
import { getFeeApprovalReq, all_admins, feeSet, feeDeclined, feeApproved} from '../../controllers/loginRoutes.js';

const RequestValidation = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [feesRequests, setFeesRequests] = useState([]);
  const [selectedFees, setSelectedFees] = useState(null);
  const [FeesInd, setFeesInd] = useState(-1);
  const [allAdmins, setAllAdmins] = useState();

  useEffect(()=>{
    getFeeApprovalReq().then((resp)=>{
      console.log("feerewq: ",resp)
      setFeesRequests(resp);
    })

    all_admins().then((resp)=>{
      let adminsArray = resp.all_admins;
      let sortedAdmin = adminsArray.filter((item)=>item.name!="SuperAdmin")
      // setAllAdmins(sortedAdmin);
      // console.log("admins",sortedAdmin)


      const adminMap = new Map();
      sortedAdmin.forEach(admin => {
        adminMap.set(admin._id, admin);
      });
      setAllAdmins(adminMap);
      
    })
  },[])

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleViewFees = (feeData, id)=>{
    setSelectedFees(feeData);
    setFeesInd(id);
  }

  const approveFees = (feeReqId, feesData,adminId, adminName)=>{
    if(feesData){
      const isConfirm = window.confirm(`Are you sure!!! This Fee Data will be updated to all Students corresponding to Admin- ${adminName} `);
      if(isConfirm){
        for(let i=0;i<feesData.length;i++)
        {
          feeSet(feesData[i],adminId).then((resp)=>{
          })
        }
        feeApproved(feeReqId).then((resp)=>{
          // console.log("feeApproved",resp);
          setFeesRequests(resp);
        })
      }
    }


  }
  const declineFees = (feeReqId)=>{
      const isConfirm = window.confirm(`Are you sure to reject this Fee!!!`);
      if(isConfirm){
        
        feeDeclined(feeReqId).then((resp)=>{
          // console.log("feeDeclined",resp);
          setFeesRequests(resp);
        })
      }
  }
  
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
      <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
        <img className="w-9 h-9 mr-2 " src={require("../../img/result-icon.png")} alt="StudentLogo" />
        <h1 className="font-bold ">Validation Request</h1>
      </div>
        
        <div style={bgcolor2} className="border-2 mt-2 border-red-300 rounded-lg flex flex-col p-5 justify-between ">
            <div className="shadow-md p-4 mt-2">
              <div className='flex space-x-8'>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Fee"
                      checked={selectedOption === 'Fee'}
                      onChange={handleOptionChange}
                    />
                    Fee Approvals
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="unlockFee"
                      checked={selectedOption === 'unlockFee'}
                      onChange={handleOptionChange}
                    />
                    Unlock Fee Request
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="none"
                      checked={selectedOption === 'none'}
                      onChange={handleOptionChange}
                    />
                    None
                  </label>
                </div>
              </div>
            </div>
            {selectedOption === 'Fee' && (
              <div>
                {allAdmins && feesRequests.length>0 && feesRequests.map((item,ind)=>{
                  return <div key={ind} className=' bg-slate-100 border-2 rounded-lg m-2 p-4  grid grid-cols-4 '>
                    <p className='font-bold'>Admin : <strong className='ml-2 text-zinc-600'>{allAdmins.get(item.adminId).name} </strong></p>
                    <p className='font-bold'>School : <strong className='ml-2 text-zinc-600'>{allAdmins.get(item.adminId).school_name} </strong></p>
                    <p className='font-bold'>Principal : <strong className='ml-2 text-zinc-600'>{allAdmins.get(item.adminId).principal_name} </strong></p>
                    <div className="ml-6 w-10 h-full ">
                      <img src={allAdmins.get(item.adminId).school_logo}  alt="" />
                    </div>
                    <p className='font-bold'>Session : <strong className='ml-2 text-zinc-600'>{item.session} </strong></p>
                    <p className='font-bold'>Contact : <strong className='ml-2 text-zinc-600'>{allAdmins.get(item.adminId).contact} </strong></p>
                    <div className='flex col-span-4 justify-end'>
                      <button className='px-2 rounded-lg bg-sky-200 hover:bg-sky-300 text-sm' onClick={() => handleViewFees(item.data,ind)}>View Fees</button>
                    </div>
                    {selectedFees && FeesInd === ind && (
                      <div className='col-span-4'> 

                        <div className=' overflow-x-auto'>
                          <table className="border-collapse border border-gray-600 w-full mt-4">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-600 px-4 py-2">Session</th>
                                {selectedFees.map((fee, index) => (
                                  <th key={index} className="border border-gray-600 px-4 py-2">{fee.class}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              
                              <tr>
                                <td className="border border-gray-600 px-4 py-2">Admission Fee</td>
                                {selectedFees.map((fee, index) => (
                                  <td key={index} className="border border-gray-600 px-4 py-2">{fee.adm_fee}</td>
                                ))}
                              </tr>
                              <tr>
                                <td className="border border-gray-600 px-4 py-2">Academic Fee</td>
                                {selectedFees.map((fee, index) => (
                                  <td key={index} className="border border-gray-600 px-4 py-2">{fee.academic_fee}</td>
                                ))}
                              </tr>
                              <tr>
                                <td className="border border-gray-600 px-4 py-2">Late Fee</td>
                                {selectedFees.map((fee, index) => (
                                  <td key={index} className="border border-gray-600 px-4 py-2">{fee.late_fee}</td>
                                ))}
                              </tr>
                              <tr>
                                <td className="border border-gray-600 px-4 py-2">Late Fee (X)</td>
                                {selectedFees.map((fee, index) => (
                                  <td key={index} className="border border-gray-600 px-4 py-2">{fee.late_fee_x}</td>
                                ))}
                              </tr>
                              <tr>
                                <td className="border border-gray-600 px-4 py-2">Dates</td>
                                {selectedFees.map((fee, index) => (
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

                        <div className='mt-2 col-span-3 flex justify-end'>
                          <button className='px-2 py-1 bg-red-400 hover:bg-red-500 rounded-lg mr-4' onClick={()=>declineFees(item._id)}>Decline</button>
                          <button className='px-2 py-1 bg-green-400 hover:bg-green-500 rounded-lg' onClick={()=>approveFees(item._id,item.data,item.adminId,allAdmins.get(item.adminId).name)}>Approve</button>
                        </div>

                      </div>
                    )}
                  </div>
                })}
              </div>
            )}
        </div>
        
    </div>
  )
}

export default RequestValidation