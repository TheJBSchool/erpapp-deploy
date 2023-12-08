import React, {useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../common/Header";
import SuperAdminLeftPanel from "./SuperAdminLeftPanel";
import { bgcolor2 } from "../Home/custom.js";
import ManageAdmins from "./ManageAdmins.jsx";
import RequestValidation from "./RequestValidation.jsx";
import ManageSchool from "./ManageSchool.jsx";

export const SuperAdminContext = createContext();

const SuperAdminDashboard = () => {
  const [superAdminData, setSuperAdminData] = useState({});
  useEffect(()=>{
    setSuperAdminData(JSON.parse(localStorage.getItem("data")));
  },[])

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  }

  const [selectedItem, setSelectedItem] = useState('dashboard');

  useEffect(() => {
    if (localStorage.getItem("token")) { }  
    else navigate('/');
  }, [])


  return (
    <SuperAdminContext.Provider value={{ selectedItem, setSelectedItem }}>
    <div className="flex flex-col h-full pt-4 px-12">
      {/* Header */}
      <Header  />

      {/* main */}
      <div className="h-full w-full flex p-5 justify-between gap-7">
        <SuperAdminLeftPanel superAdminData={superAdminData}/>
        <div className="flex flex-col w-10/12 h-full ">
          {selectedItem === "dashboard" && (
              <div style={bgcolor2} className="border-2  border-red-300 rounded-lg  p-10 ">All Notifications</div>
          )}
          {selectedItem === "manageAdmins" && <ManageAdmins />}
          {selectedItem === "requestValidation" && <RequestValidation/>}
          {selectedItem === "manageSchool" && <ManageSchool/>}
        </div>
      </div>

    </div>
    </SuperAdminContext.Provider>
  );
};
export default SuperAdminDashboard;
