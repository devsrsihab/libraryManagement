import { useContext } from "react";
import SectionHeading from "../Shared/SectionHeading";
import { ThemeContext } from "../../Providers/ThemeChangeProvider";
const StayWithUs = () => {
  const {theme}  = useContext(ThemeContext)
  const sectionLigthBg = "https://i.ibb.co/cxfxMhV/contact.jpg";
  // light bg
  const lightStyle = {
    backgroundImage: `url(${sectionLigthBg}`,
  }
  // dark bg
  const darkStyle = {
    backgroundColor: '#001e2b',
   
  }
  const backgroundStyle = theme === "light" ? lightStyle : darkStyle

    
  return (
    <div
      style={{...backgroundStyle, backgroundSize: "cover",
      backgroundPosition: "center center",}} 

      className="StayWithUs bg-white dark:bg-black py-20 h-[515px] flex items-center"
    >
      <div className="stay-section md:w-[60%] ml-auto">
        <SectionHeading
          title="stay"
          highlightTitle="with us"
          details="Subscribe to our newsletters now and stay up-to-date with new collections, the latest lookbooks and exclusive offers."
        />
        <form data-aos="fade-left" className="flex my-8 gap-6 items-center flex-row justify-center">
          <div className="form-control">
            <input
              type="Email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control ">
            <button className="btn bg-primary text-white hover:bg-primary">Subscribe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StayWithUs;
