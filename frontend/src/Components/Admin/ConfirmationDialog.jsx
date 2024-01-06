import React, { useState, useEffect } from 'react';

function ConfirmationDialog({ handleConfirm, open, onClose }) {
  const [adminData, setAdminData] = useState({});
  useEffect(() => {
    setAdminData(JSON.parse(localStorage.getItem('data')));
  }, []);

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(1);

  const handleConfirms = () => {
    if (adminData.ID === loginId && adminData.password === password) {
      handleConfirm();
    } else {
      setValid(0);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-5 backdrop-blur-sm'>
      <div className="dialog-container bg-white">
        <div className="dialog-header bg-slate-200">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Confirmation Required!!
            <button onClick={onClose} className="ml-auto text-red-500">
              X
            </button>
          </div>
        </div>
        <div className="dialog-content">
          <form>
            <input
              type="text"
              placeholder="ID"
              className="w-full border rounded-md p-2 mb-2"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-md p-2 mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </form>
          {valid === 0 && <p className="text-red-400 text-sm">*Invalid Credentials</p>}
        </div>
        <div className="dialog-actions">
          <button onClick={handleConfirms} className="bg-blue-500 text-white rounded-md py-2 px-4">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
