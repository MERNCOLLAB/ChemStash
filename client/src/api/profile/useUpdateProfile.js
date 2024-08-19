import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/user/userSlice';

const useUpdateProfile = () => {
    // const [updateSuccess, setUpdateSucess] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState(null);  
    const dispatch = useDispatch();
    const updateProfile = async (formData,currentUserId) => {
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUserId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },      
              body: JSON.stringify(formData),
            });
      
            const data = await res.json();
            if (data.success === false) {
              setToastMessage('Failed to update profile');
              setToastType('error');
              dispatch(updateUserFailure(data));
              return;
            }
      
            dispatch(updateUserSuccess(data));
            setToastMessage('Profile has been successfully updated')
            setToastType('success');
          } catch (error) {
            dispatch(updateUserFailure(error));
          }
    };

    const clearToast = () =>{
      setToastMessage(null);
      setToastType(null);
    }

    return {updateProfile, toastType, toastMessage, clearToast}
}

export default useUpdateProfile;
