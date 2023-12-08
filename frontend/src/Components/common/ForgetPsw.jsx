import React, { useState } from 'react';
import { otpSend, validateOtp, resetPassword } from '../../controllers/loginRoutes'; // Import the function to handle forgot password request
import { useNavigate } from 'react-router-dom';

const ForgotPsw = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otpcode, setOtpcode] = useState('');
  const [message, setMessage] = useState('');
  const [isValidOtp, setIsValidOtp] = useState(false);
  const [newPsw, setNewPsw] = useState('');
  const [confirmNewPsw, setConfirmNewPsw] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleOptcodeChange = (event) => {
    setOtpcode(event.target.value);
  };

  const handleForgotPassword = () => {
    if (email && parseInt(otpcode) >= 999) {
      validateOtp(email, otpcode).then((resp) => {
        if (resp) {
          setIsValidOtp(true);
          setMessage('');
        } else {
          setMessage('Invalid Otp');
        }
      });
      return;
    }
    otpSend(email)
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const handleReset = () => {
    if (newPsw !== confirmNewPsw) {
      setMessage('Passwords do not match');
      return;
    }

    resetPassword(email, newPsw)
      .then((resp) => {
        if (resp) {
          alert('Password updated successfully!');
          navigate('/');
        }
      })
      .catch((error) => {
        setMessage(error.message);
        alert('Failed to update password, Please Try again..');
        navigate('/');
      });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="w-full flex justify-center">
      <div className="shadow-md rounded-lg m-52 px-8 py-6 w-4/12 ">
        <h2 className="text-center font-bold text-2xl m-5">Forgot Password</h2>

        {isValidOtp ? (
          <div className="flex flex-col justify-center">
            <label htmlFor="newpsw">New Password</label>
            <input
              id="newpsw"
              value={newPsw}
              onChange={(e) => setNewPsw(e.target.value)}
              type="password"
            />
            <br />
            <label htmlFor="confirmnewpsw">Confirm Password</label>
            <input
              id="confirmnewpsw"
              value={confirmNewPsw}
              onChange={(e) => setConfirmNewPsw(e.target.value)}
              type="password"
            />

            <div className="flex justify-center mt-2">
              <button className="mr-2 bg-blue-400 px-4 py-2 rounded" onClick={handleBack}>
                Back
              </button>
              <button onClick={handleReset} className="bg-green-400 px-4 py-2 rounded">
                Reset Password
              </button>
            </div>
            {message && <p className="text-red-300">*{message}</p>}
          </div>
        ) : (
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            <br />
            <br />
            {message === 'Please Check your email' && (
              <input
                type="text"
                value={otpcode}
                onChange={handleOptcodeChange}
                placeholder="Enter OTP"
              />
            )}
            <div className="flex justify-center mt-2">
              <button className="mr-2 bg-blue-400 px-4 py-2 rounded" onClick={handleBack}>
                Back
              </button>
              <button className="bg-green-400 px-4 py-2 rounded" onClick={handleForgotPassword}>
                Submit
              </button>
            </div>
            <br />
            {message && <p className="text-red-300">*{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPsw;
