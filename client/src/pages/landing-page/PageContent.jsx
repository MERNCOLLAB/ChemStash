import { Input, Button, TextArea, FormSubHeader } from '../../components';

const featuresContent = (
  <div className="grid  gap-x-2 gap-y-8 justify-evenly items-center">
    <ul className="p-4 list-disc space-y-2 text-lg">
      <li>
        Inventory management is crucial for <span className="text-gray2 font-semibold">good laboratory practices</span>
      </li>
      <li>
        <span className="text-gray2 font-semibold">Boost productivity</span> by tracking chemicals with ease
      </li>
      <li>
        <span className="text-gray2 font-semibold">Interactive dashboard</span> to visualize the status of the chemical
        supply
      </li>
      <li>
        Ensure safety by handling chemicals with the <span className="text-gray2 font-semibold">safety standards</span>
      </li>
    </ul>
  </div>
);

const aboutContent = (
  <div className="max-w-3xl mx-auto">
    <div className="mb-4">
      <h1 className="text-lg tracking-wide font-semibold text-gray2">
        Simplifying chemical tracking & enhancing lab productivity
      </h1>
      <p className="text-balance my-2">
        ChemStash is a web application designed as a user-friendly and robust platform for the assistance in your
        chemical inventory management
      </p>
    </div>
    <h1 className="my-4 font-semibold text-lg text-gray2">Founders</h1>
    <section className="grid grid-cols-2 items-center">
      <div className="flex flex-col gap-0.5 items-center">
        <img src="https://avatar.iran.liara.run/public/boy?username=Bryan" className="rounded-full size-40" alt="" />
        <div className="p-4">
          <h1 className="my-1 font-semibold">Bryan Castillo</h1>
          <p className="italic">Engineer & Chemist</p>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 items-center">
        <img src="https://avatar.iran.liara.run/public/boy?username=Kevin" className="rounded-full size-40" alt="" />
        <div className="p-4">
          <h1 className="my-1 font-semibold">Kevin Divinagracia</h1>
          <p className="italic">UI/UX Designer & IT</p>
        </div>
      </div>
    </section>
  </div>
);

const faqsContent = (
  <>
    <div className="max-w-2xl">
      <h1 className="text-lg font-semibold mb-1">How does ChemStash simplify chemical inventory management?</h1>
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
        In ChemStash, managers and team leaders have the ability to assign tasks to anyone and get notified. This
        ensures a smooth and efficient laboratory operation.
      </p>
    </div>
  </>
);

const contactUsContent = (
  <form>
    <FormSubHeader title="Reach out our team!" />
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
