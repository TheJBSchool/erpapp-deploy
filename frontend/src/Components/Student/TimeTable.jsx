import React, { useEffect, useState } from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { getTimetableByClass, saveTimetable } from '../../controllers/loginRoutes.js';
import CircularProgress from '@mui/material/CircularProgress';

const TimeTable = ({stu_class, stu_section}) => {
  const [class_timeTable, setClass_timeTable]= useState();
  useEffect(()=>{
    getTimetableByClass(stu_class+stu_section).then((resp)=>{
      setClass_timeTable(resp);
    })
  },[])
  console.log("class_timeTable",class_timeTable)

  const classNames = [
    'Pre-Nursery', 'Nursery', 'LKG', 'UKG',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
  ];
  return (
    <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
        {/* header */}
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
            <img className="w-9 h-9 mr-2 " src={require("../../img/schoolfee.png")} alt="StudentLogo" />
            <h1 className="font-bold ">TimeTable</h1>
        </div>

        { class_timeTable &&  <div style={bgcolor2} className="border-2 mt-5 border-red-300 rounded-lg p-10 flex justify-center ">
            <div className="table-container " style={{ overflowX: 'auto' }}>
              <table className="table-auto min-w-max bg-white">
                <thead>
                  <tr className='bg-slate-300'>
                    <th className="border px-4 py-2">Time</th>
                      <th className="border px-4 py-2">Monday</th>
                      <th className="border px-4 py-2">Tuesday</th>
                      <th className="border px-4 py-2">Wednesday</th>
                      <th className="border px-4 py-2">Thursday</th>
                      <th className="border px-4 py-2">Friday</th>
                      <th className="border px-4 py-2">Saturday</th>
                  </tr>
                </thead>
                <tbody>
                  {class_timeTable && class_timeTable.map((row, rowIndex) => (
                    <tr key={rowIndex} >
                      <td className="border-b px-4 py-4 flex ">
                        <p className="w-full mx-1 bg-transparent">{row[0].startTime} to {row[0].endTime}</p>
                      </td>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border px-4 py-2 text-sm text-center">
                          {cell.type=== "Period"? (
                            <>
                              <p className='font-semibold text-blue-400'> {cell.subject}</p>
                              <p> {cell.teacher}</p>
                            </>

                          ):(
                            <p className='text-red-400'>{cell.type}</p>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              
              </div>
        </div>
        }
        { !class_timeTable&&
          <div className='flex justify-center p-10'>
            <CircularProgress />
          </div>
        }

    </div>
  )
}

export default TimeTable