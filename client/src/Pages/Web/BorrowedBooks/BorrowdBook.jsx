import PropTypes from "prop-types"; // ES6
import { useContext } from "react";
import Swal from "sweetalert2";
import { ThemeContext } from "../../../Providers/ThemeChangeProvider";
import { Link } from "react-router-dom";
import axios from "axios";

const BorrowedBook = ({
  title = "",
  readBtnLink = "",
  image = "",
  _id = "",
  bookdId = "",
  category = "",
  borrowedDate = "",
  borrowedReturnDate = "",
  setBorrowUpdate,
}) => {
  //  handler book return
  const handleReturn = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Return it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://boighore.vercel.app/borrowed/${bookdId}/${_id}`)
          .then((res) => {
            console.log(res.data);

            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Returned!",
                text: "Your Book has been Returned.",
                icon: "success",
              });
              setBorrowUpdate(true);
              return true;
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  // use theme context
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme === "light" ? "text-black bg-white " : "text-white bg-black"
      } relative overflow-hidden  rounded-md border`}
    >
      {/* image */}
      <div className="bookCover h-[300px] ">
        <img
          src={image}
          alt="Laptop"
          className="h-full w-full rounded-t-md object-contain "
        />
      </div>

      <div className="body mt-5 p-4 space-y-3 ">
        {/* card title */}
        <h1
          className={`title inline-flex ${
            theme === "light" ? "text-black " : "text-white"
          } capitalize items-center text-lg font-semibold`}
        >
          {title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1={7} y1={17} x2={17} y2={7} />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </h1>

        {/* category and author */}
        <div className="property space-y-3 ">
          {/* categorie */}
          {category ? (
            <div className="category capitalize">
              <span
                className={`mr-2 inline-block rounded-full ${
                  theme === "light"
                    ? "bg-white text-gray-900"
                    : "bg-black text-white"
                } py-1 text-[14px] font-semibold `}
              >
                Category:
              </span>
              <span
                className={`mb-2 mr-2 uppercase inline-block rounded ${
                  theme === "light"
                    ? "bg-gray-100 text-gray-900"
                    : "bg-black text-white"
                }  px-3 py-1 text-[10px] font-semibold `}
              >
                {category}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* // borrowed */}
        <div className="borrowed-date gap-4">
          <div className="row">
            {borrowedDate ? (
              <div className="borrowd-date capitalize">
                <span
                  className={`mr-2 inline-block rounded-full ${
                    theme === "light"
                      ? "bg-white text-gray-900"
                      : "bg-black text-white"
                  } py-1 text-[14px] font-semibold `}
                >
                  Borrowed Date:
                </span>
                <span
                  className={`mb-2 mr-2 uppercase inline-block rounded ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-black text-white"
                  }  px-3 py-1 text-[10px] font-semibold `}
                >
                  {borrowedDate}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            {borrowedReturnDate ? (
              <div className="borrowed-by  capitalize">
                <span
                  className={`mr-2 inline-block rounded-full ${
                    theme === "light"
                      ? "bg-white text-gray-900"
                      : "bg-black text-white"
                  } py-1 text-[14px] font-semibold `}
                >
                  Return Date:
                </span>
                <span
                  className={`mb-2 mr-2 uppercase inline-block rounded ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-black text-white"
                  }  px-3 py-1 text-[10px] font-semibold `}
                >
                  {borrowedReturnDate}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* button */}
        <div className="buttons flex gap-6">
          <button
            onClick={handleReturn}
            type="button"
            className="mt-4 w-full capitalize rounded-sm bg-primary  px-2 py-1.5 text-lg  text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Return
          </button>

          <Link
            to={readBtnLink}
            className="mt-4 w-full inline-block text-center capitalize rounded-sm bg-accent  px-2 py-1.5 text-lg text-white shadow-sm hover:bg-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Read
          </Link>
        </div>
      </div>
    </div>
  );
};

BorrowedBook.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  category: PropTypes.string,
  borrowedDate: PropTypes.string,
  _id: PropTypes.string,
  bookdId: PropTypes.string,
  readBtnLink: PropTypes.string,
  borrowedReturnDate: PropTypes.string,
  setBorrowUpdate: PropTypes.func,
};
export default BorrowedBook;
