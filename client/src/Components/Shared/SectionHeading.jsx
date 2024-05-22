import PropTypes from "prop-types"; // ES6
import { useContext } from "react";
import { ThemeContext } from "../../Providers/ThemeChangeProvider";

const SectionHeading = ({ title, highlightTitle }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className=" w-[90%] md:w-[50%]  ">
      <h2
        className={` text-2xl sm:text-3xl  my-8 ${
          theme === "light" ? "text-[#333333]" : "text-white"
        } font-bold capitalize`}
      >
        {title} <span className="text-primary">{highlightTitle}</span>
      </h2>
    </div>
  );
};
SectionHeading.propTypes = {
  title: PropTypes.string,
  highlightTitle: PropTypes.string,
  details: PropTypes.string,
};

export default SectionHeading;
