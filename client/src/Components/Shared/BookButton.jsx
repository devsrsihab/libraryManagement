import PropTypes from "prop-types";
const BookButton = ({ btnText, btnBgColor }) => {
  return (
    <button
      type="button"
      className={`px-[18px] py-[13px] text-base font-medium text-white inline-flex items-center ${btnBgColor} hover:bg-${btnBgColor}-800  rounded-md text-center capitalize dark:bg-${btnBgColor}-600 text-base dark:hover:${btnBgColor}-700 dark:focus:ring-blue-800`}
    >
      {btnText}
    </button>
  );
};

BookButton.propTypes = {
  btnText: PropTypes.string.isRequired,
  btnBgColor: PropTypes.string.isRequired,
};

export default BookButton;
