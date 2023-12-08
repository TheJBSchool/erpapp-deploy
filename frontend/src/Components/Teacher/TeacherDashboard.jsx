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
    setTeacherData(JSON.parse(localStorage.getItem("data")));
    // console.log(teacherData)
  },[]);
 
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){ }
    else navigate('/');

    all_students().then((resp) => {
      // console.log(resp.all_students)
      setStudents(resp.all_students);
    })
  }, [])
  return (
    <TeacherContext.Provider value={{ selectedItem, setSelectedItem }}>

      <div className="flex flex-col h-full pt-4 px-12">
        <Header />

        <div className="h-full w-full flex p-5 justify-between gap-7">
          <TeacherLeftPanel name={teacherData.name} id={teacherData.ID}/>
          <div className="flex flex-col w-10/12 h-full ">
            {selectedItem === "dashboard" && (
              <>

              <div style={bgcolor2} className="border-2  border-red-300 rounded-lg grid grid-cols-3 gap-12 p-10 ">

                <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('timeTable')}>
                  <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/timetable.png')} />
                  <p className="font-bold text-sm">Time Table</p>
                </div>

                <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('circular')}>
                  <img className="h-14 w-14 mb-4" alt="circular" src={require('../../img/circular.png')} />
                  <p className="font-bold text-sm">Circular</p>
                </div>

                <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('exam')}>
                  <img className="h-14 w-14 mb-4" alt="exam" src={require('../../img/exam.png')} />
                  <p className="font-bold text-sm">exam</p>
                </div>

              </div>
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