import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../components';
import { Drawer, ProfileDrawer  } from '../ui';
import useUpdateProfile from '../api/profile/useUpdateProfile';
import useDeleteProfile from '../api/profile/useDeleteProfile';
import useSignOut from '../api/auth/useSignOut';

function Profile() {
  const { updateProfile, toastType, toastMessage, clearToast } = useUpdateProfile();
  const { deleteProfile } = useDeleteProfile();
  const { currentUser, error } = useSelector((state) => state.user);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const { signOut } = useSignOut();

  const handleDrawerOpen = () => {
    setProfileDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setProfileDrawerOpen(false);
  };
  
  const capitalizeRoleFirstLetter = (role) =>{
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }
  const handleSignout = () => {
    signOut();
  };

  return (
    <div className="p-[30px] max-w-full">
      <h1 className="text-md font-semibold tracking-wide mb-[30px]">Profile</h1>
      <div className="flex flex-col md:flex-row gap-3 items-center"> 
        <img src={currentUser.profilePicture} className="rounded-full size-[102px]"/>
        <div>
          <h1 className="text-lg font-semibold">{currentUser.username}</h1>
          <p className="mt-[3px] text-sm font-light text-gray1">{capitalizeRoleFirstLetter(currentUser.role)}</p>
        </div>
      </div>
      <div className="max-w-[295px] my-[30px] space-y-4">
        <Button onClick={handleDrawerOpen} variant="grayscale" isFull>Edit</Button>
        <Button onClick={handleSignout} variant="danger" isFull>SignOut</Button>
      </div>

      {/* Error and Success Notifications */}
      <p className="text-red-700 mt-4">{error.success && 'Something went wrong'}</p> 

      {/* Drawer */}
      <Drawer isOpen={profileDrawerOpen} onClose={handleDrawerClose}>
        <ProfileDrawer
          onUpdate={updateProfile}
          onDelete={deleteProfile}
          currentUser={currentUser}
         handleDrawerClose={handleDrawerClose}
         toastType={toastType}
         toastMessage={toastMessage}
         clearToast={clearToast}
         />
      </Drawer>    
    </div>
  );
}

export default Profile;

 