import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Providers/ThemeChangeProvider";
import { BiBook, BiCategory, BiSolidUserPlus, BiListUl } from "react-icons/bi";

const Sidebar = () => {
  // use theme context
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {/* component */}

      <div className="drawer-sr lg:hidden block ">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button"
            >
              <BiListUl />
            </label>
          </div>
          <div className="drawer-side absolute">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay ">

              </label>
            <div className="min-h-screen  lg:hidden shadow-xl flex flex-row bg-gray-100 ">
              <div
                className={`flex flex-col w-56 ${
                  theme === "light"
                    ? "bg-white text-gray-900"
                    : "bg-[#1a2025] text-[#A6ADBA]"
                } rounded-r-3xloverflow-hidden`}
              >
                <div className="lg:flex text-xl text-green-500 font-bold uppercase hidden  items-center justify-center h-20 shadow-md">
                  Admin Boighor
                </div>
                <ul className="flex flex-col py-4">
                  <li>
                    <Link
                      to="/admin"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                        <i className="bx bx-home" />
                      </span>
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/booksList"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                        <BiBook />
                      </span>
                      <span className="text-sm font-medium">Add Books</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/book/category"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                        <BiCategory />
                      </span>
                      <span className="text-sm font-medium">Book Category</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/book/authors"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                        <BiSolidUserPlus />
                      </span>
                      <span className="text-sm font-medium">Authors</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen  hidden shadow-xl lg:flex flex-row bg-gray-100 ">
        <div
          className={`flex flex-col w-56 ${
            theme === "light"
              ? "bg-white text-gray-900"
              : "bg-[#1a2025] text-[#A6ADBA]"
          } rounded-r-3xloverflow-hidden`}
        >
          <div className="flex text-xl text-green-500 font-bold uppercase  items-center justify-center h-20 shadow-md">
            Admin Boighor
          </div>
          <ul className="flex flex-col py-4">
            <li>
              <Link
                to="/admin"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 "
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-home" />
                </span>
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/booksList"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 "
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <BiBook />
                </span>
                <span className="text-sm font-medium">Add Books</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/book/category"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 "
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <BiCategory />
                </span>
                <span className="text-sm font-medium">Book Category</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/book/authors"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 "
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <BiSolidUserPlus />
                </span>
                <span className="text-sm font-medium">Authors</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
