import { PiFlaskFill } from 'react-icons/pi';
import { IoTimeSharp } from 'react-icons/io5';
import { GoGraph } from 'react-icons/go';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { Input, Button, FeatureCards, TextArea } from '../../components';

const featuresContent = (
  <div className="grid grid-cols-4 gap-x-2 gap-y-8 justify-evenly items-center">
    <FeatureCards
      icon={<PiFlaskFill />}
      text="Inventory management is crucial for"
      highlightText="good laboratory practices"
    />
    <FeatureCards icon={<IoTimeSharp />} text="Boost productivity by" highlightText="tracking chemicals with ease" />
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
  </div>
);

const aboutContent = (
  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 max-w-3xl mx-auto">
    <div className="grid grid-cols-2 gap-0.5 items-center">
      <img src="https://avatar.iran.liara.run/public/boy?username=Kevin" className="rounded-full size-40" alt="" />
      <div className="p-4">
        <h1 className="my-2 font-semibold">User Name 1</h1>
        <p className="italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, facilis?</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-0.5 items-center">
      <img src="https://avatar.iran.liara.run/public/boy?username=Bryan" className="rounded-full size-40" alt="" />
      <div className="p-4">
        <h1 className="my-2 font-semibold">User Name 2</h1>
        <p className="italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, facilis?</p>
      </div>
    </div>
  </div>
);

const faqsContent = (
  <>
    <div className="max-w-2xl">
      <h1 className="text-lg font-semibold mb-1">How does ChemStack simplify chemical inventory management?</h1>
      <p className="max-w-[90%]">
        Users can record and oversee chemicals easily, analyze chemical usage patterns, and be notified for low or
        expired inventories.
      </p>
    </div>

    <div className="max-w-2xl">
      <h1 className="text-lg font-semibold mb-1">Can it help with regulatory compliance?</h1>
      <p className="max-w-[95%]">
        Yes, it can assist with the general regulatory compliance as it allows you to upload a schematic laboratory map,
        safety data sheet URL links, and provide safety information about the chemicals.
      </p>
    </div>

    <div className="max-w-2xl">
      <h1 className="text-lg font-semibold mb-1">What are the chemical information you need to provide?</h1>
      <p className="max-w-[98%]">
        Most of the required information for the chemical includes details such as chemical name, CAS registry number,
        storage location, date received and expiration, and some safety information.
      </p>
    </div>

    <div className="max-w-2xl">
      <h1 className="text-lg font-semibold mb-1">What other features does the app offer?</h1>
      <p className="max-w-[95%]">
        In ChemStack, managers and team leaders have the ability to assign tasks to anyone and get notified. This
        ensures a smooth and efficient laboratory operation.
      </p>
    </div>
  </>
);

const contactUsContent = (
  <form>
    <div className="grid md:grid-cols-2 gap-4 my-2">
      <Input label="Name" id="name" type="text" validation="Enter your name" />
      <Input label="Email" id="email" type="text" validation="Enter your email" />
    </div>
    <div className="flex flex-col gap-4 my-2">
      <TextArea isTransparentBg label="Message" id="message" validation="Enter your message" />
      <Button type="button" variant="primary">
        Submit
      </Button>
    </div>
  </form>
);

export { featuresContent, aboutContent, faqsContent, contactUsContent };
