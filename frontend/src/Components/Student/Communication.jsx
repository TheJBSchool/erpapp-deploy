import React, {useState} from 'react';
import { bgcolor2 } from "../Home/custom.js";

const Communication = () => {
    const [tempNote, setTempNote] = useState('');
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
        {/* header */}
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/comments.png")} alt="StudentLogo" />
            <h1 className="font-bold ">Communication</h1>
        </div>

        <div className='main'>
            <div className="p-2 flex">

          <div className='mt-5 rounded-lg w-2/4 p-4 mr-2  '>
            <p className='text-center text-gray-600 font-extrabold mb-4 -mt-6'>Recent Chat</p>
            {/* recent circular  sort by recent date*/}
            {/* {sortedCirculars && sortedCirculars.map((circular, index) => ( */}
              <div className=' rounded-lg p-4 mb-4 bg-slate-100'>
                <h3 className='font-bold box-shadow rounded'>{'Mr Khan'}</h3>
                <p className='bg-slate-100 rounded text-[11px]'>{'Subject- Maths'}</p>
                <div className='flex w-full justify-end'>
                </div>
              </div>
            {/* ))} */}
          </div>

          <div style={bgcolor2}  className=' mt-5 rounded-lg w-full p-4 '>
            {/* create new circular */}
            {/* {createCircularBtn ? ( */}
              <div>
                <div className='mb-6'>
                  <label htmlFor="subject" className=" mb-1 ml-1 block font-bold text-gray-600 ">Subject <span className="text-red-500">*</span> </label>
                  <input type="text" id="subject" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="subject" 
                //   value={communication.subject} onChange={handleNewCircular} 
                  required />
                </div>

                <div className='mb-6'>
                  <label htmlFor="description" className=" mb-1 ml-1 block font-bold text-gray-600 ">Desciption <span className="text-red-500">*</span> </label>
                  {/* <textarea type="text" id="description" className="h-[200px] w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="description" value={communication.description} onChange={handleNewCircular} required /> */}
                    <textarea type="text" id="description" className="h-[200px] w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="description" 
                    // value={communication.description} onChange={handleNewCircular} 
                    required />    
                    
                </div>
                <div className='flex justify-end'>
                  <button className="bg-green-300 hover:bg-green-400  text-black font-bold py-2 px-2 rounded mt-6" >Send</button>
                </div>

              </div>
            {/* ): ( */}
              <>

              {/* <button className="bg-green-300 hover:bg-green-400  text-black font-bold py-2 px-2 rounded " >New</button> */}
              {tempNote && <p className='text-red-500'>*{tempNote}</p>}
              </>
            {/* ) } */}
            
            
            
          </div>


        </div>
        </div>

    </div>
  )
}

export default Communication