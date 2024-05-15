import PropTypes from "prop-types"; // ES6
import Rating from "react-rating";
import { BiTrash, BiEdit } from "react-icons/bi";
const BookRow = ({ rowNumber, book, handleSingleProductEdit,handleDeleteBook }) => {
  const { _id, image, authorName, rating, category, name } = book;

  // 1. pass edit id
  const handleEdit = (id) => {
    handleSingleProductEdit(id);
  };

  // 2. pass delete id
  const handleDelete = (id) => {
    handleDeleteBook(id)
  }

  return (
    <tr>
      <td>{++rowNumber}</td>
      <td>
        <div className="flex items-center capitalize space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                key={_id}
                src={image}
                className="w-full h-full object-cover"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold ">{name}</div>
            <div className="text-sm opacity-50">
              <Rating
                className="text-yellow-500"
                fractions={10}
                initialRating={rating}
                readonly
                emptySymbol={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                }
                fullSymbol={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </td>
      <td>{authorName}</td>
      <td>{category}</td>
      <th>
        <div className="actions text-2xl flex gap-2">
          {/* The button to open modal */}
          <label htmlFor="EditBookModal" onClick={() => handleEdit(_id)}>
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
  book: PropTypes.object,
  handleSingleProductEdit: PropTypes.func,
  handleDeleteBook: PropTypes.func,
  rowNumber: PropTypes.number,
};
export default BookRow;
