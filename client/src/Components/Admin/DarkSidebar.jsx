import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FaHome,
  FaBook,
  FaUser,
  FaUsers,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../Providers/AuthProvider";

const adminNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: FaHome, current: false },
  { name: "Books", href: "/dashboard/booksList", icon: FaBook, current: false },
  {
    name: "Categories",
    href: "/dashboard/book/category",
    icon: FaUser,
    current: false,
  },
  {
    name: "Authors",
    href: "/dashboard/book/authors",
    icon: FaUsers,
    current: false,
  },
];

const customerNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: FaHome,
    current: false,
  },
  {
    name: "Borrowed Book",
    href: "/dashboard/borrowedBooks",
    icon: FaBook,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DarkSidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const base_url = import.meta.env.VITE_BASE_URL;


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${base_url}/users`); // Replace with your API endpoint
        const data = await response.json();

        // Set the user role based on the current user's email
        const currentUser = data.find((dbUser) => dbUser.email === user.email);
        setUserRole(currentUser?.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user.email, base_url]);

  const navigation =
    userRole === "librarian" ? adminNavigation : customerNavigation;

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <FaTimes
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://i.ibb.co/qpGgxkp/bookstor-compact-MConverter-eu.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item, index) => (
                        <NavLink
                          key={index}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )
                          }
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 bg-gray-700 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          {/* avatar image */}
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={user?.photoURL}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">
                            {user?.displayName.substring(0, 13) + "."}
                          </p>
                          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src="https://i.ibb.co/qpGgxkp/bookstor-compact-MConverter-eu.png"
                    alt="Your Company"
                  />
                </Link>
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {navigation.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )
                    }
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-4 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
              <a href="#" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    {/* avatar image */}
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {user?.displayName.substring(0, 13) + "."}
                    </p>
                    <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                {children}
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

DarkSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
