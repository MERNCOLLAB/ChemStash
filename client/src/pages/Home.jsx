import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Hero, Navbar, Footer } from './landing-page';
import featuresBg from '../assets/features.png';
import aboutBg from '../assets/about.png';
import faqBg from '../assets/faq.png';
import contactBg from '../assets/contact.png';
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
    <section>
      <Navbar />
      <div className=" w-full max-w-7xl mx-auto p-4">
        <div className=" grid grid-cols-1 md:grid-cols-2 items-center z-20 overflow-hidden relative ">
          <Hero id="home" handleGetStarted={handleGetStarted} />
        </div>

        <SectionLayout title="Key Features" id="features" pageContent={featuresContent} imagePath={featuresBg} />

        <SectionLayout title="About Chemstack" id="about" pageContent={aboutContent} imagePath={aboutBg} />

        <SectionLayout
          title="FAQs"
          id="faq"
          pageContent={faqsContent}
          imagePath={faqBg}
          gridClassName="grid grid-cols-2 gap-4"
          gridSpan="col-span-2"
        />

        <SectionLayout id="contacts" title="Contact Us" pageContent={contactUsContent} imagePath={contactBg} />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
