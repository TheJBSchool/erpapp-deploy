import React, {useState, useEffect, useContext} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { result_approval,all_students_names, approve_result, all_unlock_resultreq, get_resultById, approve_unlock_result, delete_unlock_resultreq, decline_result} from '../../controllers/loginRoutes.js';
import { LoadingContext } from '../../App.js';
import ViewResult from './ViewResult.jsx';

const ResquestValidation = ({adminId}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [resultRequests, setResultRequests] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [resultInd, setResultInd] = useState(-1);
  const [studentsData, setStudentsData] = useState([]);
  const [unlockresultRequests, setUnlockresultRequests] = useState([]);
  const [reqestedResult, setRequestedResult]= useState(null);

  const { isLoading, toggleLoading } = useContext(LoadingContext);

  useEffect(()=>{
    result_approval(adminId).then((resp)=>{
      setResultRequests(resp);
    })

    all_students_names(adminId).then((resp) => {
      setStudentsData(resp);
    }).catch((error) => {
      console.error('Error fetching students:', error);
    });

    all_unlock_resultreq(adminId).then((resp)=>{
      // console.log("unlock request",resp)
      setUnlockresultRequests(resp);
    })
  },[])

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setResultInd(-1);
  };

  const handleViewResult = (item,index) => {
    setSelectedResult(item);
    setResultInd(index);
  };

  const approveResult = (resultId) =>{
    toggleLoading(true);
    approve_result(resultId,adminId).then((resp)=>{
      if(resp){
        setResultRequests(resp);
      }
      toggleLoading(false);
    })
  }
  const declineResult = (resultId) =>{
    toggleLoading(true);
    decline_result(resultId,adminId).then((resp)=>{
      if(resp){
        setResultRequests(resp);
      }

      toggleLoading(false);
    })
  }
  
  const handleViewResult_unlockreq = (resultId, reqid)=>{
    setResultInd(reqid);
    if(resultInd!== reqid){
      toggleLoading(true);
      get_resultById(resultId).then((resp)=>{
        toggleLoading(false);
        if(resp){
          // console.log("unlock requested result",resp)
          setRequestedResult(resp[0])
        }
        else{
          alert("Result not Found!!");
        }
      })
    }
  }

  const approveUnlockResult =(reqId,resultId)=>{
    toggleLoading(true);
    approve_unlock_result(resultId).then((resp)=>{
      // console.log("approveUnlockResult",resp)
      //unlock result --> delete unlock request --> fetch updated unlock requests
      if(resp.status === 201){
        delete_unlock_resultreq(reqId).then((res)=>{
          all_unlock_resultreq(adminId).then((data)=>{
            setUnlockresultRequests(data);
          })
        })
        toggleLoading(false);
        alert(`Approved the unlock request of Result Id- ${resultId} `)
      }
    })
  }

  const declineUnlockResult =(reqId)=>{
    toggleLoading(true);
    delete_unlock_resultreq(reqId).then((res)=>{
      all_unlock_resultreq(adminId).then((data)=>{
        setUnlockresultRequests(data);
      })
    }).finally(()=>{
      toggleLoading(false);
    }) 
  }
  
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
        {/* header */}
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/requestvalidation.png")} alt="StudentLogo" />
            <h1 className="font-bold ">Request Validation</h1>
        </div>
        <div className="shadow-md p-4 mt-2">
          <div className='flex space-x-8'>
            <div>
              <label>
                <input
                  type="radio"
                  value="result"
                  checked={selectedOption === 'result'}
                  onChange={handleOptionChange}
                />
                Result Approvals
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="unlockresult"
                  checked={selectedOption === 'unlockresult'}
                  onChange={handleOptionChange}
                />
                Unlock Result Request
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="none"
                  checked={selectedOption === 'none'}
                  onChange={handleOptionChange}
                />
                None
              </label>
            </div>
          </div>
      </div>
      {selectedOption === 'result' && (
        <div>
          {resultRequests.length>0 && resultRequests.map((item,ind)=>{
            return <div key={ind} className=' bg-slate-100 border-2 rounded-lg m-2 p-2  grid grid-cols-3 gap-4'>
              <p className='font-bold'>Session : <strong className='ml-2 text-zinc-600'>{item.session} </strong></p>
              <p className='font-bold'>Class: <strong className='ml-2 text-zinc-600'> {item.class}</strong></p>
              <p className='font-bold'>Examination: <strong className='ml-2 text-zinc-600'> {item.examType}</strong></p>
              <p className='font-bold'>Created By : <strong className='ml-2 text-zinc-600'>{item.createdBy.name} </strong></p>
              <div>
                <button className='px-2 rounded-lg bg-sky-200 hover:bg-sky-300 text-sm' onClick={() => handleViewResult(item,item._id)}>View Result</button>
              </div>
              {selectedResult && resultInd===item._id && (
                <>
                  <p className='font-bold col-span-3'>Total Marks for Each Subject : <strong className='ml-2 text-zinc-600 '>{selectedResult.totalSubjectMarks} </strong></p>
                  <ViewResult selectedResult={selectedResult} studentsData={studentsData}/>
                </>
              )}
              {resultInd===item._id && 
                <div className='col-span-3 flex justify-end'>
                  <button className='px-2 py-1 bg-red-400 hover:bg-red-500 rounded-lg mr-4' onClick={()=>declineResult(item._id)}>Decline</button>
                  <button className='px-2 py-1 bg-green-400 hover:bg-green-500 rounded-lg' onClick={()=>approveResult(item._id)}>Approve</button>
                </div>
              }
            </div>
          })}
        </div>
      )}

      {selectedOption === 'unlockresult' && (
        <div>
        {unlockresultRequests.length>0 && unlockresultRequests.map((item,ind)=>(
          <div key={ind} className=' bg-slate-100 border-2 rounded-lg m-2 p-2'>
            <p>Result Created on : {new Date(item.date_created).toLocaleDateString('en-GB', {hour: '2-digit',minute: '2-digit',second: '2-digit',hour12: true })}</p>
            <p>Created By : {item.createdBy.name}</p>
            <div>
              <button className='px-2 rounded-lg bg-sky-200 hover:bg-sky-300 text-sm' onClick={() => handleViewResult_unlockreq(item.resultId, item._id)}>View Result</button>
            </div>
            {reqestedResult && resultInd===item._id && (
              <>
                <div className=' bg-slate-100 border-2 rounded-lg m-2 p-2  grid grid-cols-3 gap-4'>
                  <p className='font-bold'>Session : <strong className='ml-2 text-zinc-600'>{reqestedResult.session}</strong> </p>
                  <p className='font-bold'>Class: <strong className='ml-2 text-zinc-600'>{reqestedResult.class}</strong></p>
                  <p className='font-bold'>Examination:<strong className='ml-2 text-zinc-600'>{reqestedResult.examType}</strong> </p>
                  <p className='font-bold'>Total Marks for Each Subject : <strong className='ml-2 text-zinc-600'>{reqestedResult.totalSubjectMarks} </strong></p>
                </div>
                <ViewResult selectedResult={reqestedResult} studentsData={studentsData}/>
              </>
            )}
            {resultInd===item._id && 
              <div className='mt-2 col-span-3 flex justify-end'>
                <button className='px-2 py-1 bg-red-400 hover:bg-red-500 rounded-lg mr-4' onClick={()=>declineUnlockResult(item._id)}>Decline</button>
                <button className='px-2 py-1 bg-green-400 hover:bg-green-500 rounded-lg' onClick={()=>approveUnlockResult(item._id,item.resultId)}>Approve</button>
              </div>
            }
          </div>
        ))}

        </div>
      )}
    </div>
  )
}

export default ResquestValidation