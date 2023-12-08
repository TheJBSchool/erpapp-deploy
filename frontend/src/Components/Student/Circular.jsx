import React, {useState} from 'react';
import { bgcolor2 } from "../Home/custom.js";

const Circular = ({circular}) => {
  const [selectedCircular, setSelectedCircular] = useState();
  const [selectedDiv, setSelectedDiv]= useState();
  const sortedCirculars = circular?.sort((a, b) => {
    const dateA = new Date(a.date_started).getTime();
    const dateB = new Date(b.date_started).getTime(); 
    return dateB - dateA;
  });

  const showCircular =(c,ind)=>{
    setSelectedCircular(c);
    setSelectedDiv(ind);
  }

  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
        {/* header */}
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/circular.png")} alt="StudentLogo" />
            <h1 className="font-bold ">Circular</h1>
        </div>

        <div style={bgcolor2} className="border-2 mt-5 border-red-300 rounded-lg p-4 flex">
          <div className='mt-5 rounded-lg w-2/4 p-4 mr-2  '>
            {sortedCirculars && sortedCirculars.map((circular, index) => (
              <div key={index} className={` rounded-lg p-4 mb-4 bg-slate-100 hover:bg-slate-300 cursor-pointer ${selectedDiv===index? 'bg-slate-300':''}`}  onClick={()=>showCircular(circular,index)} >
                <h3 className='font-bold box-shadow rounded'>{circular.title}</h3>
                <p className='bg-slate-100 rounded text-[11px] w-fit px-1'>{new Date(circular.date_started).toLocaleDateString('en-GB')}</p>
                
              </div>  
            ))}
          </div>
          <div className={` mt-5 rounded-lg w-full p-4 ${selectedCircular? 'shadow-md':''}`}>
            {selectedCircular && (
              <>

              <h1 className='text-xl font-extrabold'>{selectedCircular.title}</h1>
              <hr className='bg-black h-[2px] mb-2' />
              <div dangerouslySetInnerHTML={{ __html: selectedCircular.description }} />
              </>
            )}
          </div>
        </div>
      </div>

  )
}

export default Circular;