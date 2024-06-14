import { useState } from 'react';
import Select from 'react-select';
import { selectStyle } from '../helpers/selectStyle';
import { roleOptions } from '../constants';
import OAuth from '../ui/OAuth';
import { Button, Input, Linker } from '../components';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleChangeRole = (selectedOption) => {
    setSelectedRole(selectedOption);
    setFormData({ ...formData, role: selectedOption ? selectedOption.value : '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      // navigate("/sign-in");
      alert('user created');
      setFormData({});
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 bg-slate-800 h-full max-w-2xl w-full">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <Input id="username" type="text" placeholder="Username" onChange={handleChange} />

        <Input id="email" type="email" placeholder="Email" onChange={handleChange} />

        <Input id="password" type="password" placeholder="Password" onChange={handleChange} />

        <Select
          placeholder="Select a role"
          value={selectedRole}
          options={roleOptions}
          onChange={handleChangeRole}
          styles={selectStyle}
          isClearable
        />

        <Button loading={loading}>{loading ? 'Loading' : 'Sign Up'}</Button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>

        <Linker to="/sign-in/">
          <span className="text-sky-500">Sign in</span>
        </Linker>
      </div>
      <p className="text-red-700">{error && 'Something went wrong!'}</p>
    </div>
  );
}

export default SignUp;
