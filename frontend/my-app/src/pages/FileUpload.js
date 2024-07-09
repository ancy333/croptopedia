// DataEntry.js
import React, { useState } from 'react';
//import { useState } from 'react';
import  {storage} from '../firebase';
import {ref, uploadBytes} from 'firebase/storage';
import '../components/FileUpload.css'
//import {v4} from 'uuid'


function FileUpload() {
  const[fileupload, setfileupload] = useState(null);
  const upload = () => {
    if(fileupload == null) return;
    const fileref = ref(storage, `files/${fileupload.name}`)
    uploadBytes(fileref,fileupload).then(()=>{
      alert("file uploaded");

    });

  };
  return (
    <div>
      <div>
        <h2 className='text2'> SMART AGRICULTURE </h2>
        <p className='text1'>If you do not have a CSV dataset..Move on to the Charts page to view plots on existing data</p>
        <p className='text2'>If you have a dataset..upload it below</p>
      </div>
    <div className='file-upload-container'>
      <input type = 'file' onChange={(event)=>{setfileupload(event.target.files[0])}}/>

      <button onClick={upload}>Upload</button> 
    </div>
    </div>
  )
}

export default FileUpload
// // // DataEntry.js


