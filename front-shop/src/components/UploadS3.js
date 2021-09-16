import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import dotenv from 'dotenv'
dotenv.config()



const S3_BUCKET =required("REACT_APP_BUCKET_NAME");
const REGION =required("REACT_APP_REGION");
const ACCESS_KEY =required("REACT_APP_ACCESS_KEY");
const SECRET_ACCESS_KEY =required("REACT_APP_ACCESS_SECRET_KEY");


function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    if(value == null) {
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }
    
    return <div>
    
    <img src="https://hanbucket-test.s3.ap-northeast-2.amazonaws.com/nginx.png"></img>

        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>

    </div>
}

export default UploadS3;