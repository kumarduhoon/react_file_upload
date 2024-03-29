import React, { useState, useRef } from 'react'
import "./FileUpload.css"
import { FaFileUpload } from "react-icons/fa";
// import { LinearProgress } from '@mui/material';

function FileUpload() {
    const [file, setfile] = useState([])
    const [progress, setProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const handleClickref = useRef()
    function handleClick() {
        handleClickref.current.click()
    }

    function uploadFile(event) {
        const file = event.target.files[0]
        if (!file) return
        const fileName = file.name.length > 12 ? `${file.name.substring(0, 13)}...${file.name.split(".")[1]}` : file.name
        const fd = new FormData()
        fd.append("file", file)
        setfile((prev) => ([...prev, { name: fileName, loading: 0 }]))

        // axios.post("url", fd,
        //     {
        //         onUploadProgress: (progressEvent) => {
        //             const progress = (progressEvent.loaded / progressEvent.total) * 50;
        //             setProgress(progress);
        //         }
        //     },
        // )
        setIsSuccess(true)
    }
    console.log(file)
    return (
        <>
            <div className='outer-container'>
                <form>
                    <input
                        type='file'
                        name='file'
                        hidden
                        ref={handleClickref}
                        onChange={uploadFile}
                    />
                    <div onClick={handleClick}>
                        <FaFileUpload
                            className='icon-color'
                        />
                    </div>
                    <p className='text-class'>Browse file for upload</p>
                </form>
            </div>
            <div>{file.map((item, index) => {
                return (
                    <div key={index}>
                        <p>{item.fileName}</p>
                        <span>{progress}</span>
                    </div>
                )
            })}</div>


        </>
    )
}

export default FileUpload