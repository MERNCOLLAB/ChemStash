import { useNavigate } from 'react-router-dom';
// import { Input, TextArea } from '../components';
import { useSelector } from 'react-redux';
import { Hero } from './landing-page';
import featuresBg from '../assets/features.png';
import aboutBg from '../assets/about.png';
import faqBg from '../assets/faq.png';
import contactBg from '../assets/contact.png';

// import boxes from '../assets/boxes.png';
import {SectionLayout} from './landing-page';
import { featuresContent, aboutContent, faqsContent, contactUsContent } from './landing-page';
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

      <div className=" grid grid-cols-1 md:grid-cols-2 items-center z-20 overflow-hidden relative ">
        <Hero handleGetStarted={handleGetStarted} />
      </div>

      <SectionLayout title="Key Features" pageContent={featuresContent} imagePath={featuresBg} />

      <SectionLayout title="About Us" pageContent={aboutContent} imagePath={aboutBg} />


      <SectionLayout title="FAQs" pageContent={faqsContent} imagePath={faqBg} 
                    gridClassName="grid grid-cols-2 gap-4" gridSpan="col-span-2" />

      <SectionLayout title="Contact Us" pageContent={contactUsContent} imagePath={contactBg} />

        <h1>Implement Footer</h1>
    </div>

  );
};

export default Home;
