import PropTypes from "prop-types"; // ES6
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Rating from "react-rating";
import toast, { Toaster } from "react-hot-toast";

const AddBookModal = ({ setnewNooks }) => {
  // state management
  const [rating, setRating] = useState();
  const [categories, setCategory] = useState([]);

  // Category List
  useEffect(() => {
    axios
      .get("http://localhost:2000/categories")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  // modal open or not
  const modalRef = useRef();
  // hot toaster
  const successNotify = () =>
    toast.success("Your Book Has Been Added!", {
      position: "top-right", // Set the position to top-right
    });

  // ADD BOOK FORM HANDLER
  const handleAddBookForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const authorName = form.authorName.value;
    const category = form.category.value;
    const quantity = form.quantity.value;
    const shortDescription = form.shortDescription.value;
    const rating = form.rating.value;
    const image = form.image.value;
    // collect all of form value in a object
    const formCollection = {
      name,
      authorName,
      category,
      quantity: parseInt(quantity),
      shortDescription,
      rating,
      image,
    };

    // make a axios post request
    axios
      .post("http://localhost:2000", formCollection)
      .then((res) => {
        form.reset();
        modalRef.current.checked = false; // Close the modal after successful submission
        const newBook = res.data;
        setnewNooks(newBook);
        successNotify();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="addBookModal" className="modal-toggle" />
      <div className="modal">
        <Toaster />
        <div className="modal-box">
          <form onSubmit={handleAddBookForm} className="card-body space-y-4 ">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                name="name"
                id="name"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="authorName" className="label">
                <span className="label-text">Author Name</span>
              </label>
              <input
                type="text"
                placeholder="Author Name"
                className="input input-bordered"
                name="authorName"
                id="authorName"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="category" className="label">
                <span className="label-text">Category</span>
              </label>
              <select name="category" className="select w-full" defaultValue="">
                <option value="" disabled>
                  Choose Category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="quantity" className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                placeholder="Quantity"
                className="input input-bordered"
                name="quantity"
                min="1"
                max="20"
                id="quantity"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="shortDescription" className="label">
                <span className="label-text">Short Description</span>
              </label>
              <textarea
                className="textarea textarea-warning"
                placeholder="Short Description"
                name="shortDescription"
                id="shortDescription"
                required
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="image" className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                className="input input-bordered mb-3"
                placeholder="Image URL"
                name="image"
                id="image"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="rating" className="label">
                <span className="label-text">Rating</span>
              </label>
              <input
                onChange={(e) => setRating(e.target.value)}
                type="text"
                placeholder="Rating"
                className="input input-bordered mb-3"
                name="rating"
                id="rating"
                required
              />
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
            <div className="modal-action">
              <label htmlFor="addBookModal" className="btn">
                Close!
              </label>
              <button
                type="submit"
                className="btn text-white hover:bg-primary bg-primary"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

AddBookModal.propTypes = {
  setnewNooks: PropTypes.func,
};

export default AddBookModal;
