import React, {useState, useEffect} from 'react';
import { all_teachers } from '../../controllers/loginRoutes.js';
import { bgcolor2 } from "../Home/custom.js";
import TeacherListPopup from "../common/TeacherListPopup.jsx";


const Communication = ({teacherData}) => {
    const messages = [ // add meta data also like - date, sender type, 
      {
        id: 1,
        sender: 'Mr. Khan',
        subject: 'Regarding Mathematics Assignment',
        body: 'Hi students, please note that the deadline for the Mathematics assignment has been extended to next Friday.',
        replies: [
          { id: 1, sender: 'Alice', message: 'Thank you for the update!' },
          { id: 2, sender: 'Bob', message: 'Could you clarify the specific topics to cover?' },
        ],
      },
      {
        id: 2,
        sender: 'Ms. Smith',
        subject: 'Science Fair Information',
        body: 'Dear students, the Science Fair has been rescheduled to the following month. Please prepare your projects accordingly.',
        replies: [
          { id: 1, sender: 'John', message: 'Understood, looking forward to the event!' },
          { id: 2, sender: 'Emma', message: 'Will there be any changes to the judging criteria?' },
        ],
      },
      {
        id: 3,
        sender: 'Mrs. Johnson',
        subject: 'Upcoming Field Trip',
        body: 'Hello everyone, our upcoming field trip to the museum has been postponed due to unforeseen circumstances. We will announce the new date soon.',
        replies: [
          { id: 1, sender: 'Oliver', message: 'I hope the new date aligns with our schedules.' },
          { id: 2, sender: 'Sophia', message: 'Will there be any changes in the itinerary?' },
        ],
      },
      {
        id: 4,
        sender: 'Dr. Patel',
        subject: 'Reminder: Biology Test',
        body: 'Dear students, a reminder that the Biology test will be held this Thursday. Ensure you have reviewed all topics thoroughly.',
        replies: [
          { id: 1, sender: 'Liam', message: 'Could you provide a list of specific chapters to focus on?' },
          { id: 2, sender: 'Ava', message: 'Is the test going to be multiple choice or essay-based?' },
        ],
      },
      {
        id: 5,
        sender: 'Mr. Thompson',
        subject: 'Class Schedule Change',
        body: 'Dear students, our class schedule for next week will be adjusted due to a faculty meeting. Please check the updated timetable.',
        replies: [
          { id: 1, sender: 'Mia', message: 'Could you share the revised schedule as soon as possible?' },
          { id: 2, sender: 'Noah', message: 'Will the duration of classes remain the same?' },
        ],
      },
      // ... add more sample messages if needed
    ];

    const [tempNote, setTempNote] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [showPopup, setShowPopup] = useState(false); 
    const [newMsg, setNewMsg]= useState(false);
    const [showModal, setShowModal] = useState(false); // State for showing the modal
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyBtn, setReplyBtn] = useState(false);
    const [isReplying,setIsReplying] = useState(false)
    useEffect(() => {
      all_teachers().then((resp) => {
        setTeachers(resp.all_teachers);
      })
    }, []);

    // console.log("selectedTeachers",selectedTeachers);

    const openMessageModal = (message) => {
      setSelectedMessage(message);
      setShowModal(true);
    };

    const closeMessageModal = () => {
      setSelectedMessage(null);
      setShowModal(false);
    };
    const newMsgSendHandle = ()=>{
      alert("Message sent Successfully")
      setNewMsg(false);
    }


    const handleTeacherSelection = (teacherId) => {
      // Check if the teacher is already selected
      const isSelected = selectedTeachers.includes(teacherId);

      // Update selected teachers based on whether the teacher is already selected or not
      if (isSelected) {
        const updatedTeachers = selectedTeachers.filter((id) => id !== teacherId);
        setSelectedTeachers(updatedTeachers);
      } else {
        setSelectedTeachers([...selectedTeachers, teacherId]);
      }
    };
    const openPopup = () => {
      setShowPopup(true);
    };

    const closePopup = () => {
      setShowPopup(false);
    };

    const handleReplyBtn = (message)=>{
      setSelectedMessage(message);
      setNewMsg(false);
      setReplyBtn(true);

    }
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
        {/* header */}
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/comments.png")} alt="StudentLogo" />
            <h1 className="font-bold ">Communication</h1>
        </div>

        <div className='main'>
            <div className="p-2 flex">

          <div className='mt-5 rounded-lg w-5/12 p-4 mr-2  '>
            <p className='text-center text-gray-600 font-extrabold mb-4 -mt-6'>Recent Chat</p>
            <div className='mb-6 bg-white'>
              <select name="filterChat" id="filterChat">
                <option value="sent">Sent</option>
                <option value="received">Received</option>
              </select>
            </div>
              {messages.map((message, index) => (
              <div key={index} className='flex justify-between rounded-lg p-4 mb-4 bg-slate-100 hover:bg-slate-200 '>
                <div onClick={() => openMessageModal(message)} className='cursor-pointer'>

                  <h3 className='font-bold box-shadow rounded'>{message.sender}</h3>
                  <p className='bg-slate-100 rounded text-[11px]'>{message.subject}</p>
                </div>
                <div className='px-1 flex  '>
                    <button
                      title='Forward'
                      className="bg-gray-300 hover:bg-green-400 text-sm text-black font-bold py-1 px-2 rounded mr-2 h-fit"
                      onClick={openPopup}
                    >
                      <img className='w-4 h4 text-black' src={require('../../img/forward.png')} alt="buttonpng" />
                    </button>
                    <button
                      title='Reply'
                      className="bg-gray-300 hover:bg-blue-400 text-sm text-black font-bold py-1 px-2 rounded mr-2 h-fit"
                      onClick={()=>handleReplyBtn(message)}
                    >
                      <img className='w-4 h4 text-black' src={require('../../img/reply.png')} alt="buttonpng" />
                    </button>
                  </div>
                  {showPopup && (
                    <TeacherListPopup
                      teachers={teachers}
                      selectedTeachers={selectedTeachers}
                      handleTeacherSelection={handleTeacherSelection}
                      onClose={closePopup} // Pass the function to close the pop-up
                      onForward={() => {
                        // Logic to forward the message to selected teachers
                        console.log('Selected Teachers:', selectedTeachers);
                        // Perform forwarding action here (e.g., API call)
                        // Reset selectedTeachers state after forwarding
                        setSelectedTeachers([]);
                        closePopup(); // Close the pop-up after forwarding
                      }}
                    />
                  )}
              </div>
              ))}
          </div>

          {!newMsg ? (
            <div className='flex flex-col w-7/12'>

              <button onClick={()=> setNewMsg(true)} className="bg-blue-300 hover:bg-blue-400  text-black font-bold py-2 px-2 rounded mt-6 h-fit w-fit" >New Message</button>
              <div >
                {replyBtn && selectedMessage && (
                  <div className='mt-2 shadow-md rounded-lg px-8 py-6'>
                    <h2 className="text-xl font-bold mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <p>{selectedMessage.body}</p>
                    {selectedMessage.replies && selectedMessage.replies.map((reply) => (
                      <div key={reply.id} className="ml-4">
                        <div className="font-bold">@{reply.sender}</div>
                        <div>{reply.message}</div>
                      </div>
                    ))}
                    <div className='ml-4'>
                      <p className=' font-bold text-slate-500'>@{teacherData.name}</p>
                      <textarea onFocus={() => setIsReplying(true)} onBlur={() => setIsReplying(false)} className='outline-none px-2 w-full rounded' placeholder='reply....' type="text"  />
                      {isReplying && (
                        <button className='bg-blue-500 text-white text-[14px] p-1 mt-2 rounded'>
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                )}
              
              </div>
            </div>
          ): (

          <div style={bgcolor2}  className=' mt-5 w-9/12 rounded-lg p-4 '>
              <div>
                <div className='mb-6'>
                  <label htmlFor="subject" className=" mb-1 ml-1 block font-bold text-gray-600 ">To <span className="text-red-500">*</span> </label>
                  <input type="text" id="subject" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="subject" 
                //   value={communication.subject} onChange={handleNewCircular} 
                  required />
                </div>

                <div className='mb-6'>
                  <label htmlFor="subject" className=" mb-1 ml-1 block font-bold text-gray-600 ">Subject <span className="text-red-500">*</span> </label>
                  <input type="text" id="subject" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="subject" 
                //   value={communication.subject} onChange={handleNewCircular} 
                  required />
                </div>

                <div className='mb-6'>
                  <label htmlFor="description" className=" mb-1 ml-1 block font-bold text-gray-600 ">Desciption <span className="text-red-500">*</span> </label>
                    <textarea type="text" id="description" className="h-[200px] w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="description" 
                    // value={communication.description} onChange={handleNewCircular} 
                    required />    
                    
                </div>
                <div className='flex justify-end'>
                  <button className="bg-green-300 hover:bg-green-400  text-black font-bold py-2 px-2 rounded mt-6" onClick={newMsgSendHandle}>Send</button>
                </div>

              </div>
              <>
              {tempNote && <p className='text-red-500'>*{tempNote}</p>}
              </>
            
            
            
          </div>
          )}


        </div>
        </div>

      {showModal && (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-4 w-6/12">
            <div className='flex justify-end '>
              <button className="modal-close bg-red-200 px-2 rounded hover:bg-red-300" onClick={closeMessageModal}>
                Close
              </button>
            </div>
            {selectedMessage && (
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {selectedMessage.subject}
                </h2>
                <p>{selectedMessage.body}</p>
                {selectedMessage.replies && selectedMessage.replies.map((reply) => (
                  <div key={reply.id} className="ml-4">
                    <div className="font-bold">@{reply.sender}</div>
                    <div>{reply.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default Communication