import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import AddCategoryModal from "./AddCategoryModal";
import { ThemeContext } from "../../../Providers/ThemeChangeProvider";
import CategoryRows from "./CategoryRows";
import EditCategoryModal from "./EditCategoryModal";
import axios from "axios";
import Swal from "sweetalert2";

const BookCategoryList = () => {
  // use theme context
  const { theme } = useContext(ThemeContext);
  // single product state
  const [showEdit, setShowEdit] = useState({});

  // get all books
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
  const [updateCategory, setUpdateCategory] = useState([]);

  // hot toaster
  const successNotify = () =>
    toast.success("Your Category Has Been Deleted!", {
      position: "top-right", // Set the position to top-right
    });

  // 1.show all user
  useEffect(() => {
    fetch("http://localhost:2000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [newCategory, updateCategory]);

  // 2.single category show
  const handleSingleCategoryEdit = (id) => {
    axios
      .get(`http://localhost:2000/category/${id}`)
      .then((res) => {
        setShowEdit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 3. delete product
  const handleDeleteCategory = (id) => {
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
        // 3.2 is confirm then deleted
        axios
          .delete(`http://localhost:2000/category/${id}`)
          .then((res) => {
            // 3.3 deleted successfully
            successNotify();
            setNewCategory(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      {/* heading */}
      <div className="page-header lg:flex gap-6 items-center ">
        <h2
          className={`text-xl md:text-2xl lg:text-3xl my-4 lg:my-8  ${
            theme === "light"
              ? "bg-white text-[#333333]"
              : "bg-[#1a2025] text-[#A6ADBA]"
          }  font-bold uppercase`}
        >
          Add Your <span className="text-[#E59285]">Category</span>
        </h2>
        {/* The button to open modal */}
        <label htmlFor="AddCategoryModal" className="btn">
          add Category
        </label>
      </div>

      {/* Toaster for notifications */}
      <Toaster />

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Category </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center text-[#6f7681] py-5 text-xl"
              >
                No books found
              </td>
            </tr>
          ) : (
            categories?.map((category, index) => (
              <CategoryRows
                handleSingleCategoryEdit={handleSingleCategoryEdit}
                handleDeleteCategory={handleDeleteCategory}
                category={category}
                rowNumber={index}
                key={category._id}
              />
            ))
          )}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>ID</th>
            <th>Category </th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>

      {/* add modal box */}
      <AddCategoryModal setNewCategory={setNewCategory} />
      {/* edit modal box */}
      <EditCategoryModal
        setUpdateCategory={setUpdateCategory}
        showEdit={showEdit}
      />
    </div>
  );
};

export default BookCategoryList;
