import { ImageList, ImageListItem, Typography } from "@mui/material";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";
import { useState } from "react";

export default function ProfilePhotos() {
  const { id } = useParams();
  const { photos, LoadingPhotos } = useProfile(id);
  const [editMode, setEditMode] = useState(false);

  if (LoadingPhotos) return <Typography>Loading...</Typography>;

  if (!photos || photos.length === 0)
    return <Typography> No photos are found for this user.</Typography>;

  return (
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
  );
}
