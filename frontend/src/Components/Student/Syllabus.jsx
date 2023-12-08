import React from 'react';
import { bgcolor2 } from "../Home/custom.js";

const Syllabus = () => {
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
        {/* header */}
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/schoolfee.png")} alt="StudentLogo" />
            <h1 className="font-bold ">Syllabus</h1>
        </div>

        <div className='main'>
            <div style={bgcolor2} className="border-2 mt-5 border-red-300 rounded-lg grid grid-cols-3 gap-12 p-10 ">
                <p>Syllabus</p>
            </div>
        </div>

    </div>
  )
}

export default Syllabus