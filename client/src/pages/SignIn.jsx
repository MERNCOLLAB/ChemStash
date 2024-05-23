import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
       dispatch(signInStart());
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success === false) {
      dispatch(signInFailure(data));
      return;
    }
      dispatch(signInSuccess(data));
       navigate('/');
  }
  catch(error) {
       dispatch(signInFailure(error));
  }
  }

 

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       
        <input
          className="bg-slate-900 p-3 border"
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="bg-slate-900 p-3 border"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 uppercase hover:opacity-60 border"
        >
          {loading ? "Loading" : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&#39;t have an account?</p>

        <Link to="/sign-up/">
          <span className="text-sky-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700">{error ? error.message || "Something went wrong!":""}</p>
    </div>);
}

export default SignIn;