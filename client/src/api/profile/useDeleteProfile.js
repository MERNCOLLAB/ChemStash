import { deleteUserStart, deleteUserFailure, deleteUserSuccess } from "../../redux/user/userSlice";
import { useDispatch } from 'react-redux';

const useDeleteProfile = () => {
    const dispatch = useDispatch();
    const deleteProfile = async (currentUserId) => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUserId}`, {
              method: 'DELETE',
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

    return {deleteProfile};
}

export default useDeleteProfile;
