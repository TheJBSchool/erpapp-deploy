import React, { useState } from 'react';
import { bgcolor1, bgcolor2 } from "../Home/custom.js";

const Notification = ({ notifications }) => {
    // console.log("noti",notifications)
    const [showAllNotifications, setShowAllNotifications] = useState(false);
    const showNotification = (index)=>{

    }

    return (
        <div style={bgcolor2} className="w-full border-2 border-red-300 rounded-lg p-5 mt-6">
            <h1 className="font-bold">Notifications</h1>
            <div className="max-h-60 overflow-y-auto mt-4">
                {/* ... Notification items ... */}
                {notifications.slice(0, showAllNotifications ? notifications.length : 3).map((notification, index) => (
                    <div key={index} className="border-b-2 border-gray-400 mb-2 flex hover:bg-red-100 rounded cursor-pointer" onClick={()=>showNotification(index)}>
                        <p className='mr-2'>{index+1}.</p>
                        <p>{notification.title}</p>
                        <p className='text-[11px] ml-4'> {new Date(notification.date_started).toLocaleDateString('en-GB')}</p>
                    </div>
                ))}
            </div>
            {notifications.length > 3 && (
                <button
                    className="text-blue-500 hover:underline mt-2"
                    onClick={() => setShowAllNotifications(!showAllNotifications)}
                >
                    {showAllNotifications ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    );
};

export default Notification;
