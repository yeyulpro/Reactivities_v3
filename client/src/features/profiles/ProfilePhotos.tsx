import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";
import { useState } from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget";




export default function ProfilePhotos() {
  const { id } = useParams();
  const { photos, LoadingPhotos, isCurrentUser , uploadPhoto} = useProfile(id);
  const [editMode, setEditMode] = useState(false);
  const handlePhotoUpload = (file:Blob)=>{
    uploadPhoto.mutate(file,{
      onSuccess:()=>{
        setEditMode(false);
      }
    })
  }

  if (LoadingPhotos) return <Typography>Loading...</Typography>;
  if (!photos )
    return <Typography>No photo is found for the User.</Typography>;
  // URL을 HTTPS로 교체하고, Cloudinary 변환 옵션 삽입

  return (
    <Box>
      {isCurrentUser && (
        <Box>
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancel" : "Add Photo"}
          </Button>
        </Box>
      )}
      {editMode ? (
        <PhotoUploadWidget  uploadPhoto={handlePhotoUpload} loading={uploadPhoto.isPending}/>
      ) : (
        <ImageList sx={{ width: 500, height: 550 }} cols={3} rowHeight={164}>
              {photos.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    srcSet={`${item.url
                      .replace("http://", "https://")
                      .replace(
                        "/upload/",
                        "/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/"
                      )}`}
                    src={`${item.url
                      .replace("http://", "https://")
                      .replace("/upload/", "/upload/w_164,h_164,c_fill,f_auto/")}`}
                    alt={"user photos"}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
        </ImageList>
       
      )}
    </Box>
  );
}
