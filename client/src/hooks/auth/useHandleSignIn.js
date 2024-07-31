import { useState } from "react";

const useHandleSignIn = (signIn) => {
    const [signInData, setSignInData] = useState({});

    const handleChange = (e) => {
        setSignInData({ ...signInData, [e.target.id]: e.target.value });
      };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signIn(signInData);
    };

    return {signInData, handleChange, handleSubmit};
}

export default useHandleSignIn;
