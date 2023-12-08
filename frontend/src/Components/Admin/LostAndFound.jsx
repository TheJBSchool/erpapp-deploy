import React, { useRef, useState, useEffect } from 'react';
import { bgcolor2 } from "../Home/custom.js";
import ClaimModal from './ClaimModel.jsx';
import './LostAndFound.css';
import {saveUploads_lostAndFound, fetchRecentItems} from '../../controllers/loginRoutes.js';

import uploadImg from '../../img/cloud-upload-regular.png';
import fileDefault from '../../img/cloud-upload-regular.png';
import fileCSS from '../../img/student.png';
import filePdf from '../../img/cloud-upload-regular.png';
import filePng from '../../img/cloud-upload-regular.png';
import bag from '../../img/bag.jpeg';

const ImageConfig = {
    default: fileDefault,
    pdf: filePdf,
    png: filePng,
    css: fileCSS
}

const LostAndFound = () => {
    const wrapperRef = useRef(null);

    const [desciption, setDesciption] = useState('');
    const [uploadedImage, setUploadImage]= useState();
    const [fileList, setFileList] = useState([]);
    const [activeTab, setActiveTab] = useState('newUpload');
    const [sucess, setSucess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [recentUploads, setRecentUploads] = useState([]);
    const [claimReq, setClaimReq] = useState([{itemImg: "../../img/bag.jpeg", itemDesc: "iPhone 15 Pro Mobile ", claimBy: "Student1"}, {itemImg: "../../img/bag.jpeg",itemDesc: "Red Bag", claimBy: "Student2"},]);

    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedClaim, setSelectedClaim] = useState(null); // State to store selected claim data

    // Function to show the modal and set the selected claim data
    const showClaimModal = (claimData) => {
        setSelectedClaim(claimData);
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
    }

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileChange = (files) => {
        console.log(files);
    }

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            setUploadImage(newFile);

            const updatedList = [newFile, ...fileList];
            setFileList(updatedList);
            setRecentUploads(updatedList);
            onFileChange(updatedList);
            setSuccessMessage(`File "${newFile.name}" uploaded successfully.`);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        onFileChange(updatedList);
    }

    const DescChangeHandler = (e)=>{
        setDesciption(e.target.value);
    }

    const postHandler = (e)=>{
        e.preventDefault();
        if(desciption && uploadedImage){
            const formData = new FormData();
            formData.append('itemImg', uploadedImage);
            formData.append('itemDesc', desciption); // Update with the actual description
            formData.append('claimBy', []); // Update with the actual claimant name
            saveUploads_lostAndFound(formData).then((resp)=>{
                if (resp.status !== 201) {
                    setSuccessMessage(resp.message);
                } else {
                    setSuccessMessage(resp.message);
                }
                
            }).catch((err)=>{
                setSuccessMessage(err);
            })
        }
    }
    const [allLostItems, setAllLostItems] = useState([]);
    useEffect(() => {
        if (activeTab === 'recent') {
            fetchRecentItems().then((resp)=>{
                setAllLostItems(resp);
                console.log("resp",resp)
                
            })
        }
    }, [activeTab]);


    return (
        <>
        <div
            style={bgcolor2}
            className="border-2  border-red-300 rounded-lg p-10 h-full"
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

            <div
                style={bgcolor2}
                className="border-2 mt-5 border-red-300 rounded-lg flex flex-row p-10 justify-between uploadBody"
            >
                <div className="box border-2 border-red-300 w-8/12 ">
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
                            <div>
                            <div 
                                ref={wrapperRef}
                                className="border-2 border-red-300 border-dashed rounded-md hover:opacity-70"
                                onDragEnter={onDragEnter}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                            >
                                <label htmlFor="fileInput" className="drop-file-input__label">
                                    <img src={uploadImg} alt="" />
                                    <p>Drag & Drop your files here</p>
                                </label>
                                <input type="file" id="fileInput" value="" className='opacity-0' onChange={onFileDrop} />

                            </div>
                            {successMessage && (
                                <div className="text-green-500 mt-2 text-center mb-4">
                                    {successMessage}
                                </div>
                            )}
                            <textarea onChange={DescChangeHandler} placeholder='Write a Desciption' className=' mt-4 rounded w-full p-2 bg-slate-100'></textarea>
                            <div className='flex justify-end'>

                                <button className='bg-green-400 hover:bg-green-500 rounded px-4 py-2 text-end' onClick={postHandler}>Post</button>
                            </div>
                            </div>
                        )}
                        
                        {activeTab === 'recent' && (
                        <div className="drop-file-preview p-4 cursor-pointer">
                            {allLostItems.map((item, index) => (
                            <div key={index} className="drop-file-preview__item">
                                <img src={item.imageUrl} alt="" />
                                <div className="drop-file-preview__item__info">
                                <p>{item.itemDesc}</p>
                                {/* <p>Claim by: {item.claimBy}</p> */}
                                </div>
                            </div>
                            ))}
                        </div>
                        )}

                        {activeTab === 'claimReq' && (
                            <div className="drop-file-preview p-4 cursor-pointer">
                                {allLostItems.map((item, index) => (
                                    item.claimBy.length > 0 && item.claimBy.map((claimReq,ind)=>(
                                        <div key={ind} className="drop-file-preview__item">
                                            <img src={fileCSS} alt="" />
                                            <div onClick={() => showClaimModal(item)} className='flex flex-col'>
                                                <p><strong>Item:</strong> {item.itemDesc}</p>
                                                <p><strong>Claim by:</strong> {item.claimBy[ind].student?.name}</p>
                                                <p><strong>Claim Message:</strong> {item.claimBy[ind].claimMessage}</p>
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
            onApprove={handleApprove} // Pass the handleApprove function
            />
        </>
    );
}

export default LostAndFound;
