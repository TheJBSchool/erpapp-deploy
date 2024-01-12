import React, { useRef, useState, useEffect } from 'react';
import { bgcolor2 } from "../Home/custom.js";
import ClaimModal from './ClaimModel.jsx';
import './LostAndFound.css';
import {saveUploads_lostAndFound, fetchRecentItems, all_students_details, approve_claimItem, decline_claimItem, deleteLostItem} from '../../controllers/loginRoutes.js';

import uploadImg from '../../img/cloud-upload-regular.png';

const base = process.env.REACT_APP_BASE;

const LostAndFound = ({adminId}) => {
    const wrapperRef = useRef(null);

    const [image, setImage] = useState({
        preview: '',
        raw: '',
    });
    const [deletedItem, setDeletedItem] = useState()

    const handlePhotoChange = (e) => {
        if (e.target.files.length) {
            const newFile = e.target.files[0];
            setImage({
                preview: URL.createObjectURL(newFile),
                raw:newFile,
            });
            setSuccessMessage(`"${newFile.name}" selected.`);
        }
    };


    const [desciption, setDesciption] = useState('');
    const [activeTab, setActiveTab] = useState('newUpload');
    const [sucess, setSucess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedClaim, setSelectedClaim] = useState(null); // State to store selected claim data
    const [students, setStudents] = useState([]);

    useEffect(()=>{
        all_students_details(adminId).then((resp) => {
            if(resp.status === 201){
                // console.log("respStudent", resp.studentsMap)
                setStudents(resp.studentsMap);
            }
        })
    },[]);

    // Function to show the modal and set the selected claim data
    const showClaimModal = (claimData_obj) => {
        setSelectedClaim(claimData_obj);
        setShowModal(true);
    };  

    // Function to close the modal
    const closeClaimModal = () => {
        setSelectedClaim(null);
        setShowModal(false);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSuccessMessage('');
    };
    const handleApprove = (claimData) => {
        setShowModal(false);
        // console.log("IDDDDD",claimData.itemId, claimData.stuId)
        approve_claimItem(claimData.itemId, claimData.stuId).then((resp)=>{
            // console.log("Onapporve",resp)
            alert(resp.message);
        });
    }

    const handleDecline = (claimData) => {
        setShowModal(false);
        // console.log("IDDDDD",claimData.itemId, claimData.stuId)
        decline_claimItem(claimData.itemId, claimData.stuId).then((resp)=>{
            // console.log("Onapporve",resp)
            alert(resp.message);
        });
    }

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');


    const DescChangeHandler = (e)=>{
        setDesciption(e.target.value);
    }

    const postHandler = (e)=>{
        if(desciption && image){
            const formData = new FormData();
            formData.append('itemImg', image.raw);
            formData.append('itemDesc', desciption); 
            // for (const value of formData.values()) {
            //     console.log(value);
            // }
            if(formData){
                saveUploads_lostAndFound(adminId, formData).then((resp)=>{
                    // console.log("saveUploads_lostAndFound",resp)
                    setSuccessMessage(resp.message);
                    if(resp.message=== "File uploaded successfully"){
                        //
                        setImage({
                            preview: '',
                            raw: '',
                        });
                        setDesciption('');
                    }
                    
                }).catch((err)=>{
                    console.log("saveUploads_lostAndFoundErrr",err)
                    // setSuccessMessage(err);
                })
            }
        }
    }
    const [allLostItems, setAllLostItems] = useState([]);
    useEffect(() => {
        fetchRecentItems(adminId).then((resp)=>{
            setAllLostItems(resp);
            // console.log("resp",resp)
            
        })
    }, [activeTab, deletedItem]);

    const handleDelete = (id)=>{
        const isConfirm = window.confirm("Are sure want to Delete this Item");
        if(isConfirm){
            deleteLostItem(id).then((resp)=>{
                // console.log("deltelostItem",resp)
                setDeletedItem(resp);
            })
        }
    }


    return (
        <>
        <div
            style={bgcolor2}
            className="border-2  border-red-300 rounded-lg p-10 h-full "
        >
            {/* header */}
            <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
                <img
                    className="w-9 h-9 mr-2 "
                    src={require("../../img/lost-found.png")}
                    alt="StudentLogo"
                />
                <h1 className="font-bold ">Lost And Found</h1>
            </div>

            <div  className='flex justify-center my-4'  >
                <div style={bgcolor2} className="box border-2 border-red-300 w-8/12 ">
                    <div className='flex justify-center mb-4'>
                        <button
                            className={`${activeTab === 'newUpload' ? 'bg-black text-white' : 'bg-white text-black'} p-2 px-6 rounded-3xl `}
                            onClick={() => handleTabChange('newUpload')}
                        >
                            New Upload
                        </button>
                        <button
                            className={`${activeTab === 'recent' ? 'bg-black text-white' : 'bg-white text-black'} p-2 px-6 rounded-3xl `}
                            onClick={() => handleTabChange('recent')}
                        >
                            Recent
                        </button>

                        <button
                            className={`${activeTab === 'claimReq' ? 'bg-black text-white' : 'bg-white text-black'} p-2 px-6 rounded-3xl `}
                            onClick={() => handleTabChange('claimReq')}
                        >
                            Claim Request
                        </button>
                    </div>
                    <div className=''>
                        {activeTab === 'newUpload' && (
                            <div className='  '>
                            <div 
                                ref={wrapperRef}
                                className="border-2 border-red-300 border-dashed rounded-md hover:opacity-70 "
                                onDragEnter={onDragEnter}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                            >
                                <label htmlFor="fileInput" className="drop-file-input__label">
                                     {image.preview ? (
                                        <img
                                        src={image.preview}
                                        alt="image"
                                        className="my-10 mx-5 w-fit"
                                        />
                                    ) : (
                                        <>
                                            <img src={uploadImg} alt="" />
                                            <p>Drag & Drop your files here</p>
                                        </>
                                    )}
                                </label>
                                <input type="file" id="fileInput" name='image' className='opacity-0' onChange={handlePhotoChange} />

                            </div>
                            {successMessage && (
                                <div className="text-green-500 mt-2 text-center mb-4">
                                    {successMessage}
                                </div>
                            )}
                            <textarea onChange={DescChangeHandler} value={desciption} placeholder='Write a Desciption' className=' mt-4 rounded w-full p-2 bg-slate-100'></textarea>
                            <div className='flex justify-end'>

                                <button type='submit' className='bg-green-400 hover:bg-green-500 rounded px-4 py-2 text-end' onClick={postHandler}>Post</button>
                            </div>
                            </div>
                        )}
                        
                        {activeTab === 'recent' && (
                        <div className="drop-file-preview p-4 cursor-pointer">
                            {allLostItems && allLostItems.map((item, index) => (
                            <div key={index} className="drop-file-preview__item flex justify-between">
                                <div className='flex'>
                                    <img src={base+'/'+ item.imageUrl } alt="" />
                                    <div className="">
                                        <p>{item.itemDesc}</p>
                                        <p className='text-[12px] mt-2'>{new Date(item.date_created).toLocaleDateString('en-GB')}</p>
                                    </div>
                                </div>
                                <div className='w-[10px] mr-6'>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-white hover:bg-red-400 text-sm text-black font-bold p-2 rounded"
                                    >
                                        <img className='w-2 text-black' src={require('../../img/delete.png')} alt="buttonpng" />
                                    </button>
                                </div>
                            </div>
                            ))}
                        </div>
                        )}

                        {activeTab === 'claimReq' && (
                            <div className="drop-file-preview p-4 cursor-pointer">
                                {allLostItems.map((item, index) => (
                                    item.claimBy.length > 0 && item.claimBy.map((claimReq,ind)=>(
                                        <div key={ind} className="drop-file-preview__item shadow-md">
                                            <img src={base+'/'+ item.imageUrl} alt="" className=' rounded-sm h-[80px] w-[80px]'/>
                                            <div onClick={() => showClaimModal({itemId:item._id, stuId:claimReq.studentId, itemUrl: base+'/'+ item.imageUrl, itemDesc:item.itemDesc, claimBy:students[claimReq.studentId], claimMsg: claimReq.claimMessage })} className='flex flex-col'>
                                                <p><strong>Item:</strong> {item.itemDesc}</p>
                                                <p><strong>Claiming by:</strong> {students[claimReq.studentId]?.name}</p>
                                                <p><strong>Claim Message:</strong> {claimReq.claimMessage}</p>
                                                <p><strong>Status:</strong> {claimReq.status}</p>
                                            </div>
                                        </div>
                                    )
                                    ) 
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
        {/* Showing modal to approve or cancel claim request */}
            <ClaimModal
            showModal={showModal}
            closeModal={closeClaimModal}
            claimData={selectedClaim}
            onApprove={handleApprove} 
            onDecline={handleDecline}
            />
        </>
    );
}

export default LostAndFound;
