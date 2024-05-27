import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const getLinkPath = () => {
    if (!currentUser) return "/sign-in";
    switch (currentUser.role) {
      case "admin":
        return "/profile";
      case "chem":
        return "/chem-profile";
      case "controller":
        return "/controller-profile";
      default:
        return "/";
    }
  };
  return (
    <div className="mx-auto border">
      <div className="flex justify-between items-center  mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Chemstack</h1>
        </Link>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>

          <Link to={getLinkPath()}>
            {currentUser ? (
              <img
                className="border rounded-full h-10 w-10 object-cover"
                src={currentUser.profilePicture}
                alt="Profile"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
