import React, {useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { bgcolor2 } from "../Home/custom.js";

import Header from "../common/Header";
import TeacherLeftPanel from "./TeacherLeftPanel";
import MyProfile from "./MyProfile.jsx";
import Communication from "./Communication.jsx";
import Calender from "./Calender.jsx";
import { all_students } from "../../controllers/loginRoutes.js";
import TimeTable from "./TimeTable.jsx";
import Result from "./Result.jsx";

export const TeacherContext = createContext();
export const TeacherDashboard = () => {
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const [teacherData, setTeacherData]= useState({});
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    const dataa = JSON.parse(localStorage.getItem("data"))
    setTeacherData(dataa);
    all_students(dataa.underBy).then((resp) => {
      // console.log(resp.all_students)
      // console.log("dashboard",resp.all_students)
      setStudents(resp.all_students);
    })
    // console.log(teacherData)
  },[]);
 
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){ }
    else navigate('/');

    
  }, [])

  // console.log("teacherData",teacherData)
  return (
    <TeacherContext.Provider value={{ selectedItem, setSelectedItem }}>

      <div className="flex flex-col h-full pt-4 px-12">
        <Header />

        <div className="h-full w-full flex p-5 justify-between gap-7">
          <TeacherLeftPanel teacherData={teacherData}/>
          <div className="flex flex-col w-10/12 h-full ">
            {selectedItem === "dashboard" && (
              <>
            <Calender students={students}></Calender>
              </>
            )}
            {selectedItem === "myProfile" && <MyProfile teacherData={teacherData}/>    }
            {/* {selectedItem === "attendace" && <Attendance />}
            {selectedItem === "result" && <Result />}
            {selectedItem === "fees" && <Fees />}
            {selectedItem === "payroll" && <Payroll />} */}
            {selectedItem === "communication" && <Communication teacherData={teacherData} />}
            {selectedItem === "timeTable" && <TimeTable teacherData={teacherData} />}
            {selectedItem === "result" && <Result teacherData={teacherData} />}

            

          </div>
        </div>
      </div>
    </TeacherContext.Provider>
  )
}