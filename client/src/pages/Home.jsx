import { useNavigate } from 'react-router-dom';
import { Button, Input, TextArea } from '../components';
import { useSelector } from 'react-redux';
import bg1 from '../assets/bg1.png';
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

  // const HeroBackground = {
  //   backgroundImage: `url(${HeroBg})`,
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  // };
  return (
    <div className=" w-full max-w-7xl mx-auto p-4">
      <div className=" h-10 bg-slate-300 flex item center">
        <h1 className="my-auto pl-2">Wait for Design</h1>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 items-center  z-20 overflow-hidden relative ">
        {/* <div className="bg-white1 h-full items-center justify-center flex order-3 md:order-1">
          <img src={boxes} alt="" />
        </div> */}
        <div className=" flex flex-col justify-center h-full w-full bg-white1 space-y-4 md:order-2 order-1">
          <h1 className="text-6xl font-bold">Revolutionize your chemical inventory management with Chemstack!</h1>
          <p>
            Streamline your chemical inventory management process with ease. Bringing efficiency and quality assurance
            to laboratory management
          </p>
          <div className="">
            <Button onClick={handleGetStarted} type="button" variant="primary">
              Get Started
            </Button>
            {/* <Button onClick={() => navigate('/about')} type="button" variant="secondary">
                About
              </Button> */}
          </div>
        </div>

        <div className="w-full h-full  md:order-3 order-2 relative">
          <svg className="w-fit h-fit" viewBox="0 0 624 662" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_680_1487)">
              <path
                d="M10.5 473.5C10.5 454.998 25.4985 440 44 440V440C62.5015 440 77.5 454.998 77.5 473.5V615.5C77.5 634.002 62.5015 649 44 649V649C25.4985 649 10.5 634.002 10.5 615.5V473.5Z"
                fill="url(#paint0_linear_680_1487)"
                fill-opacity="0.5"
              />
            </g>
            <g filter="url(#filter1_i_680_1487)">
              <path
                d="M11.5 52C11.5 29.9086 29.4086 12 51.5 12H573.5C595.591 12 613.5 29.9086 613.5 52V612C613.5 634.091 595.591 652 573.5 652H127C104.909 652 87 634.091 87 612V470.95C87 450.101 70.0987 433.2 49.25 433.2V433.2C28.4013 433.2 11.5 416.299 11.5 395.45V52Z"
                fill="url(#paint1_linear_680_1487)"
                fill-opacity="0.5"
              />
            </g>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.5 0H623.5V662H0.5V0ZM10.5 473.5C10.5 454.998 25.4985 440 44 440C62.5015 440 77.5 454.998 77.5 473.5V611.5C77.5 630.002 62.5015 645 44 645C25.4985 645 10.5 630.002 10.5 611.5V473.5ZM10.5 52C10.5 29.9086 28.4086 12 50.5 12H572.5C594.591 12 612.5 29.9086 612.5 52V612C612.5 634.091 594.591 652 572.5 652H126C103.909 652 86 634.091 86 612V470.95C86 450.101 69.0987 433.2 48.25 433.2C27.4013 433.2 10.5 416.299 10.5 395.45V52Z"
              fill="#F2F5F9"
            />
            <defs>
              <filter
                id="filter0_i_680_1487"
                x="10.5"
                y="440"
                width="69"
                height="217"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="2" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.309804 0 0 0 0 0.329412 0 0 0 0 0.329412 0 0 0 0.5 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_680_1487" />
              </filter>
              <filter
                id="filter1_i_680_1487"
                x="11.5"
                y="12"
                width="604"
                height="648"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="2" dy="8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_680_1487" />
              </filter>
              <linearGradient
                id="paint0_linear_680_1487"
                x1="-77.5"
                y1="412"
                x2="236.5"
                y2="739"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#00D9FF" stop-opacity="0.2" />
                <stop offset="1" stop-color="#03A8C6" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_680_1487"
                x1="-19"
                y1="12"
                x2="701"
                y2="845.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#00D9FF" stop-opacity="0.5" />
                <stop offset="1" stop-color="#03A8C6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col  -z-20 absolute   w-fit h-fit top-0 p-2 ">
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

        {/* <div className="flex flex-col md:flex-row items-center">
          <img src={HeroImg} className='size-3/4' alt="hero-image"/>
          
        </div> */}
      </div>
      <div className=" w-full h-full mx-auto   ">
        <div className=" flex relative w-full justify-end">
          <div className="left-0 top-1/2 absolute">
            <h1 className="font-bold">Key Features</h1>
            <ul>
              <li>Inventory management is crucial for good laboratory practices</li>
              <li>Boost productivity by tracking chemicals with ease</li>
              <li>Interactive dashboard to visualize the status of the chemical supply</li>
              <li>Ensure safety by handling chemicals with the safety standards</li>
            </ul>
          </div>
          <div className="">
            <img src={features} alt="" className="  " />
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
            <h1 className="font-bold col-span-2">Faq's</h1>

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
