import { PiFlaskFill } from "react-icons/pi";
import { IoTimeSharp } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { AiFillSafetyCertificate } from "react-icons/ai";
import {Input, Button, FeatureCards, TextArea} from '../../components';

const featuresContent = (
    <div className='grid grid-cols-4 gap-x-2 gap-y-8 justify-evenly items-center'>
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
    </div>
)

const aboutContent = (
    <p className="max-w-2xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque dolores vitae maiores sit odit qui maxime
              cum mollitia enim nihil, fuga distinctio accusamus harum pariatur alias dolorem blanditiis quaerat
              impedit!
    </p>
)

const faqsContent = (
    <>
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
  </>
)

const contactUsContent = (
    <form>
        <div className="grid grid-cols-2 gap-4 my-2">
        <Input label="Name" id="name" type="text" validation="Enter your name"/>
        <Input label="Email" id="email" type="text" validation="Enter your email" />
        </div>
        <div className="flex flex-col gap-4 my-2">
            <TextArea isTransparentBg  label="Message" id="message" validation="Enter your message"  />
            <Button type="button" variant="primary">Submit</Button>
        </div>
    </form>
)

export {featuresContent, aboutContent, faqsContent, contactUsContent};

