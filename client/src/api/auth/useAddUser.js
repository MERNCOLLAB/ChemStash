import {useState} from 'react'

const useAddUser = () => {
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState(null);
  

    const addUser = async(signUpData) =>{
        try{
            setLoading(true);
            const res = await fetch(`/api/auth/signup`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(signUpData)
            });
            if(!res.ok){
                setToastMessage('Failed to add user');
                setToastType('error');
                return;
            }

            const data = await res.json();
            if (data.success === false) {
              setError(true);
              return;
            }
            setToastMessage('Chemstack user has been added');
            setToastType('success');
        }
        catch(error){
          setError(true);
          setToastMessage('Something went wrong');
          setToastType('error');
        }finally{
          setLoading(false);
        }
    };
    const clearToast = () =>{
        setToastMessage(null);
        setToastType(null);
      }

    return {loading, error, addUser, toastMessage, toastType, clearToast}
}

export default useAddUser;
