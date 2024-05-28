import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";
import { Input } from "../components/Input";
import Button from "../components/Button";

function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSucess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);

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
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSucess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      dispatch(deleteUserSuccess(data));
      if (data.success === false) {
        return;
      }
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignout = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Profile</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
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
            src={formData.profilePicture || currentUser.profilePicture}
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
        
        <Input
          id="username"
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          classStyle="authForm"
        />

        <Input
          id="email"
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          classStyle="authForm"
        />

        <Input
          id="password"
          type="password"
          placeholder="Password"
          defaultValue={currentUser.password}
          onChange={handleChange}
          classStyle="authForm"
        />
        

        <Button loading={loading}>{loading ? "Loading" : "Update"}</Button>
      </form>
      <div className="flex justify-between items-center mt-4 text-sm">
        <span
          onClick={handleDeleteAccount}
          className="p-2 text-red-700 cursor-pointer border border-red-700"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignout}
          className="p-2 text-red-700 cursor-pointer border border-red-700"
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-4">
        {error.success && "Something went wrong"}
      </p>
      <p className="text-emerald-700 mt-4">
        {updateSuccess && "User is updated successfully"}
      </p>
    </div>
  );
}

export default Profile;
