import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../ui/OAuth';
import { Button, Input, Linker } from '../components';

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));

      data.role === 'manager'
        ? navigate('/manager/inventory')
        : data.role === 'chemist'
          ? navigate('/chemist')
          : navigate('/purchacer');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input id="email" type="email" placeholder="Enter your email" onChange={handleChange} />
        <Input id="password" type="password" placeholder="Enter password" onChange={handleChange} />

        <Button loading={loading}>{loading ? 'Loading' : 'Sign In'}</Button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&#39;t have an account?</p>

        <Linker to="/sign-up/">
          <span className="text-sky-500">Sign up</span>
        </Linker>
      </div>
      <p className="text-red-700">{error ? error.message || 'Something went wrong!' : ''}</p>
    </div>
  );
}

export default SignIn;
