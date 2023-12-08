import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Components/Home/Login';
import './App.css'; 
import AdminDashboard  from './Components/Admin/AdminDashboard';
import SuperAdminDashboard  from './Components/SuperAdmin/SuperAdminDashboard';
import { TeacherDashboard } from './Components/Teacher/TeacherDashboard';
import { StudentDashboard } from './Components/Student/StudentDashboard';
import MyProfile from './Components/Admin/MyProfile';
import Fees from './Components/Admin/Fees';
import CircularProgress from '@mui/material/CircularProgress';
import ForgotPsw from './Components/common/ForgetPsw';

const LoadingContext = createContext();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toggleLoading = (value) => {
    setIsLoading(value);
  };
  return (
    <LoadingContext.Provider value={{ isLoading, toggleLoading }}>
    <div className={`${
          isLoading ? 'opacity-50 ' : '' }`} >
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/admin/fees" element={<Fees/>} />
          <Route path="/superadmin" element={<SuperAdminDashboard/>} />
          <Route path="/teacher" element={<TeacherDashboard/>} />
          <Route path="/student" element={<StudentDashboard/>} />
          <Route path="/forget" element={<ForgotPsw/>} />


          {/* <Route path="/edit/:id" element={<StudentEdit/>} /> */}
        </Routes>
      </Router>
    </div>
    {isLoading && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CircularProgress /> {/* Center the CircularProgress loader */}
      </div>
    )}
    </LoadingContext.Provider>
  );
};

export default App;
export { LoadingContext };