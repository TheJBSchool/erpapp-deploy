import React, {useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { bgcolor2 } from "../Home/custom.js";

import Header from "../common/Header";
import StudentLeftPanel from "./StudentLeftPanel";
import Notification from "../common/Notification";

import MyProfile from "./MyProfile.jsx";
import Fees from "./Fees.jsx";
import TimeTable from "./TimeTable.jsx";
import Circular from "./Circular.jsx";
import Attendance from "./Attendance.jsx";
import Result from "./Result.jsx";
import Syllabus from "./Syllabus.jsx";
import LostAndFound from "./LostAndFound.jsx";
import Exam from "./Exam.jsx";
import Events from "./Events.jsx";
import Communication from "./Communication.jsx";
import { stu_circular} from '../../controllers/loginRoutes.js';
export const StudentContext = createContext();

export const StudentDashboard = () => {
  const notifications = [
    { content: "Notification 1: Lorem ipsum dolor sit amet." },
    { content: "Notification 2: Consectetur adipiscing elit." },
    { content: "Notification 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { content: "Notification 4: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
    { content: "Notification 5: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore." },
    { content: "Notification 6: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia." },
    { content: "Notification 7: Deserunt mollit anim id est laborum." },
    { content: "Notification 8: Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { content: "Notification 9: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { content: "Notification 10: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
  ];
  const [allNotifications, setAllNotifications] = useState(notifications)
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const [studentData, setStudentData]= useState({});
  const [allStuCirculars, setAllStuCirculars] = useState();

  useEffect(()=>{
    
    setStudentData(JSON.parse(localStorage.getItem("data")));
    // console.log(studentData)
  },[]);
  useEffect(()=>{
    if(studentData){
      // console.log("studentData",studentData)
      stu_circular(studentData.class).then((resp)=>{
        if(resp.length>0){
          // console.log("resp",resp)
          setAllStuCirculars(resp);
          setAllNotifications(resp)
        }
      })
    }
  });
  // console.log("stu_circular",allStuCirculars);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
    } else navigate("/");
  }, []);
  return (
    <StudentContext.Provider value={{ selectedItem, setSelectedItem }}>

      <div className="flex flex-col h-full pt-4 px-12">
        <Header />

        <div className="h-full w-full flex p-5 justify-between gap-7">
          <StudentLeftPanel name={studentData.name} id={studentData.ID}/>
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

              <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('events')}>
                <img className="h-14 w-14 mb-4" alt="Timetable" src={require('../../img/event.png')} />
                <p className="font-bold text-sm text-center">Events</p>
              </div>

              <div className={`border-2 border-red-400 flex flex-col justify-center items-center p-4 rounded-lg hover:bg-red-200 hover:cursor-pointer`} onClick={() => setSelectedItem('communication')}>
                <img className="h-14 w-14 mb-4" alt="communication" src={require('../../img/comments.png')} />
                <p className="font-bold text-sm text-center">Communications</p>
              </div>

            </div>
          )}
          {selectedItem === "myProfile" && <MyProfile studentData={studentData}/>    }
          {selectedItem === "attendace" && <Attendance />}
          {selectedItem === "result" && <Result studentData={studentData} />}
          {selectedItem === "syllabus" && <Syllabus />}
          {selectedItem === "lostFound" && <LostAndFound studentData={studentData}/>}

          {selectedItem === "timeTable" && <TimeTable stu_class={studentData.class} stu_section={studentData.section}/>}
          {selectedItem === "circular" && <Circular circular={allStuCirculars} />}
          {selectedItem === "exam" && <Exam />}
          {selectedItem === "events" && <Events />}
          {selectedItem === "communication" && <Communication />}
          {selectedItem === "fees" && <Fees />}
          {selectedItem === "dashboard" && (
            <Notification notifications={allNotifications} />
          )}

        </div>  

        </div>
      </div>
    </StudentContext.Provider>
  );
};
