import { Input, Button, FormSubHeader, FormContainer } from "../components";
import useHandleProfile from '../hooks/profile/useHandleProfile';
import ToastProvider from "../configs/ToastProvider";

const ProfileDrawer = ({
    onUpdate, 
    onDelete, 
    currentUser , 
    handleDrawerClose,
    toastMessage,
    toastType,
    clearToast
    }) => {
  const { imagePercent, imageError, formData, handleDataChange, fileRef, handleChangeImage } = useHandleProfile();
  const currentUserId = currentUser._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(formData, currentUserId);
  };

  const handleDeleteAccount = async () => {
    await onDelete(currentUserId);
  };
const profileInfoRow = (
    <>
        <Input
          label="Email"
          id="email"
          type="email"
          defaultValue={currentUser.email}
          onChange={handleDataChange}
        />
        <Input
          label="Username"
          id="username"
          type="text"
          defaultValue={currentUser.username}
          onChange={handleDataChange}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          defaultValue={currentUser.password}
          onChange={handleDataChange}
        />
    </>
)

return (
<form onSubmit={handleSubmit}  className="p-7 min-w-fit min-h-full bg-white0">
<ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast}/>
    <h1 className="text-md font-semibold">Update Profile</h1>
    <div className="flex justify-end mt-5">
        <Button onClick={handleDeleteAccount} type="button" variant="danger">Delete Account</Button>
    </div>
    <hr className="bg-gray1 my-5"/>
    <FormSubHeader title="Edit Your Profile" subtitle="Your Account Information"/>
    <div className="flex justify-start gap-12 items-center mb-5">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleChangeImage} />
        <div onClick={() => fileRef.current.click()} className="group relative">
            <img
            className="size-[102px] group-hover:opacity-20 self-center cursor-pointer rounded-full object-cover"
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            />
            <p className="opacity-0 group-hover:opacity-100 cursor-pointer absolute bottom-10 left-5">
            Change
            </p>
        </div>
        <div>
            <p className="text-center text-sm">
                {imageError ? (
                <span className="text-red-700">Error uploading image (file size must be less than 2MB)</span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                <span>{`Uploading ${imagePercent}%`}</span>
                ) : imagePercent === 100 ? (
                <span className="text-emerald-700"> Image uploaded successfully</span>
                ) : (
                ''
                )}
            </p>
        </div>
    </div>
    <div className="mt-5">
      <FormContainer gridColsClass="grid-cols-3">{profileInfoRow}</FormContainer>
    </div>
    <hr className="bg-gray1 my-5" />
    <div className="flex justify-end mt-4 gap-2.5 p-2.5">       
            <Button type="button" variant="secondary" onClick={handleDrawerClose}>
            Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={imagePercent > 0 && imagePercent < 100}>
            Update
            </Button>
        </div>
    </form>
  )
}

export default ProfileDrawer;
