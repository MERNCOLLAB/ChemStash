import { useNavigate } from 'react-router-dom';
import { Input, TextArea } from '../components';
import { useSelector } from 'react-redux';
import { Hero } from './landing-page';
import features from '../assets/features.png';
import about from '../assets/about.png';
import faq from '../assets/faq.png';
import contact from '../assets/contact.png';

// import boxes from '../assets/boxes.png';
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
    <div className=" w-full max-w-7xl mx-auto p-4">
      <div className=" h-10 bg-slate-300 flex item center">
        <h1 className="my-auto pl-2">Wait for Design</h1>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 items-center  z-20 overflow-hidden relative ">
        <Hero handleGetStarted={handleGetStarted} />
      </div>
      <div className="w-full h-full mx-auto">
        <div className=" flex relative w-full justify-end">
          <div className="left-0 top-1/2 absolute">
            <h1 className="font-bold">Key Features</h1>
            <ul>
              <li>Inventory management is crucial for good laboratory practices</li>
              <li>Boost productivity by tracking chemicals with ease</li>
              <li>Interactive dashboard to visualize the status of the chemical supply</li>
              <li>Ensure safety by handling chemicals with the safety standards</li>
            </ul>
          </div>
          <div className="mt-2">
            <img src={features} alt="features-img"/>
          </div>
        </div>
      </div>

      <div className=" w-full h-full mx-auto   ">
        <div className=" flex relative w-full justify-end">
          <div className="left-0 top-1/2 absolute">
            <h1 className="font-bold">About</h1>
            <p className="max-w-2xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque dolores vitae maiores sit odit qui maxime
              cum mollitia enim nihil, fuga distinctio accusamus harum pariatur alias dolorem blanditiis quaerat
              impedit!
            </p>
          </div>
          <div className="">
            <img src={about} alt="" className="  " />
          </div>
        </div>
      </div>
      <div className=" w-full h-full mx-auto   ">
        <div className=" flex relative w-full justify-end">
          <div className="left-0 top-1/2 absolute grid grid-cols-2 gap-4">
            <h1 className="font-bold col-span-2">FAQs</h1>

            <div className="max-w-2xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque dolores vitae maiores sit odit qui maxime
              cum mollitia enim nihil, fuga distinctio accusamus harum pariatur alias dolorem blanditiis quaerat
              impedit!
            </div>

            <div className="max-w-2xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque dolores vitae maiores sit odit qui maxime
              cum mollitia enim nihil, fuga distinctio accusamus harum pariatur alias dolorem blanditiis quaerat
              impedit!
            </div>
            <div className="max-w-2xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque dolores vitae maiores sit odit qui maxime
              cum mollitia enim nihil, fuga distinctio accusamus harum pariatur alias dolorem blanditiis quaerat
              impedit!
            </div>
            <div className="max-w-2xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque dolores vitae maiores sit odit qui maxime
              cum mollitia enim nihil, fuga distinctio accusamus harum pariatur alias dolorem blanditiis quaerat
              impedit!
            </div>
          </div>
          <div className="">
            <img src={faq} alt="" className="  " />
          </div>
        </div>

        <div className=" w-full h-full mx-auto   ">
          <div className=" flex relative w-full justify-end">
            <div className="left-0 top-1/2 absolute">
              <h1 className="font-bold">Contact</h1>
              <Input label="Name" />
              <Input label="Email" />
              <TextArea className="make a prop change bg or something better" />
            </div>
            <div className="">
              <img src={contact} alt="" className="  " />
            </div>
          </div>
        </div>

        <h1>Implement Footer</h1>
      </div>
    </div>
  );
};

export default Home;
