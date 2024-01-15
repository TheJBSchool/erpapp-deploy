import React, {useState, useContext, useEffect} from 'react';
import { bgcolor2 } from "../Home/custom.js";
import { createNewCircular, all_circulars,editCircular, deleteCircular} from '../../controllers/loginRoutes.js';
import { LoadingContext } from '../../App.js';
import Multiselect from 'multiselect-react-dropdown';
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'



const Circular = ({adminId}) => {
  const initialNewCircular = {
    target: [],
    title: '',
    description: '',
    date_started: new Date(),
    date_modified: '',
  }
  const { isLoading, toggleLoading } = useContext(LoadingContext);
  const [isEdit, setIsEdit] = useState(false);
  const [createCircularBtn, setCreateCircularBtn] = useState(false);
  const [tempNote, setTempNote] = useState('');
  const [allCirculars, setAllCirculars] = useState();
  const [newCircular, setNewCircular] = useState(initialNewCircular)
  const classes = [
    'All', 'Pre-School', 'Primary-School', 'Secondary-School',
    'Pre-Nursery', 'Nursery', 'LKG', 'UKG',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
  ];

  useEffect(()=>{
    all_circulars(adminId).then((resp) => {
      setAllCirculars(resp.circulars);
    })
  },[createCircularBtn])
  const sortedCirculars = allCirculars?.sort((a, b) => {
    const dateA = new Date(a.date_started).getTime();
    const dateB = new Date(b.date_started).getTime(); 
    return dateB - dateA;
  });

  const handleNew = ()=>{
    setCreateCircularBtn(true);
  }
  const handleNewCircular = (e,type)=>{
    if(type=== 'description'){
      setNewCircular((prevData) => ({
        ...prevData,
        ['description']: e,
      }));
    }
    else{
      const { name, value } = e.target;
        setNewCircular((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }
    
  }
  const handlePost = (e)=>{
    if(newCircular.target && newCircular.title && newCircular.description){
      toggleLoading(true);
      if(isEdit){
        editCircular(newCircular._id,adminId, {underBy:adminId, ...newCircular}).then((resp)=>{
            if (resp.status !== 201) {
              setTempNote("Can't Edit the Circular");
            } 
            toggleLoading(false);
            setAllCirculars(resp.circulars);
          }).catch((error) => {
              console.error("Error:", error);
              setTempNote("Unable to Edit, Try Again");
              toggleLoading(false);
          })
          .finally(() => {
            // alert('Successfully Created');  
            setTempNote("");
            toggleLoading(false);
            setCreateCircularBtn(false);
          });
      } else{
        createNewCircular({underBy:adminId, ...newCircular}).then((resp)=>{
          if (resp.status !== 201) {
            setTempNote("Can't Create the Circular");
          } 
          toggleLoading(false);
          setNewCircular(initialNewCircular)
        }).catch((error) => {
            console.error("Error:", error);
            setTempNote("Unable to Create, Try Again");
            toggleLoading(false);
        })
        .finally(() => {
          // alert('Successfully Created');  
          setTempNote("");
          toggleLoading(false);
          setCreateCircularBtn(false);
        });
      }
    }
  }
  const handleEdit = (c)=>{
      // console.log("edit",c)
      setCreateCircularBtn(true);
      setNewCircular(c);
      setNewCircular((prevData) => ({
        ...prevData,
        ['date_modified']: new Date(),
      }));
      setIsEdit(true);
  }

  const handleDelete = (id)=>{
    let confirmation = window.confirm(`Are you sure you want to delete this circular?`);
    if (confirmation){
      deleteCircular(id,adminId).then((resp)=>{
        toggleLoading(false);
        setAllCirculars(resp.circulars);
      }).catch((error) => {
            console.error("Error:", error);
            setTempNote("Unable to Delete, Try Again");
            toggleLoading(false);
        })
        .finally(() => {
          alert('Successfully Deleted');  
          setTempNote("");
          toggleLoading(false);
        });
    }
  }
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };
   var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];
  return (
     <div style={bgcolor2} className="border-2  border-red-300 rounded-lg p-10 h-full">
        <div className="border-2  border-red-300 rounded-lg p-2 flex items-center">
          <img className="w-12 h-9 mr-2 " src={require("../../img/circular.png")} alt="StudentLogo" />
          <h1 className="font-bold ">Circular</h1>
        </div>

        <div className="p-2 flex">

          <div className='mt-5 rounded-lg w-2/4 p-4 mr-2  '>
            <p className='text-center text-gray-600 font-extrabold mb-4 -mt-6'>Recent Cicular Post</p>
            {/* recent circular  sort by recent date*/}
            {sortedCirculars && sortedCirculars.map((circular, index) => (
              <div key={index} className=' rounded-lg p-4 mb-4 bg-slate-100'>
                <h3 className='font-bold box-shadow rounded'>{circular.title}</h3>
                <p className='bg-slate-100 rounded text-[11px]'>{new Date(circular.date_started).toLocaleDateString('en-GB')}</p>
                <div className='flex w-full justify-end'>

                  <div className='px-1 flex  '>
                    <button
                      className="bg-gray-300 hover:bg-green-400 text-sm text-black font-bold py-2 px-4 rounded mr-2 h-fit"
                      onClick={() => handleEdit(circular)}
                    >
                      <img className='w-4 h4 text-black' src={require('../../img/edit-text.png')} alt="buttonpng" />
                    </button>
                    <button
                      onClick={() => handleDelete(circular._id)}
                      className="bg-gray-300 hover:bg-red-400 text-sm text-black font-bold py-2 px-4 rounded h-fit"
                    >
                      <img className='w-4 h4 text-black' src={require('../../img/delete.png')} alt="buttonpng" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={bgcolor2}  className=' mt-5 rounded-lg w-full p-4 '>
            {/* create new circular */}
            {createCircularBtn ? (
              <div>
                <div className='mb-6'>
                  <label htmlFor="title" className=" mb-1 ml-1 block font-bold text-gray-600 ">Title <span className="text-red-500">*</span> </label>
                  <input type="text" id="title" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="title" value={newCircular.title} onChange={handleNewCircular} required />
                </div>

                <div className='mb-6'>
                  <label htmlFor="target" className=" mb-1 ml-1 block font-bold text-gray-600 ">Set Target <span className="text-red-500">*</span> </label>
                  <Multiselect  name="target" id="target" selectedValues={newCircular.target} className="bg-white w-full border rounded-md focus:outline-none  focus:border-red-200" isObject={false} options={classes} onSelect={(e) => { newCircular.target = e }} onRemove={(e) => { newCircular.target = e }} showCheckbox showArrow />
                </div>


                <div className='mb-6'>
                  <label htmlFor="description" className=" mb-1 ml-1 block font-bold text-gray-600 ">Desciption <span className="text-red-500">*</span> </label>
                  {/* <textarea type="text" id="description" className="h-[200px] w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="description" value={newCircular.description} onChange={handleNewCircular} required /> */}

                    <ReactQuill
                      id="description"
                      theme="snow"
                      name="description"
                      value={newCircular.description}
                      modules={modules}
                      formats={formats}
                      placeholder="Write your content ...."
                      onChange={(content) => handleNewCircular(content,"description")}
                      className='bg-white h-72 border-none flex flex-col'
                    >
                    </ReactQuill>
                    
                </div>
                <div className='flex justify-end'>
                  <button className="bg-green-300 hover:bg-green-400  text-black font-bold py-2 px-2 rounded mt-6" onClick={handlePost}>Post</button>
                </div>

              </div>
            ): (
              <>

              <button className="bg-green-300 hover:bg-green-400  text-black font-bold py-2 px-2 rounded " onClick={handleNew}>New</button>
              {tempNote && <p className='text-red-500'>*{tempNote}</p>}
              </>
            ) }
            
            
            
          </div>


        </div>
      </div>
  )
}

export default Circular