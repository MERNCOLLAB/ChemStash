import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/user/userSlice';

const useUpdateProfile = () => {
    const [updateSuccess, setUpdateSucess] = useState(false);
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
              dispatch(updateUserFailure(data));
              return;
            }
      
            dispatch(updateUserSuccess(data));
            setUpdateSucess(true);
          } catch (error) {
            dispatch(updateUserFailure(error));
          }
    };
    return {updateProfile, updateSuccess}
}

export default useUpdateProfile;
