import PropTypes from "prop-types"; // ES6
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

const EditBookModal = ({ showEdit, setUpdateBook }) => {
  // modal open or not
  const modalRef = useRef();
  const [categories, setCategory] = useState([]);

  // Category List
  useEffect(() => {
    axios
      .get("http://localhost:2000/categories")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  // hot toaster
  const successNotify = () =>
    toast.success("Your Book Has Been Updated!", {
      position: "top-right", // Set the position to top-right
    });

  // handleModalClose
  const handleModalClose = (formVal) => {
    console.log(formVal);
  };

  // ADD BOOK FORM HANDLER
  const handleEditBookForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const authorName = form.authorName.value;
    const category = form.category.value;
    const quantity = parseInt(form.quantity.value);
    const shortDescription = form.shortDescription.value;
    const rating = form.rating.value;
    const image = form.image.value;
    // collect all of form value in a object
    const formCollection = {
      name,
      image,
      authorName,
      category,
      quantity,
      shortDescription,
      rating,
    };
    console.log(formCollection);
    handleModalClose(form.reset());

    // make an axios post request
    axios
      .put(`http://localhost:2000/book/${showEdit._id}`, formCollection)
      .then((res) => {
        form.reset();
        console.log(res.data);
        setUpdateBook(res.data);
        modalRef.current.checked = false; // Close the modal after successful submission
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
        id="EditBookModal"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal">
        <Toaster />
        <div className="modal-box">
          <form onSubmit={handleEditBookForm} className="card-body space-y-4 ">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={showEdit?.name}
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
                defaultValue={showEdit?.authorName}
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
              <select
                name="category"
                className="select w-full"
                defaultValue={showEdit?.category || ""}
              >
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
                defaultValue={showEdit?.quantity}
                type="number"
                placeholder="Quantity"
                className="input input-bordered"
                name="quantity"
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
                defaultValue={showEdit?.shortDescription}
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="image" className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                defaultValue={showEdit?.image}
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
                type="number"
                placeholder="Rating"
                className="input input-bordered mb-3"
                name="rating"
                id="rating"
                max={5}
                min={1}
                required
                defaultValue={showEdit?.rating}
              />
            </div>
            <div className="modal-action">
              <label
                onClick={handleModalClose}
                htmlFor="EditBookModal"
                className="btn"
              >
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

EditBookModal.propTypes = {
  showEdit: PropTypes.object,
  setUpdateBook: PropTypes.func,
};

export default EditBookModal;
