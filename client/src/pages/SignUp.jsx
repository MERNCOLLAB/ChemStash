import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          className="bg-slate-900 p-3 border"
          type="text"
          placeholder="Username"
          id="username"
        />
        <input
          className="bg-slate-900 p-3 border"
          type="email"
          placeholder="Email"
          id="email"
        />
        <input
          className="bg-slate-900 p-3 border"
          type="password"
          placeholder="Password"
          id="password"
        />
        <button className="bg-slate-700 p-3 uppercase hover:opacity-60 border">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>

        <Link to="/sign-in/">
          <span className="text-sky-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
