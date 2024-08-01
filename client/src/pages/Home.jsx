import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { useSelector } from 'react-redux';
import HeroImg from '../assets/lab-home.png';
import HeroBg from '../assets/hexagon-bg.svg';

const Home = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const isAuthenticated = currentUser !== null;
  const role = currentUser?.role;

  const handleGetStarted = () => {
    if (isAuthenticated && role) {
      navigate(`/${role}/dashboard`);
    } else {
      navigate('/sign-in');
    }
  };

  const HeroBackground = {
    backgroundImage: `url(${HeroBg})`,
    backgroundPosition: 'center',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat'
  }
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center min-h-screen" style={HeroBackground}>
      <div className="p-8 grid grid-cols-1 justify-center items-center">
        <h1 className='text-2xl font-semibold tracking-wider text-center md:text-left'>
          Revolutionize your chemical inventory management with <span className='text-blue1'>ChemStack!</span>
        </h1>
        <p className='mt-4'> Streamline your chemical inventory management process with ease. 
          Bringing <span className='text-blue0 font-semibold'>efficiency</span> and <span className='font-semibold text-blue0'> quality assurance</span> to laboratory management </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 max-w-[70%] mx-auto md:mx-0">
          <Button onClick={handleGetStarted} type="button" variant="primary">
            Get Started
          </Button>
          <Button onClick={() => navigate('/about')} type="button" variant="secondary">
            About
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center">
      <img src={HeroImg} className='size-3/4' alt="hero-image"/>
      </div>
      
    </div>
  );
};

export default Home;


