import React,{useState} from 'react';
import axios from 'axios';


const TournamentForm=()=>{


const [file,setFile]=useState()
const upload=()=>{
const formData=new FormData()
formData.append('file',file);
axios.post("http://localhost:4000/GroundOwner/upload",formData)
.then(res=>{})
.catch(er=>console.log(er))
}
return (
    <>
    
    <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
    <button type="button" onClick={upload}>Upload</button>
   
    </>
)

}


export default TournamentForm;