import { useSelector } from 'react-redux';
import { ProfileAvatar, Button } from '../components';
import ProfileForm from '../ui/ProfileForm';
import useUpdateProfile from '../api/profile/useUpdateProfile';
import useDeleteProfile from '../api/profile/useDeleteProfile';
import useSignOut from '../api/auth/useSignOut';
import useHandleProfile from '../hooks/profile/useHandleProfile';

function Profile() {
  const { imagePercent, imageError, formData, handleDataChange } = useHandleProfile();
  const { updateProfile, updateSuccess } = useUpdateProfile();
  const { deleteProfile } = useDeleteProfile();
  const { signOut } = useSignOut();

  const { currentUser, error } = useSelector((state) => state.user);
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
    <div className="p-3 max-w-full">
      <h1 className="text-3xl text-left font-bold my-7">ChemStack Profile</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 items-center">
        <ProfileAvatar />
        <ProfileForm handleDataChange={handleDataChange} />
      </form>
      <div className="p-6 flex justify-end items-center gap-2">
        <Button variant="secondary" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
        <Button variant="primary" onClick={handleSignout}>
          SignOut
        </Button>
      </div>

      {/* Error and Success Notifications */}
      <p className="text-red-700 mt-4">{error.success && 'Something went wrong'}</p>
      <p className="text-emerald-700 mt-4">{updateSuccess && 'User is updated successfully'}</p>
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
  );
}

export default Profile;
