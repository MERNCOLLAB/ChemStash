import LabImg from "../assets/lab-home.png";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center border border-gray1  p-4">
          {/* Title and Short Description */}
          <div className="flex justify-center size-[80%]">
          <img src={LabImg} alt="about-img" />
          </div>
          <div className="min-w-fit">
            <h1 className="text-base">About ChemStack</h1>
            <p className="font-semibold text-2xl uppercase tracking-wide text-blue1">Simplifying chemical tracking & enhancing lab productivity</p>
            <p className="text-lg max-w-[90%] my-4">ChemStack is a web application designed as a user-friendly and robust platform for the assistance in your
              chemical inventory management
            </p>
            <div className="max-w-[90%] mx-auto flex gap-8 mt-8">
              <Button onClick={()=>{}} type="button" variant="primary">
                  Get Started
                </Button>
              <Button onClick={() => navigate('/')} type="button" variant="secondary">
                  Back To Home
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="border border-gray1  p-4">
            {/* Cards UI with Icons on top */}
            <h1 className="font-semibold text-lg uppercase tracking-wide">Key Features</h1>
            <p>Inventory management is crucial for good laboratory practices</p>
            <p>Boost productivity by tracking chemicals with ease</p>
            <p>Interactive dashboard to visualize the status of the chemical supply</p>
            <p>Ensure safety by handling chemicals with the safety standards</p>
          </div>

        <div className="border border-gray1  p-4">
          {/* Accordion UI */}
          <h1 className="font-semibold text-lg uppercase tracking-wide">FAQs</h1>
          <p>How does ChemStack simplify chemical inventory management?</p>
          <p>Users can record and oversee chemicals easily, analyze chemical usage patterns, and be notified for low or expired inventories</p>
          <p>Can it help with regulatory compliance?</p>
          <p>Yes, it can assist with th general regulatory compliances as it allows you to upload a schematic laboratory map,
            safety data sheet URL links, and provide safety information about the chemicals
          </p>
          <p>What other features does the app offer</p>
          <p>In ChemStack, managers and team leaders have the ability to assign tasks to anyone and get notified. This ensures a smooth and
            efficient laboratory operation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;
