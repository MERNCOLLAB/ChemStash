import tests from '../../assets/tests.png';
import { Button } from '../../components';

const Hero = ({ id,handleGetStarted }) => {
  return (
    <>
      <div id={id} className=" flex flex-col justify-center h-full w-full bg-white1 space-y-4 md:order-2 order-1">
        <h1 className="text-6xl font-bold">Revolutionize your chemical inventory management with ChemStash!</h1>
        <p>
          Streamline your chemical inventory management process with ease. Bringing efficiency and quality assurance to
          laboratory management
        </p>
        <div className="my-4">
          <Button onClick={handleGetStarted} type="button" variant="primary">
            Get Started
          </Button>
        </div>
      </div>

      <div className="w-full h-full  md:order-3 order-2 relative">
        {/* SVG Layer */}
        <svg className="w-full h-full" viewBox="0 0 637 662" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_i_711_1498)">
            <path
              d="M10.2227 474.253C10.2227 455.336 25.5582 440 44.4755 440V440C63.3928 440 78.7283 455.336 78.7283 474.253V614.747C78.7283 633.664 63.3928 649 44.4755 649V649C25.5582 649 10.2227 633.664 10.2227 614.747V474.253Z"
              fill="url(#paint0_linear_711_1498)"
              fillOpacity="0.5"
            />
          </g>
          <g filter="url(#filter1_i_711_1498)">
            <path
              d="M10.2461 52C10.2461 29.9086 28.1547 12 50.2461 12H585.77C607.862 12 625.77 29.9086 625.77 52V612C625.77 634.091 607.862 652 585.77 652H127.442C105.351 652 87.4422 634.091 87.4422 612V471.798C87.4422 450.481 70.1613 433.2 48.8442 433.2V433.2C27.527 433.2 10.2461 415.919 10.2461 394.602V52Z"
              fill="url(#paint1_linear_711_1498)"
              fillOpacity="0.5"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H636.996V662H0V0ZM10.2227 474.253C10.2227 455.336 25.5583 440 44.4756 440C63.3929 440 78.7284 455.336 78.7284 474.253V610.747C78.7284 629.664 63.3929 645 44.4756 645C25.5583 645 10.2227 629.664 10.2227 610.747V474.253ZM10.2189 52C10.2189 29.9086 28.1275 12 50.2189 12H585.743C607.835 12 625.743 29.9086 625.743 52V612C625.743 634.091 607.835 652 585.743 652H127.415C105.324 652 87.4151 634.091 87.4151 612V471.798C87.4151 450.481 70.1341 433.2 48.817 433.2C27.4999 433.2 10.2189 415.919 10.2189 394.602V52Z"
            fill="#F2F5F9"
          />
          <defs>
            <filter
              id="filter0_i_711_1498"
              x="10.2227"
              y="440"
              width="70.5039"
              height="217"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_711_1498" />
            </filter>
            <filter
              id="filter1_i_711_1498"
              x="10.2461"
              y="12"
              width="617.523"
              height="648"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_711_1498" />
            </filter>
            <linearGradient
              id="paint0_linear_711_1498"
              x1="-79.7549"
              y1="412"
              x2="233.885"
              y2="745.965"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00D9FF" stopOpacity="0.2" />
              <stop offset="1" stopColor="#03A8C6" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_711_1498"
              x1="-20.9391"
              y1="12"
              x2="696.567"
              y2="861.273"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00D9FF" stopOpacity="0.5" />
              <stop offset="1" stopColor="#03A8C6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Background Image */}
        <div
          className="flex flex-col  -z-20 absolute  top-0
         p-2 w-[1410px] h-[646px]"
        >
          <div className="relative flex  overflow-x-hidden -z-20">
            <div className="animate-marquee">
              <img src={tests} alt="hero-bg" className="" />
            </div>

            <div className="animate-marquee2 absolute top-0">
              <img src={tests} alt="hero-bg" className="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
