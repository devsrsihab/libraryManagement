import PropTypes from "prop-types"; 

const SectionHeading = ({ title }) => {

  return (
    <div className=" w-[90%] md:w-[50%]  ">
      <h2 className=" text-base  mb-3  ml-2">{title}</h2>
    </div>
  );
};
SectionHeading.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
};

export default SectionHeading;
