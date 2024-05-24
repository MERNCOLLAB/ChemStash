import { useSelector } from "react-redux";

function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <img
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
          src={currentUser.profilePicture}
          alt=""
        />
        <input
          className="bg-slate-900 p-3 border"
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <input
          className="bg-slate-900 p-3 border"
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <input
          className="bg-slate-900 p-3 border"
          type="password"
          placeholder="Password"
          id="password"
        />

        <button
          disabled={loading}
          className="bg-slate-700 p-3 uppercase hover:opacity-60 border"
        >
          {loading ? "Loading" : "Update"}
        </button>
      </form>
      <div className="flex justify-between items-center mt-4">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
