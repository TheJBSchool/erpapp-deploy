import React,{useState, useEffect} from 'react';
import {bgcolor1,bgcolor2} from "../Home/custom.js";
import { useNavigate } from "react-router-dom";
import { schoolNameLogo } from '../../controllers/loginRoutes.js';
import jblogo from '../../img/logo_JB.png';

const Header = ({adminId}) => {
  const [settings, setSettings] = useState({shool_name: "JB School", school_logo:jblogo })
  const navigate = useNavigate();
  useEffect(()=>{
    schoolNameLogo(adminId).then((resp)=>{
      // console.log(resp);
      setSettings(resp);
    })
  },[])
  return (
    <div style={bgcolor2} className="border-2 border-red-300 flex justify-between w-full h-20 p-2 rounded-lg mb-4 "> 
        <div className="JBlogo flex  hover:cursor-pointer">
          <div className="ml-6 w-16 h-full">
            <img src={settings.school_logo || jblogo}  alt="" />
          </div>
          <h1 className="text-2xl font-bold flex items-center ml-4  ">{settings.school_name || "JB School"}</h1>
        </div> 

        {/* right part of header */}
        <div className="flex items-center justify-evenly w-48" >
          <img className="h-10 w-10  hover:cursor-pointer"  src={require('../../img/back.png')} alt="back"  />
          <img className="h-10 w-10  hover:cursor-pointer"  src={require('../../img/notification.png')} alt="notifications" />
        </div>
    </div>
  );
};

export default Header;
