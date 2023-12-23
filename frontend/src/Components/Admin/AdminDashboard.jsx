import React, {useEffect, useState, createContext, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { bgcolor2 } from "../Home/custom.js";
import Attendance from "./Attendance.jsx";
import Circular from "./Circular.jsx";
import Exam from "./Exam.jsx";
import Fees from "./Fees.jsx";
import InventoryManagement from "./InventoryManagement.jsx";
import ManageStudents from "./ManageStudents.jsx";
import ManageTeachers from "./ManageTeachers.jsx";
import MyProfile from "./MyProfile.jsx";
import Payroll from "./Payroll.jsx";
import Syllabus from "./Syllabus.jsx";
import TimeTable from "./TimeTable.jsx";
import Communication from "./Communication.jsx";



import Header from "../common/Header";
import AdminLeftPanel from "../common/AdminLeftPanel";
import Notification from "../common/Notification";
import LostAndFound from "./LostAndFound.jsx";
import RequestValidation from "./RequestValidation.jsx";


export const AdminContext = createContext();


const AdminDashboard = () => {
  const [adminData, setadminData] = useState({});
  useEffect(()=>{
    setadminData(JSON.parse(localStorage.getItem("data")));
  },[])

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  }

  const [selectedItem, setSelectedItem] = useState('dashboard');
  const notifications = [
    { title: "Urgent meeting", date_started: '10/11/2023'},
    { title: "Urgent meeting", date_started: '10/11/2023'},
    { title: "Urgent meeting", date_started: '10/11/2023'},
    { title: "Urgent meeting", date_started: '10/11/2023'},
    { title: "Urgent meeting", date_started: '10/11/2023'},
    { title: "Urgent meeting", date_started: '10/11/2023'},
    { title: "Urgent meeting", date_started: '10/11/2023'},
    { title: "Urgent meeting", date_started: '10/11/2023'},
    { title: "Urgent meeting", date_started: '10/11/2023'},
    { title: "Urgent meeting", date_started: '10/11/2023'},
  ];

  const [showAllNotifications, setShowAllNotifications] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) { }  
    else navigate('/');
  }, [])


  return (
    <AdminContext.Provider value={{ selectedItem, setSelectedItem }}>
    <div className="flex flex-col h-full pt-4 px-12">
      {/* Header */}
      {adminData._id && <Header adminId={adminData._id} />}

      {/* main */}
      <div className="h-full w-full flex p-5 justify-between gap-7">
        {/* leftSidePanel */}
        <AdminLeftPanel adminData={adminData}/>
        {/* RightSidePanel */}
        <div className="flex flex-col w-10/12 h-full ">
          {/* items */}
          {selectedItem === "dashboard" && (
            <div style={bgcolor2} className="border-2  border-red-300 rounded-lg grid grid-cols-3 gap-12 p-10 ">

              <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('timeTable')}>
                <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/timetable.png')} />
                <p className="font-bold text-sm">Time Table</p>
              </div>

              <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('circular')}>
                <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/circular.png')} />
                <p className="font-bold text-sm">Circular</p>
              </div>

              <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('exam')}>
                <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/exam.png')} />
                <p className="font-bold text-sm">exam</p>
              </div>

              <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('inventoryManagement')}>
                <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/inventory.png')} />
                <p className="font-bold text-sm text-center">Inventory<br />Management</p>
              </div>

              <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('manageStudents')}>
                <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/student.png')} />
                <p className="font-bold text-sm text-center">Manage <br />Students</p>
              </div>
              {/* <div className= {`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => navigate('/admin/manageStudents')}>
                  <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../img/student.png')} />
                  <p className="font-bold text-sm text-center">Manage <br/>Students</p>
                </div> */}

              <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('manageTeachers')}>
                <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/teacher.png')} />
                <p className="font-bold text-sm text-center">Manage <br />Teachers</p>
              </div>

            </div>
          )}

          {/* Make them router */}
          {selectedItem === "myProfile" && <MyProfile adminData={adminData}/>    }
          {selectedItem === "attendace" && <Attendance />}
          {selectedItem === "fees" && <Fees />}
          {selectedItem === "payroll" && <Payroll />}
          {selectedItem === "syllabus" && <Syllabus />}
          {selectedItem === "timeTable" && <TimeTable />}
          {selectedItem === "circular" && <Circular />}
          {selectedItem === "exam" && <Exam />}
          {selectedItem === "inventoryManagement" && <InventoryManagement />}
          {selectedItem === "manageStudents" && <ManageStudents adminId={adminData._id} />}
          {selectedItem === "manageTeachers" && <ManageTeachers adminId={adminData._id} />}
          {selectedItem === "lostFound" && <LostAndFound />}
          {selectedItem === "communication" && <Communication adminData={adminData} />}
          {selectedItem === "requestvalidation" && <RequestValidation adminId={adminData._id}/>}



          {/* Notification */}
          {selectedItem === "dashboard" && (
            <Notification notifications={notifications} />
          )}
        </div>
      </div>

    </div>
    </AdminContext.Provider>
  );
};
export default AdminDashboard;
