import React,{useState} from 'react';
import axios from 'axios';

const TournamentForm = () => {
    const [file, setFile] = useState();

    const upload = () => {
        const formData = new FormData();
        formData.append('file', file);

        console.log("Uploading file:", file); // Log the file being uploaded

        axios.post("http://localhost:4000/GroundOwner/upload", formData)
            .then(res => {
                console.log("Upload successful:", res.data); // Log success message
            })
            .catch(err => {
                console.error("Upload failed:", err); // Log error message
            });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            <input type="file" onChange={handleFileChange} />
            <button 
                className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-6 border border-black hover:border-transparent "

             type="button" onClick={upload}>Upload
             </button>
            
        </>
    );
};

export default TournamentForm;