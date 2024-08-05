import { useSelector } from 'react-redux';
import { Button, Input } from '../components';
import useUpdateProfile from '../api/profile/useUpdateProfile';
import useDeleteProfile from '../api/profile/useDeleteProfile';
import useSignOut from '../api/auth/useSignOut';
import useHandleProfile from '../hooks/profile/useHandleProfile';

function Profile() {
  const {fileRef, imagePercent, imageError, formData, handleDataChange, handleChangeImage} = useHandleProfile();
  const {updateProfile, updateSuccess} = useUpdateProfile();
  const {deleteProfile} = useDeleteProfile();
  const {signOut} = useSignOut();

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const currentUserId = currentUser._id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData, currentUserId);
  };

  const handleDeleteAccount = async () => {
    await deleteProfile(currentUserId);
  };

  const handleSignout = () => {
    signOut();
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Profile</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleChangeImage} />
        <div onClick={() => fileRef.current.click()} className="group relative mx-auto">
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
            <span className="text-red-700">Error uploading image (file size must be less than 2MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span>{`Uploading ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-emerald-700"> Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>

        <Input
          id="username"
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleDataChange}
        />

        <Input 
          id="email" 
          type="email" 
          placeholder="Email" 
          defaultValue={currentUser.email} 
          onChange={handleDataChange} 
        />

        <Input
          id="password"
          type="password"
          placeholder="Password"
          defaultValue={currentUser.password}
          onChange={handleDataChange}
        />

        <Button variant="primary" loading={loading}>
          {loading ? 'Loading' : 'Update'}
        </Button>
      </form>
      <div className="flex justify-between items-center mt-4 text-sm">
        <span onClick={handleDeleteAccount} className="p-2 text-red-700 cursor-pointer border border-red-700">
          Delete Account
        </span>
        <span onClick={handleSignout} className="p-2 text-red-700 cursor-pointer border border-red-700">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-4">{error.success && 'Something went wrong'}</p>
      <p className="text-emerald-700 mt-4">{updateSuccess && 'User is updated successfully'}</p>
    </div>
  );
}

export default Profile;
