import PropTypes from "prop-types"; // ES6
import { BiTrash, BiEdit } from "react-icons/bi";
const BookRow = ({ rowNumber, category, handleSingleCategoryEdit,handleDeleteCategory }) => {
  const { _id, image, categoryName } = category;

  // 1. pass edit id
  const handleEdit = (id) => {
    handleSingleCategoryEdit(id);
  };

  // 2. pass delete id
  const handleDelete = (id) => {
    handleDeleteCategory(id)
  }

  return (
    <tr>
      <td>{++rowNumber}</td>
      <td>
        <div className="flex items-center capitalize space-x-3">
          <div className="avatar">
            <div className="mask mask-circle w-16 h-16">
              <img
                key={_id}
                src={image}
                className="w-full h-full object-cover"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold ">{categoryName}</div>

          </div>
        </div>
      </td>

      <th>
        <div className="actions text-2xl flex gap-2">
          {/* The button to open modal */}
          <label htmlFor="EditCategoryModal" onClick={() => handleEdit(_id)}>
            <BiEdit className="cursor-pointer text-green-500" />
          </label>
          <label  onClick={() => handleDelete(_id)}>
          <BiTrash className="cursor-pointer text-red-500" />
          </label>
        </div>
      </th>
    </tr>
  );
};
BookRow.propTypes = {
  category: PropTypes.object,
  handleSingleCategoryEdit: PropTypes.func,
  handleDeleteCategory: PropTypes.func,
  rowNumber: PropTypes.number,
};
export default BookRow;
