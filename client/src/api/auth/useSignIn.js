import {useState} from 'react';
import { signInStart, signInFailure, signInSuccess } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useSignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState(null);

    const signIn = async (signInData) => {
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(signInData)
            
            });
            if(!res.ok){
                dispatch(signInFailure());
                setToastMessage('Failed to sign in');
                setToastType('error');
                return;
            }

            const data = await res.json();
      
            if (data.success === false) {
              dispatch(signInFailure(data));
              return;
            }
            dispatch(signInSuccess(data));
            if (data.role) {
              navigate(`/${data.role}/inventory`);
            } 

            setToastMessage('Logged In. Welcome to ChemStash');
            setToastType('success');
    
          } catch (error) {
            dispatch(signInFailure(error));
          }
    }

    const clearToast = () =>{
        setToastMessage(null);
        setToastType(null);
      }

    return { signIn, toastMessage, toastType, clearToast}
}

export default useSignIn;
