import PropTypes from "prop-types"; // ES6
import axios from "axios";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddBookModal = ({ setNewCategory }) => {
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
    const categoryName = form.categoryName.value;
    const image = form.image.value;
    // collect all of form value in a object
    const formCollection = {
      categoryName,
      image,
    };

    // make a axios post reques
    axios
      .post("http://localhost:2000/category", formCollection)
      .then((res) => {
        form.reset();
        modalRef.current.checked = false; // Close the modal after successful submission
        const newBook = res.data;
        setNewCategory(newBook);
        successNotify();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="AddCategoryModal"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal">
        <Toaster />
        <div className="modal-box">
          <form onSubmit={handleAddBookForm} className="card-body space-y-4 ">
            <div className="form-control">
              <label htmlFor="categoryName" className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                type="text"
                placeholder="Category Name"
                className="input input-bordered"
                name="categoryName"
                id="categoryName"
                required
              />
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
            <div className="modal-action">
              <label htmlFor="AddCategoryModal" className="btn">
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
  setNewCategory: PropTypes.func,
};

export default AddBookModal;
