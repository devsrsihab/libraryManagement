import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AddBookModal from "./AddBookModal";
import { ThemeContext } from "../../../Providers/ThemeChangeProvider";
import BookRow from "./BookRow";
import EditBookModal from "./EditBookModal";
import Swal from "sweetalert2";
import axiosReq from "../../../utils/axios";

const BooksList = () => {
  // single product state
  const [showEdit, setShowEdit] = useState({});
  // get all books
  const [books, setBooks] = useState([]);
  const [newNooks, setnewNooks] = useState([]);
  const [updateBook, setUpdateBook] = useState([]);
  // use theme context
  const { theme } = useContext(ThemeContext);
  // hot toaster
  const successNotify = () =>
    toast.success("Your Book Has Been Deleted!", {
      position: "top-right", // Set the position to top-right
    });

  // 1.show all user
  useEffect(() => {
    axiosReq
      .get("/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.error("Error retrieving books:", error);
      });
  }, [newNooks, updateBook]);

  // 2.single product show
  const handleSingleProductEdit = (id) => {
    axiosReq
      .get(`/book/${id}`)
      .then((res) => setShowEdit(res.data))
      .catch((err) => console.log(err));
  };

  // 3. delete product
  const handleDeleteBook = (id) => {
    // 3.1 delete confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosReq
          .delete(`/book/${id}`)
          .then((res) => {
            successNotify();

            setnewNooks(res.data);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      {/* heading */}
      <div className="page-header lg:flex gap-6 items-center ">
        <h2
          className={` text-xl md:text-2xl   lg:text-3xl my-4 lg:my-8 ${
            theme === "light"
              ? "bg-white text-[#333333]"
              : "bg-[#1a2025] text-[#A6ADBA]"
          }  font-bold uppercase`}
        >
          Add Your <span className="text-[#E59285]">Book</span>
        </h2>
        {/* The button to open modal */}
        <label htmlFor="addBookModal" className="btn">
          add book
        </label>
      </div>
      <Toaster /> {/* Moved Toaster outside of table */}
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center text-[#6f7681] py-5 text-xl"
              >
                No books found
              </td>
            </tr>
          ) : (
            books?.map((book, index) => (
              <BookRow
                handleSingleProductEdit={handleSingleProductEdit}
                handleDeleteBook={handleDeleteBook}
                book={book}
                rowNumber={index}
                key={book._id}
              />
            ))
          )}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
      {/* add modal box */}
      <AddBookModal setnewNooks={setnewNooks} />
      {/* edit modal bos */}
      <EditBookModal setUpdateBook={setUpdateBook} showEdit={showEdit} />
    </div>
  );
};

export default BooksList;
