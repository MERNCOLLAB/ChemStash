import { useNavigate } from 'react-router-dom';
import { Button, MarqueeBackground } from '../components';
import { useSelector } from 'react-redux';
import bg1 from '../assets/bg1.png';
import boxes from '../assets/boxes.png';
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

  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-3 items-center  z-20  md:h-[761px] overflow-hidden relative ">
        <div className="bg-white1 h-full items-center justify-center flex order-3 md:order-1">
          <img src={boxes} alt="" />
        </div>
        <div className="p-8 pl-0 flex flex-col justify-center h-full w-full bg-white1 space-y-4 md:order-2 order-1">
          <h1 className="text-6xl font-bold">Revolutionize your chemical inventory management with Chemstack!</h1>
          <p>
            Streamline your chemical inventory management process with ease. Bringing efficiency and quality assurance
            to laboratory management
          </p>
          <div>
            <Button onClick={handleGetStarted} type="button" variant="primary">
              Get Started
            </Button>
          </div>
        </div>

        <div className="w-full h-full  md:order-3 order-2">
          <MarqueeBackground/>
        </div>
        <div className="flex flex-col  -z-20 absolute top-1/2 right-0 transform -translate-y-1/2   ">
          <div className=" relative flex  overflow-x-hidden -z-20    ">
            <div className=" animate-marquee     ">
              <img src={bg1} alt="" />
            </div>

            <div className="   animate-marquee2   absolute top-0  ">
              <img src={bg1} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen min-h-screen bg-blue-300"></div>
    </div>
  );
};

export default Home;
