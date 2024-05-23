import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in")
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="bg-slate-900 p-3 border"
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
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
          {loading ? "Loading" : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>

        <Link to="/sign-in/">
          <span className="text-sky-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700">{error && "Something went wrong!"}</p>
    </div>
  );
}

export default SignUp;
