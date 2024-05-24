import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div
          onClick={() => fileRef.current.click()}
          className="group relative mx-auto"
        >
          <img
            className="h-24 w-24 group-hover:opacity-20 self-center cursor-pointer rounded-full object-cover"
            src={currentUser.profilePicture}
            alt="profile"
          />
          <p className="opacity-0 group-hover:opacity-100 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Change
          </p>
        </div>
        <p className="text-center text-sm">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span>{`Uploading ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-emerald-700">
              {" "}
              Image uploaded successfully
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          className="bg-slate-900 p-3 border"
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <input
          className="bg-slate-900 p-3 border"
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <input
          className="bg-slate-900 p-3 border"
          type="password"
          placeholder="Password"
          id="password"
        />

        <button
          disabled={loading}
          className="bg-slate-700 p-3 uppercase hover:opacity-60 border"
        >
          {loading ? "Loading" : "Update"}
        </button>
      </form>
      <div className="flex justify-between items-center mt-4 text-sm">
        <span className="p-2 text-red-700 cursor-pointer border border-red-700">
          Delete Account
        </span>
        <span className="p-2 text-red-700 cursor-pointer border border-red-700">
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
