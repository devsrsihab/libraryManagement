import PropTypes from "prop-types"; // ES6
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";
import axiosReq from "../../../utils/axios";

const EditCategoryModal = ({ showEdit, setUpdateCategory }) => {
  // modal openor not
  const modalRef = useRef();
  // hot toaster
  const successNotify = () =>
    toast.success("Your Category Has Been Updated!", {
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
    const categoryName = form.categoryName.value;
    const image = form.image.value;
    // collect all of form value in a object
    const formCollection = {
      categoryName,
      image,
    };
    handleModalClose(form.reset());

    // make a axios post reques
    axiosReq
      .put(`/category/${showEdit._id}`, formCollection)
      .then((res) => {
        form.reset();
        console.log(res.data);
        setUpdateCategory(res.data);
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
        id="EditCategoryModal"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal">
        <Toaster />
        <div className="modal-box">
          <form onSubmit={handleEditBookForm} className="card-body space-y-4 ">
            <div className="form-control">
              <label htmlFor="categoryName" className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                defaultValue={showEdit?.categoryName}
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
                defaultValue={showEdit?.image}
                type="text"
                className="input input-bordered mb-3"
                placeholder="Image URL"
                name="image"
                id="image"
                required
              />
            </div>

            <div className="modal-action">
              <label
                onClick={handleModalClose}
                htmlFor="EditCategoryModal"
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
EditCategoryModal.propTypes = {
  showEdit: PropTypes.object,
  setUpdateCategory: PropTypes.func,
};
export default EditCategoryModal;
