
import { useSelector } from 'react-redux';
import { Button, Input } from '../components';
import useSignIn from '../api/auth/useSignIn';
import ToastProvider from '../configs/ToastProvider';
import useHandleSignIn from '../hooks/auth/useHandleSignIn';

function SignIn() {
  const { loading, error } = useSelector((state) => state.user);
  const {signIn, toastMessage, toastType, clearToast} = useSignIn();
  const {handleChange, handleSubmit} = useHandleSignIn(signIn);

  return (
    <div className="p-3 max-w-lg min-h-screen mx-auto mt-20">
      <ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast}/>
      <h1 className="text-3xl text-center font-bold my-7">Sign In to <span className='text-indigo0'>ChemStack</span></h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 place-items-center gap-4">
        <Input id="email" type="email" placeholder="Enter your email" onChange={handleChange} />
        <Input id="password" type="password" placeholder="Enter password" onChange={handleChange} />
        <Button type="submit" variant="primary" loading={loading}>
          Sign In
        </Button>
      </form>
      <p className="text-red-700">{error ? error.message || 'Something went wrong!' : ''}</p>
    </div>
  );
}

export default SignIn;
