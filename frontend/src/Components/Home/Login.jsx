import React, { useState, useContext } from 'react';
import { redirect, useParams } from 'react-router-dom';
import TitleBar from './TitleBar';
import Depositphotos from "../../img/Depositphotos.jpg";
import '../../App.js';
import { useNavigate } from "react-router-dom";
import { login_user } from '../../controllers/loginRoutes';
import { LoadingContext } from '../../App.js';

const Login = () => {
  const { isLoading, toggleLoading } = useContext(LoadingContext);
  const { type } = useParams();
  const [credentials, setCredentials] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [selectedType, setSelectedType] = useState('?');
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);

  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginTypeClick = (selected) => {
    setSelectedType(selected);
    setShowWarning(false);
  };

  const handleLogin = () => {
    toggleLoading(true);
    login_user({ username, password, selectedType }).then((resp) => {
      if (resp.status != 201) {
        setCredentials("*" + resp.message);
        setUsername('');
        setPassword('');
        toggleLoading(false);
      }
      else {
        switch (selectedType) {
          case "Admin":
            localStorage.setItem("token", resp.token);
            localStorage.setItem("data", JSON.stringify(resp.admin_data));
            if(resp.admin_data.name=== "SuperAdmin"){
              navigate('/superadmin');
            }
            else{
              navigate('/admin'); 
            }
            break;
          case "Student":
            localStorage.setItem("token", resp.token);
            localStorage.setItem("data", JSON.stringify(resp.student_data));
            navigate('/student');
            break;
          case "Teacher":
            localStorage.setItem("token", resp.token);
            localStorage.setItem("data", JSON.stringify(resp.teacher_data));
            navigate('/teacher');
            break;
        }
      }
      toggleLoading(false);
    })
  }


  return (
    <div className="flex flex-col min-h-screen">
      <TitleBar />
      <div className="flex items-center justify-center flex-grow">
        <div className="w-full md:w-1/3 p-4 m-10">
          <img src={Depositphotos} alt="Random Img" className="w-full h-full object-cover" />
        </div>

        {/* login type */}
        <div className="space-y-4">
          <div onClick={() => handleLoginTypeClick('Admin')} className="flex flex-col p-10 bg-blue-500 hover:bg-blue-600 py-8 rounded-lg text-center items-center">
            <img src={require("../../img/admin.png")} className='w-8 h-8' />
            <p className="mt-2">Admin</p>
          </div>
          <div onClick={() => handleLoginTypeClick('Teacher')} className="flex flex-col p-10 bg-red-500 hover:bg-red-600 py-8 rounded-lg text-center items-center">
            <img src={require("../../img/teacher_icon.png")} className='w-8 h-8' />
            <p className="mt-2">Teacher</p>
          </div>
          <div onClick={() => handleLoginTypeClick('Student')} className="flex flex-col p-10 bg-green-500 hover:bg-green-600 py-8 rounded-lg text-center items-center">
            <img src={require("../../img/student_icon.png")} className='w-8 h-8' />
            <p className="mt-2">Student</p>
          </div>
        </div>

        <div className="ml-8 p-8 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-semibold mb-6" style={{ color: selectedType === '?' ? 'red' : 'black' }}>{selectedType === '?' ? 'Please select a login type' : `Login as ${selectedType || type}`}</h1>
          {selectedType && (
            <div className="temp">
              <div className="flex justify-center">
                {
                  (selectedType === 'Admin' || selectedType == 'Student')
                    ?
                    selectedType === 'Admin' ? <img src={require("../../img/admin.png")} className='w-14 h-14 ' />
                      : <img src={require("../../img/student_icon.png")} className='w-14 h-14 ' />
                    :
                    selectedType === 'Teacher' ? <img src={require("../../img/teacher_icon.png")} className='w-14 h-14 ' />: ''

                }

              </div>
              <input
                className='w-full border-2 rounded p-2'
                placeholder='ID'
                id="ID"
                value={username}
                onChange={handleUsernameChange}
                disabled={selectedType === '?'}
                style={{ marginTop: "2vh" }}
              />

              <input
                id="Password"
                className='w-full border-2 rounded p-2'
                placeholder='PASSWORD'
                type="password"
                value={password}
                onChange={handlePasswordChange}
                disabled={selectedType === '?'}
                style={{margin: "1vh 0 1vh 0"}}
              />

              <button onClick={handleLogin} className='bg-blue-800 w-full rounded p-2 text-white hover:bg-blue-900' disabled={selectedType === '?'}>
                Log in
              </button>
              <p style={{ color: "red", fontSize: "1vw", textAlign: "initial", marginTop: "1.7vh" }}>{credentials}</p>
              {credentials && selectedType === 'Admin' && (
                <a href="/forget" target='_blank' className='text-blue-600 font-bold underline'>Forget Password</a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
