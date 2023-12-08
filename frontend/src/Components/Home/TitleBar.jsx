import React from 'react';
import JB_Logo from "../../img/logo_JB.png";
import {bgcolor1,bgcolor2} from "./custom.js";

const TitleBar = () => {
  return (
    <div  style={bgcolor2} className=" border-2 border-red-300 rounded-lg p-4 flex items-center justify-between m-2">
      <div className="flex items-center">
        <img src={JB_Logo} alt="Company Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-black font-semibold text-lg">JB School</h1>
      </div>
      <div className="flex items-center space-x-4 ">

      </div>
    </div>
  );
};

export default TitleBar;
