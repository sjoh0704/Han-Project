import React , {useEffect, useState} from 'react';
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
};

export const S3Config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
};
export const UploadS3 = async(files) => {
    if(!files){
        return;
    }
    console.log(files);
    files.forEach(file => {
        uploadFile(file, S3Config)
        .then(data => console.log(data))
        .catch(err => console.error(err))
    });
       
};

