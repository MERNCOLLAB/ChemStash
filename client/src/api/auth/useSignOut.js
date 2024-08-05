import { useDispatch } from "react-redux";
import { signOut as logout } from "../../redux/user/userSlice";

const useSignOut = () => {
    const dispatch = useDispatch();
    const signOut = async () => {
        try {
            await fetch('/api/auth/signout');
            dispatch(logout());
          } catch (error) {
            console.error(error);
          }
    };
    return {signOut};
}

export default useSignOut;
