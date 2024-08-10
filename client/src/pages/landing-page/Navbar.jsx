import { HamburgerMenu } from '../../icons';
import Logo from '../../assets/test.png';

const Navbar = () => {
  return (
    <div className="bg-white0 flex item center justify-center md:p-4">
      <div className="navbar bg-base-100 md:hidden p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
              <HamburgerMenu />
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content w-screen z-[50]  bg-gray2/90 space-y-4 p-2 shadow text-white1"
            >
              <li className="pl-8 hover:scale-110 duration-500 cursor-pointer">Home</li>
              <li className="pl-8 hover:scale-110 duration-500 cursor-pointer">Features</li>
              <li className="pl-8 hover:scale-110 duration-500 cursor-pointer">About</li>
              <li className="pl-8 hover:scale-110 duration-500 cursor-pointer">Faqs</li>
              <li className="pl-8 hover:scale-110 duration-500 cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl  w-full   grid-cols-2 px-4 hidden md:grid">
        <div className="flex items-center font-semibold text-lg ">
          <img src={Logo} alt="" className="h-10 w-10" />
          <div>ChemStack</div>
        </div>

        <ul className="flex justify-end gap-4 items-center">
          <li className="text-hover-link cursor-pointer">Home</li>
          <li className="text-hover-link cursor-pointer">Features</li>
          <li className="text-hover-link cursor-pointer">About</li>
          <li className="text-hover-link cursor-pointer">FAQs</li>
          <li className="text-hover-link cursor-pointer">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
