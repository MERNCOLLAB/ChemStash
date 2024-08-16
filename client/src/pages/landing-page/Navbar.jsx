import { HamburgerMenu } from '../../icons';
import { Link } from 'react-scroll';
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
              <li className="pl-8 hover:scale-110 duration-500 cursor-pointer"><Link to="home" smooth={true} duration={500}>Home</Link></li>
              <li className="pl-8 hover:scale-110 duration-500 cursor-pointer"><Link to="features" smooth={true} duration={500}>Features</Link></li>
              <li className="pl-8 hover:scale-110 duration-500 cursor-pointer"><Link to="about" smooth={true} duration={500}>About</Link></li>
              <li className="pl-8 hover:scale-110 duration-500 cursor-pointer"><Link to="faq" smooth={true} duration={500}>FAQs</Link></li>
              <li className="pl-8 hover:scale-110 duration-500 cursor-pointer"><Link to="contacts" smooth={true} duration={500}>Contact</Link></li>
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
          <li className="text-hover-link cursor-pointer"><Link to="home" smooth={true} duration={500}>Home</Link></li>
          <li className="text-hover-link cursor-pointer"><Link to="features" smooth={true} duration={500}>Features</Link></li>
          <li className="text-hover-link cursor-pointer"><Link to="about" smooth={true} duration={500}>About</Link></li>
          <li className="text-hover-link cursor-pointer"><Link to="faq" smooth={true} duration={500}>FAQs</Link></li>
          <li className="text-hover-link cursor-pointer"><Link to="contacts" smooth={true} duration={500}>Contact</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
