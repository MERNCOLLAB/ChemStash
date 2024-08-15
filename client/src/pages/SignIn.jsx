import { useSelector } from 'react-redux';
import { Button, Input } from '../components';
import useSignIn from '../api/auth/useSignIn';
import ToastProvider from '../configs/ToastProvider';
import useHandleSignIn from '../hooks/auth/useHandleSignIn';
import SignInPic from '../assets/lab-home.png';

function SignIn() {
  const { loading, error } = useSelector((state) => state.user);
  const {signIn, toastMessage, toastType, clearToast} = useSignIn();
  const {handleChange, handleSubmit} = useHandleSignIn(signIn);

  return (
    <div className="bg-white1 p-3 mt-10">
      <ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast}/>
      <div className="flex flex-col md:flex-row justify-center min-h-screen items-center gap-x-4 gap-y-2 min-w-2xl mx-auto">
        <section>
          <img className='size-[400px]' src={SignInPic} alt={`${SignInPic}-pic`} />
        </section>
        <section className='border border-gray2 shadow-md bg-gray-300/20 rounded-xl p-10'>
        <h1 className="text-3xl text-center font-bold my-7">Sign In to <span className='text-blue0'>ChemStack</span></h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 place-items-center gap-4">        
          <Input id="email" type="email" placeholder="Enter your email" onChange={handleChange} />
          <Input id="password" type="password" placeholder="Enter password" onChange={handleChange} />
          <Button type="submit" variant="primary" loading={loading}>
              Sign In
          </Button>
        </form>
        <div className="mt-6">
          <p className='text-sm'>No account yet? <span className='cursor-pointer text-hover-link font-semibold'>Contact Us</span></p>
          <p className="text-red-700">{error ? error.message || 'Something went wrong!' : ''}</p>
        </div>
        </section>
      </div>
    </div>
  );
}

export default SignIn;
