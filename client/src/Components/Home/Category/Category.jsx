import PropTypes from "prop-types";

const Category = ({ category }) => {
  return (
    <>
      <div className="w-48 bg-white shadow-lg border border-gray-200 rounded-lg  ">
          <div className="w-48 h-48 ">
            <img
              className="rounded-t-lg w-full h-full object-cover"
              src={category.image}
              alt=""
            />
          </div>
        <div className="p-5">
          <a href="#">
            <p className="mb-2 text-[16px] tracking-tight text-primary">
              {category.categoryName}
            </p>
          </a>
        </div>
      </div>
    </>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    image: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Category;
