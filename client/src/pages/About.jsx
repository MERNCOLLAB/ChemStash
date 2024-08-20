import { PiFlaskFill } from "react-icons/pi";
import { IoTimeSharp } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { AiFillSafetyCertificate } from "react-icons/ai";
import LabImg from "../assets/lab-home.png";
import { useNavigate } from "react-router-dom";
import { Button, FeatureCards, Accordion } from "../components";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center p-4">
          {/* Title and Short Description */}
          <div className="flex justify-center size-[80%]">
          <img src={LabImg} alt="about-img" />
          </div>
          <div className="min-w-fit">
            <h1 className="text-base">About ChemStash</h1>
            <p className="font-semibold text-2xl uppercase tracking-wide text-blue1">Simplifying chemical tracking & enhancing lab productivity</p>
            <p className="text-lg max-w-[90%] my-4">ChemStash is a web application designed as a user-friendly and robust platform for the assistance in your
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
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-4">
            <h1 className="font-semibold text-lg uppercase tracking-wide text-blue1 mb-2">Key Features</h1>  
            <section className="grid grid-cols-2 gap-x-2 gap-y-8 justify-evenly items-center">
            <FeatureCards
              icon={<PiFlaskFill />}
              text="Inventory management is crucial for"
              highlightText="good laboratory practices"
            />
            <FeatureCards
              icon={<IoTimeSharp />}
              text="Boost productivity by"
              highlightText="tracking chemicals with ease"
            />
            <FeatureCards
              icon={<GoGraph />}
              text="Interactive dashboard to"
              highlightText="visualize the status of the chemical supply"
            />
            <FeatureCards
              icon={<AiFillSafetyCertificate />}
              text="Ensure safety by handling chemicals with the "
              highlightText="safety standards"
            />
            </section>
          </div>

        <div className="p-4">
          <h1 className="font-semibold text-lg uppercase tracking-wide text-blue1 mb-2">FAQs</h1>
          <Accordion/>
        </div>
      </div>
    </div>
  )
}

export default About;
