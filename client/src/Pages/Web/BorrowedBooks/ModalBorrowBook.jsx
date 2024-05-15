import PropTypes from "prop-types"; // ES6

import { useContext, useRef } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const ModalBorrowBook = ({ book, setQty, qty }) => {
  // use auth context
  const { user } = useContext(AuthContext); // modal open or not
  const modalRef = useRef();
  const formRef = useRef();

  // borrow book data
  const { _id, image, name, Category } = book;
  console.log(_id);

  // notifications
  const successNotify = () =>
    toast.success(`Your Have Borrowd ${name} !`, {
      position: "bottom-right", // Set the position to top-right
    });
  // if the user already borrowed
  const alreadyNotify = () =>
    toast.error(`Your Have Already Borrowd ${name} !`, {
      position: "bottom-right", // Set the position to top-right
    });
  // if the user already borrowed
  const invlaidReturnNotify = () =>
    toast.error(`Your Return Date Must Be Upto Current Date !`, {
      position: "bottom-right", // Set the position to top-right
    });

  // borrow hanlder
  const handleBorrow = (e) => {
    e.preventDefault();

    const form = e.target;

    // const returnDate = `${dd}/${mm}/${yyy}`;
    const userName = user.displayName;
    const email = user.email;

    // date formating
    const currentDate = moment().format("MMM Do YYYY, HH:mm:ss A");
    const borrowedDate = moment().format("MMM Do YYYY, HH:mm:ss A"); // 11th/Nov/2023, 01:20:00 AM
    const returnDate = moment(form.returnDate.value, "YYYY-MM-DD").format(
      "MMM Do YYYY, HH:mm:ss A"
    );

    // Convert Moment objects to timestamps in milliseconds
    const formattedReturnDate = moment(returnDate, "MMM Do YYYY, HH:mm:ss A");
    const formattedCurrentDate = moment(currentDate, "MMM Do YYYY, HH:mm:ss A");

    // date validation
    if (formattedReturnDate.isSameOrBefore(formattedCurrentDate)) {
      invlaidReturnNotify();
      return false;
    }

    if (!formattedReturnDate.isSameOrBefore(formattedCurrentDate)) {
      // date collection
      const borrowdCollection = {
        bookName: name,
        bookId: _id,
        userName,
        email,
        image,
        Category,
        borrowedDate,
        returnDate,
      };

      // makeing  the reqesti
      axios
        .post(
          `https://boighore.vercel.app/addToBorrow/${email}/${_id}`,
          borrowdCollection
        )
        .then((resutl) => {
          console.log(resutl);
          modalRef.current.checked = false; // Close the modal after successful submission
          form.reset();
          // show toaster
          successNotify();
          setQty(qty - 1);
        })
        .catch((err) => {
          console.log(err);
          // if the user already borrowed
          console.log(err.response.status);
          if (err.response.status === 409) {
            alreadyNotify();
          }
        });
    }
  };

  return (
    <>
      {/* toaster */}
      <Toaster />
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="BorrowBookModal"
        className="modal-toggle"
        ref={modalRef}
      />

      <div className="modal">
        <div className="modal-box">
          <form
            ref={formRef}
            id="returnDateForm"
            onSubmit={handleBorrow}
            className="card-body space-y-4 "
          >
            <div className="form-control">
              <label htmlFor="returnDate" className="label">
                <span className="label-text">Return Date</span>
              </label>
              <input
                type="date"
                placeholder="Return Date"
                className="input input-bordered"
                name="returnDate"
                id="returnDate"
                required
              />
            </div>
            <div className="modal-action">
              <label
                onClick={() => {
                  formRef.current.reset();
                }}
                htmlFor="BorrowBookModal"
                className="btn hover:bg-red-500 bg-red-500 text-white"
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

ModalBorrowBook.propTypes = {
  book: PropTypes.object,
  setQty: PropTypes.func,
  qty: PropTypes.number,
};

export default ModalBorrowBook;
