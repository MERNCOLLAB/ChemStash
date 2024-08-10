import Logo from '../../assets/test.png';

const Footer = () => {
  const hoverTextStyle = 'hover:text-blue1 cursor-pointer duration-500 ';
  return (
    <div>
      <div className="  bg-white1 flex item center justify-center border  py-8">
        <div className="max-w-7xl w-full   grid grid-cols-2   md:grid-cols-5 gap-4 p-4">
          <div className="col-span-2">
            <img src={Logo} alt="" className="h-14 w-14" />
            <strong className="text-2xl">Managing chemicals made easy</strong>
            <p>ChemStack Inc.</p>
          </div>
          <div className="grid">
            <strong> Get involved</strong>
            <small className={hoverTextStyle}>About Us</small>
            <small className={hoverTextStyle}>Plan and Pricing</small>
            <small className={hoverTextStyle}>Join Us</small>
          </div>
          <div className="grid">
            <strong> Support</strong>
            <small className={hoverTextStyle}>Contact Us</small>
            <small className={hoverTextStyle}>User Guide</small>
            <small className={hoverTextStyle}>FAQs</small>
          </div>
          <div className="grid">
            <strong> Legal</strong>
            <small className={hoverTextStyle}>Privacy Policy</small>
            <small className={hoverTextStyle}>Terms of Service</small>
            <small className={hoverTextStyle}>Data Security</small>
          </div>
        </div>
      </div>
      <div className="  bg-blue1 flex item center justify-center text-white0">
        <div className=" w-full grid md:grid-cols-2 p-2 md:p-4">
          <div>&#169; Chemstack Inc, All rights reserved.</div>
          <div className="flex md:justify-end gap-4">
            <p>Terms of Service </p>
            <p>Privacy </p>
            <p>Cookies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
