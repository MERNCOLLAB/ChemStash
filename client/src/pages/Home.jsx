import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { useSelector } from 'react-redux';

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
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="">
        <h1 className="font-semibold">Welcome to ChemStack!</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        <Button onClick={handleGetStarted} type="button" variant="primary">
          Get Started
        </Button>
        <Button onClick={() => navigate('/about')} type="button" variant="secondary">
          About
        </Button>
      </div>
    </div>
  );
};

export default Home;
