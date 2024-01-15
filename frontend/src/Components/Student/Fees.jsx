import React , {useEffect, useState} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { getFeeDetails } from '../../controllers/loginRoutes.js';

const Fees = ({ FeesData,session,classs, adminId }) => {
    const [menu, setMenu] = useState('myFee');
    const [feeDetails, setFeeDetails] = useState();

    useEffect(()=>{
        const obj ={session:session,class:classs};
        getFeeDetails(obj,adminId).then((resp)=>{
            // console.log("getFeeDetails",resp[0])
            setFeeDetails(resp[0]);
        })
    },[])
    return (
        <div style={bgcolor2} className="border-2 border-2-red-300 rounded-lg p-10 h-full">
            <div className="border-2 border-red-300 rounded-lg text-center p-4 flex items-center">
                <img className="w-9 h-9 mr-2" src={require("../../img/schoolfee.png")} alt="StudentLogo" />
                <h1 className="font-bold">Fees</h1>
            </div>

            <div className='flex justify-end '>
                <select
                value={menu}
                onChange={(e)=>setMenu(e.target.value) }
                className="w-fit m-4 rounded-xl p-1 "
                >
                <option value="myFee">My Fee Tracking</option>
                <option value="classFee">Classwise Fee</option>
                </select>
            </div>

            <div className='main'>
                {menu==="myFee" && (
                    <div className="mt-5 p-4 overflow-x-auto">
                        <table className="w-full table-auto border-2 border-collapse border-black bg-white">
                            <thead>
                                <tr>
                                    <th className="text-center p-4 border-2 border-gray-300"></th>
                                    <th className="text-center p-4 border-2 border-gray-300">Adminssion Fee</th>
                                    <th className="text-center p-4 border-2 border-gray-300">Academic Fee</th>
                                    <th className="text-center p-4 border-2 border-gray-300">Fee Applied</th>
                                    <th className="text-center p-4 border-2 border-gray-300">Fee Paid</th>
                                    <th className="text-center p-4 border-2 border-gray-300">Late Fee</th>
                                    <th className="text-center p-4 border-2 border-gray-300">Late Fee Paid</th>
                                    {/* <th className="text-center p-4 border-2 border-gray-300">Pending Fee</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {FeesData && Object.keys(FeesData).map((quarter, index) => (
                                    <tr key={index} className={FeesData[quarter].isPaid ? 'bg-green-100' : 'bg-red-100'}>
                                        <td className="text-center p-4 border-2 border-gray-300 font-bold">{quarter}</td>
                                        <td className="text-center p-4 border-2 border-gray-300">{FeesData[quarter]?.adm_fee || '-'}</td>
                                        <td className="text-center p-4 border-2 border-gray-300">{FeesData[quarter].acdm_fee}</td>
                                        <td className="text-center p-4 border-2 border-gray-300">{FeesData[quarter].fee_applied?.toString()}</td>
                                        <td className={`text-center p-4 border-2 border-gray-300 ${FeesData[quarter].isPaid ? 'text-green-600' : 'text-red-600'}`}>
                                            {FeesData[quarter].isPaid.toString()}
                                        </td>
                                        <td className="text-center p-4 border-2 border-gray-300">{FeesData[quarter].late_fee}</td>
                                        <td className="text-center p-4 border-2 border-gray-300">{FeesData[quarter].late_fee_ispaid?.toString()}</td>
                                        {/* <td className="text-center p-4 border-2 border-gray-300">{FeesData[quarter].pending_fee}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {menu==="classFee" && (
                    <div className="border-2 border-blue-300 rounded-lg p-4">
                        <h1 className="text-xl font-bold mb-2">Fee Details</h1>
                        {feeDetails ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <table className="table-auto">
                                        <tbody>
                                            <tr>
                                                <td className="font-semibold">Class:</td>
                                                <td>{feeDetails.class}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Session:</td>
                                                <td>{feeDetails.session}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Academic Fee:</td>
                                                <td> ₹ {feeDetails.academic_fee}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Admission Fee:</td>
                                                <td> ₹ {feeDetails.adm_fee}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <table className="table-auto">
                                        <tbody>
                                            <tr>
                                                <td className="font-semibold">Late Fee:</td>
                                                <td>₹ {feeDetails.late_fee}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Late Fee Applied after :</td>
                                                <td>{feeDetails.late_fee_x} days</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Quater 1 Date:</td>
                                                <td>{new Date(feeDetails.date1).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Quater 2 Date:</td>
                                                <td>{new Date(feeDetails.date2).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Quater 3 Date:</td>
                                                <td>{new Date(feeDetails.date3).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Quater 4 Date:</td>
                                                <td>{new Date(feeDetails.date4).toLocaleString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ): (
                            <div>
                                <p className='font-bold p-2 text-red-500'>Fee is yet to set by Admin !!!</p>
                            </div>
                        )}
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default Fees;
