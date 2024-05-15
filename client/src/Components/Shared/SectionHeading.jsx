import PropTypes from 'prop-types'; // ES6
import { useContext } from 'react';
import { ThemeContext } from '../../Providers/ThemeChangeProvider';

const SectionHeading = ({title,highlightTitle,details}) => {

  const {theme} = useContext(ThemeContext)


  return (
    <div className=" w-[90%] md:w-[50%] mx-auto text-center">
     <h2  className={` text-2xl sm:text-3xl  my-8 ${theme ==='light' ? 'text-[#333333]' : 'text-white'} font-bold uppercase`}>{title}  <span className="text-[#E59285]">{highlightTitle}</span></h2>
     <p data-aos="fade-up" >{details}</p>

    </div>
  )
}
SectionHeading.propTypes = {
  title: PropTypes.string,
  highlightTitle: PropTypes.string,
  details: PropTypes.string,
}

export default SectionHeading