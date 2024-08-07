import {Input, Button, TextArea} from '../../components';

const featuresContent = (
    <ul>
        <li>Inventory management is crucial for good laboratory practices</li>
        <li>Boost productivity by tracking chemicals with ease</li>
        <li>Interactive dashboard to visualize the status of the chemical supply</li>
        <li>Ensure safety by handling chemicals with the safety standards</li>
    </ul>
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
    <>
        <Input label="Name" />
        <Input label="Email" />
        <TextArea className="make a prop change bg or something better" />
    </>
)

export {featuresContent, aboutContent, faqsContent, contactUsContent};

