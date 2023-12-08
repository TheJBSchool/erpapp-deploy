import React, {useState, useEffect, useContext} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { LoadingContext } from '../../App.js';

const RequestValidation = () => {
  
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
      <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
        <img className="w-9 h-9 mr-2 " src={require("../../img/result-icon.png")} alt="StudentLogo" />
        <h1 className="font-bold ">Validation Request</h1>
      </div>
        
        <div style={bgcolor2} className="border-2 mt-2 border-red-300 rounded-lg flex flex-col p-5 justify-between ">
            <div>
            </div>
        </div>
        
    </div>
  )
}

export default RequestValidation