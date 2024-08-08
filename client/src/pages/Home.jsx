import { useNavigate } from 'react-router-dom';
// import { Input, TextArea } from '../components';
import { useSelector } from 'react-redux';
import { Hero } from './landing-page';
import featuresBg from '../assets/features.png';
import aboutBg from '../assets/about.png';
import faqBg from '../assets/faq.png';
import contactBg from '../assets/contact.png';
import Logo from '../assets/test.png';

// import boxes from '../assets/boxes.png';
import { SectionLayout } from './landing-page';
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
    <div>
      <div className="  bg-slate-300 flex item center justify-center">
        <div className="max-w-7xl border w-full p-4">
          <h1 className=" pl-2 ">Wait for Design</h1>
        </div>
      </div>

      <div className=" w-full max-w-7xl mx-auto p-4">
        <div className=" grid grid-cols-1 md:grid-cols-2 items-center z-20 overflow-hidden relative ">
          <Hero handleGetStarted={handleGetStarted} />
        </div>

        <SectionLayout title="Key Features" pageContent={featuresContent} imagePath={featuresBg} />

        <SectionLayout title="About Us" pageContent={aboutContent} imagePath={aboutBg} />

        <SectionLayout
          title="FAQs"
          pageContent={faqsContent}
          imagePath={faqBg}
          gridClassName="grid grid-cols-2 gap-4"
          gridSpan="col-span-2"
        />

        <SectionLayout title="Contact Us" pageContent={contactUsContent} imagePath={contactBg} />
      </div>
      <div>
        <div className="  bg-white1 flex item center justify-center border  py-8">
          <div className="max-w-7xl w-full   grid grid-cols-2   md:grid-cols-5 gap-4 p-4">
            <div className="col-span-2">
              <img src={Logo} alt="" className="h-14 w-14" />
              <strong className="text-2xl">Managing chemicals made easy</strong>
              <p>Kevin, Bryan</p>
            </div>
            <div className="grid">
              <strong> Get involved</strong>
              <small>About Us</small>
              <small>Plan and Pricing</small>
              <small>Join Us</small>
            </div>
            <div className="grid">
              <strong> Support</strong>
              <small>Contact Us</small>
              <small>User Guide</small>
              <small>FAQs</small>
            </div>
            <div className="grid">
              <strong> Legal</strong>
              <small>Privacy Policy</small>
              <small>Terms of Service</small>
              <small>Data Security</small>
            </div>
          </div>
        </div>
        <div className="  bg-blue1 flex item center justify-center text-white0">
          <div className=" w-full grid md:grid-cols-2 p-2 md:p-4">
            <div>&#169; Kevin, Bryan Inc, All rights reserved.</div>
            <div className="flex md:justify-end gap-4">
              <p>Terms of Service </p>
              <p>Privacy </p>
              <p>Cookies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
