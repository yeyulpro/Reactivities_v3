import { Box, Button, Grid2, Typography } from "@mui/material";
import { useCallback,  useRef,  useState } from "react";
import { useDropzone } from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Cropper, { type ReactCropperElement }  from "react-cropper";
import "cropperjs/dist/cropper.css";
type Props={
  uploadPhoto:(file:Blob)=>void
  loading: boolean
}
export default function PhotoUploadWidget({uploadPhoto,loading}:Props) {
  const [ files, setFiles] =useState<object &{preview:string;}[]>([]);

  // const Demo: React.FC = () => {
    const cropperRef = useRef<ReactCropperElement>(null);
  //   const onCrop = () => {
  //     const cropper = cropperRef.current?.cropper;
  //     // console.log(cropper.getCroppedCanvas().toDataURL());
  //   };


    const onDrop = useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map(file=>Object.assign(file,{
        preview:URL.createObjectURL(file as Blob)
      })))
      // Do something with the files
    }, []);

    const onCrop = useCallback(()=>{
      const cropper = cropperRef.current?.cropper;
      cropper?.getCroppedCanvas().toBlob(blob=>{
        uploadPhoto(blob as Blob)
      })

    },[uploadPhoto])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
      <Grid2 container spacing={2}>
        
        <Grid2 size={4}>
          <Typography variant="overline" color="secondary">
            Step 1 - Add photo
          </Typography>
          <Box {...getRootProps()} sx={{ border: 'dashed 3px #eee', borderColor: isDragActive ? 'green' : '#eee', borderRadius: '5px', paddingTop: '30px', textAlign: 'center', height: '280px' }}>
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 80 }} />
            <Typography variant="h5">Drop image here</Typography>

          </Box>
        </Grid2>

        <Grid2 size={4}>
          <Typography variant="overline" color="secondary">
            Step 2 - Resize photo
          </Typography>
          {files[0]?.preview &&
           <Cropper
            src={files[0]?.preview}
            style={{ height: 300, width: "90%" }}
            // Cropper.js options
            initialAspectRatio={1}
            aspectRatio={1}
            preview='.img-preview'
            guides={false}
            crop={onCrop}
            ref={cropperRef}
          />
          }
         
        </Grid2>


        <Grid2 size={4}>
          {files[0]?.preview &&(
            <>
            <Typography variant="overline" color="secondary">Step 3 - Preview & Upload photo</Typography>
            <div className="img-preview" style={{width:300, height:300, overflow:'hidden'}}/>
            <Button sx={{mt:2}} onClick={onCrop} variant="contained" color='secondary' disabled={loading}>
                Upload
            </Button>
         
            </>
          )}
         
        </Grid2>
      </Grid2>
    );
  }
