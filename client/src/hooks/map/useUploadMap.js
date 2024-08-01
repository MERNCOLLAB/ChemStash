import { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../../firebase";
import useViewMap from "../../api/map/useViewMap";
import useUpdateMap from "../../api/map/useUpdateMap";

const useUploadMap = () => {
    const {map, viewMap} = useViewMap();
    const {updateMap} = useUpdateMap();

    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [uploadedImageURL, setUploadedImageURL] = useState('');
    const [formData, setFormData] = useState({ mapImgUrl: '' });

    
    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImagePercent(Math.round(progress));
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadedImageURL(downloadURL);
            });
        }
        );
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setUploadedImageURL(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMap(formData);
    viewMap();
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  useEffect(() => {
    if (uploadedImageURL) {
      setFormData({ mapImgUrl: uploadedImageURL });
    }
  }, [uploadedImageURL]);

  useEffect(() => {
    viewMap();
  }, [map]);

  return {
    imagePercent,
    map,
    uploadedImageURL,
    handleFileUpload, 
    handleChange, 
    handleSubmit, 
}

}

export default useUploadMap;
