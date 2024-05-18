import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../../Providers/AuthProvider";
import { ThemeContext } from "../../Providers/ThemeChangeProvider";
const Navbar = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the duration (in milliseconds)
    });
  }, []);

  // use AuthContext
  const { logOut, user, loading } = useContext(AuthContext);
  // theme context
  const { theme } = useContext(ThemeContext);
  // navigate
  const navigation = useNavigate();
  // handle logout
  const handleLogout = () => {
    // logout
    logOut()
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        navigation("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <>
      {/* // navbar */}

      <header
        className={`${
          theme === "light" ? "text-slate-700" : "text-white"
        }  container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:overflow-visible lg:items-center`}
      >
        <Link
          to="/"
          className="flex items-center whitespace-nowrap text-2xl font-black"
        >
          <span className="mr-2 w-12-">
            <img
              className="w-full h-full object-cover"
              src="https://i.ibb.co/qpGgxkp/bookstor-compact-MConverter-eu.png"
              alt=""
            />
          </span>
        </Link>
        <input type="checkbox" className="peer hidden" id="navbar-open" />

        <label
          className="absolute top-5 right-5 cursor-pointer lg:hidden"
          htmlFor="navbar-open"
        >
          <svg
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>

        <nav
          aria-label="Header Navigation"
          className="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center transition-all lg:ml-24 overflow-hidden lg:overflow-visible lg:max-h-full lg:flex-row"
        >
          <div className=" mr-12  lg:hidden lg:p-0 p-4 border flex flex-col justify-center items-center">
            <span>{user?.displayName}</span>
            <span>{user?.email}</span>
            <span onClick={handleLogout}>Log Out</span>
          </div>
          <ul className="flex w-full z-[99999999] flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
            <NavLinks />
          </ul>
          <hr className="mt-4 w-full lg:hidden" />

          {/* <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0"> */}
          <ul className="mt-4 flex sm:mt-0">
            {loading || (
              <>
                {user ? (
                  <li className="ml-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                    <details className="dropdown">
                      <summary className="m-1 btn">
                        <div className="bg-red w-10 h-10 rounded-full cursor-pointer">
                          <img
                            id="avatarButton"
                            type="button"
                            className="w-full rounded-full h-full object-cover"
                            src={user?.photoURL}
                            alt="User dropdown"
                          />
                        </div>
                      </summary>

                      <ul
                        style={{ right: "-55%" }}
                        className={`p-2  w-80 shadow absolute ${
                          theme === "light"
                            ? "bg-primary  text-white"
                            : "bg-black text-white border"
                        }  menu dropdown-content z-[1] rounded-box `}
                      >
                        <li>
                          <a>{user?.displayName}</a>
                        </li>
                        <li>
                          <a>{user?.email}</a>
                        </li>
                        <li onClick={handleLogout}>
                          <a>log out</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                ) : (
                  ""
                )}
              </>
            )}

            <li className="ml-8 flex  cursor-pointer items-center justify-center rounded-xl  text-gray-600 hover:text-black hover:shadow">
              <div className="themeToggler p-0 w-16 flex items-center active:bg-red-500 mx-4 ">
                <ThemeToggle />
              </div>
            </li>
          </ul>
          {/* </div> */}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
