import { useState, useEffect, useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

function Map() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [uploadedImageURL, setUploadedImageURL] = useState('');
  const [formData, setFormData] = useState({ mapImgUrl: '' });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState([]);

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
  }, []);

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
      (error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadedImageURL(downloadURL);
          console.log('Uploaded image URL:', downloadURL);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/map/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update map image');
      }

      setUpdateSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const viewMap = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/map/viewmap', {
        method: 'GET',
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch map data');
      }
      setMap(data);
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to fetch map data');
    }
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setUploadedImageURL(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold my-7">Map</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleChange} />
        <div
          onClick={() => fileRef.current.click()}
          className="group relative mx-auto w-full rounded-full cursor-pointer"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img className=" w-full " src={uploadedImageURL || map[0]} alt="Map" />{' '}
          <p className="opacity-0 group-hover:opacity-100 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded">
            Change
          </p>
        </div>
        <p className="text-center text-sm mt-4">
          {imageError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span>{`Uploading ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-emerald-700">Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>

      {error && <p className="text-rose-700 mt-4">Error</p>}
      {loading && <p className="text-emerald-700 mt-4">Loading</p>}
      {updateSuccess && <p className="text-emerald-700 mt-4">Map is updated successfully</p>}
    </div>
  );
}

export default Map;
