import { useNavigate } from "react-router-dom";
import { Button } from "../components";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full min-h-screen p-4">
      <div className="">
        <h1>About ChemStack</h1>
        <p>Simplifying chemical tracking & enhancing lab productivity</p>
        <p>ChemStack is a web application designed as a user-friendly and robust platform for the assistance in your
          chemical inventory management
        </p>
      </div>
      <div className="">
        <h1>Key Features</h1>
        <p>Inventory management is crucial for good laboratory practices</p>
        <p>Boost productivity by tracking chemicals with ease</p>
        <p>Interactive dashboard to visualize the status of the chemical supply</p>
        <p>Ensure safety by handling chemicals with the safety standards</p>
      </div>

      <div className="">
        <h1>FAQs</h1>
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
      <div className="max-w-[90%] mx-auto">
        <Button onClick={() => navigate('/')} type="button" variant="secondary">
              Back To Home
          </Button>
      </div>
    </div>
  )
}

export default About;
