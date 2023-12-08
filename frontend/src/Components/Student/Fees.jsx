import React, { useState } from 'react';
import { bgcolor2 } from "../Home/custom.js";

const Fees = () => {
    // const [feeData, setFeeData] = useState({
    //     panding_fee: '',
    //     adm_fee: '',
    //     late_fee: '',
    //     transportation_fee: '',
    //     academic_fee: '',
    //     total_fee: '',
    //     remaining_fee: '',
    // });
    const [feeData, setFeeData] = useState({
        panding_fee: '',
        adm_fee: '',
        late_fee: '',
        transportation_fee: '',
        academic_fee: '',
        total_fee: '',
        remaining_fee: '',
    });

    // Sample data for fee details
    const sampleFeeData = [
        {
            feeType: 'Pending Fee',
            amount: feeData.panding_fee,
            scholarship: 'N/A',
            paidAmount: 'Add functionality here',
            remainingAmount: 'Add functionality here',
        },
        {
            feeType: 'Admission Fee',
            amount: feeData.adm_fee,
            scholarship: 'N/A',
            paidAmount: 'Add functionality here',
            remainingAmount: 'Add functionality here',
        },
        // ... Other fee types
    ];

    return (
        <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
            {/* header */}
            <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
                <img className="w-9 h-9 mr-2" src={require("../../img/schoolfee.png")} alt="StudentLogo" />
                <h1 className="font-bold">Fees</h1>
            </div>

            <div className='main'>
                <div className="mt-5 p-4">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left">Fee Type</th>
                                <th className="text-left">Fee Amount</th>
                                <th className="text-left">Scholarship/Discount</th>
                                <th className="text-left">Paid Amount</th>
                                <th className="text-left">Remaining Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sampleFeeData.map((fee, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 p-2">{fee.feeType}</td>
                                    <td className="border border-gray-400 p-2">{fee.amount}</td>
                                    <td className="border border-gray-400 p-2">{fee.scholarship}</td>
                                    <td className="border border-gray-400 p-2">{fee.paidAmount}</td>
                                    <td className="border border-gray-400 p-2">{fee.remainingAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Fees;
