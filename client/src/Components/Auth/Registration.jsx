import { Link, useNavigate } from "react-router-dom";
import signUp from "../../../public/signUp.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { ThemeContext } from "../../Providers/ThemeChangeProvider";
import { getAuth, updateProfile } from "firebase/auth";
import axiosReq from "../../utils/axios";

// import auth from "./firebase";

const Registration = () => {
  // use Authcontext
  const { createUser, signWithGoogle } = useContext(AuthContext);
  // use theme context
  const { theme } = useContext(ThemeContext);

  // navigation
  const navigation = useNavigate();

  // error sate
  const [registerErr, SetRegisterErr] = useState("");
  const [success, SetSuccess] = useState("");

  // state managment
  const [isoading, setIsloding] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  // hanle signup form
  const hanldeRegisterForm = (e) => {
    e.preventDefault();

    // first emapy the error and succes state
    SetRegisterErr("");
    SetSuccess("");

    // set loader true
    setIsloding(true);

    // catch the form value
    const form = e.target;
    const name = form.name.value;
    const profileImage = form.profileImage.value;
    const email = form.email.value;
    const password = form.password.value;
    const term = form.term.checked;
    const role = "customer";
    const userEmail = { email };

    // form data
    const collectFormData = {
      name,
      profileImage,
      email,
      role,
    };
    console.log(collectFormData);

    // error show for term
    if (!term) {
      SetRegisterErr("pLease Check Our Term and Condtion");
      setIsloding(false);
      return;
    }
    // error show for term
    if (!name) {
      SetRegisterErr("pLease fill Name Input");
      setIsloding(false);
      return;
    }
    // password error handle
    const pattern = "/^(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{8,26}$/";
    if (pattern.match(password)) {
      SetRegisterErr(
        "Your Password Al least 8 character and 1 Special Character"
      );
      setIsloding(false);

      return;
    }

    // after validation now register the user
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result;
        const displayName = name;
        const photoURL = profileImage;

        // if user exist
        if (user) {
          console.log("user exist");
          const auth = getAuth();

          // update user profile
          updateProfile(auth.currentUser, {
            //And Replace the PhotoURL with the desired Image
            displayName: displayName,
            photoURL: photoURL,
          })
            .then(() => {
              // Profile updated!
              console.log("Profile updated!");
            })
            .catch((error) => {
              // An error occurred
              console.log(error);
            });
        }

        // SAVE USER INFO IN DB
        axiosReq
          .post("/users", collectFormData)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });

        // generate jwt toekn
        axiosReq
          .post("/jwtToken", userEmail, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            navigation(`${location?.state ? location.state : "/"}`);
          })
          .catch((error) => {
            console.error(error);
          });

        SetSuccess("You have Registered Successfully");
        setIsloding(false);
        navigation(`${location?.state ? location.state : "/"}`);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        SetRegisterErr(error.message);
        setIsloding(false);
      });
  };

  // google sign in
  const handleGoogleSignIn = (e) => {
    e.preventDefault();

    signWithGoogle()
      .then((result) => {
        console.log("user sign up using google");

        // SAVE USER INFO IN DB
        const name = result.user.displayName;
        const profileImage = result.user.photoURL;
        const email = result.user.email;
        const role = "customer";
        // collect the data
        const collectFormData = {
          name,
          profileImage,
          email,
          role,
        };

        axiosReq
          .post("/users", collectFormData)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });

        // The signed-in user info.
        SetSuccess("You have Registered Successfully");
        setIsloding(false);
        // navigation(`${location?.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
        SetRegisterErr(error.message);
        setIsloding(false);
      });
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="h-full w-full rounded-md object-contain object-right-bottom "
              src={signUp}
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3
                className={` text-2xl md:text-3xl lg:text-4xl font-bold ${
                  theme === "light" ? "text-white" : "text-[#A6ADBA]"
                }`}
              >
                Sign up Boighor.com and Get Exclusive Collections
              </h3>
              <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Commercial License{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Unlimited Read{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    120+ Categoris{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    PDF Files Included{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto w-[80%] xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2
              className={` md:text-2xl text-xl  lg:text-3xl font-bold leading-tight ${
                theme === "light" ? "text-black" : "text-[#A6ADBA]"
              }  sm:text-4xl`}
            >
              Sign up
            </h2>
            <p
              className={`mt-2 text-base ${
                theme === "light" ? "text-gray-600" : "text-[#A6ADBA]"
              } `}
            >
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
            <form onSubmit={hanldeRegisterForm} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className={`text-base font-medium ${
                      theme === "light" ? "text-gray-600" : "text-[#A6ADBA]"
                    }`}
                  >
                    {" "}
                    Full Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      name="name"
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="profileImage"
                    className={`text-base font-medium ${
                      theme === "light" ? "text-gray-600" : "text-[#A6ADBA]"
                    }`}
                  >
                    {" "}
                    Profile Image link
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Profile Image link"
                      id="profileImage"
                      name="profileImage"
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`text-base font-medium ${
                      theme === "light" ? "text-gray-600" : "text-[#A6ADBA]"
                    }`}
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      name="email"
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className={`text-base font-medium ${
                        theme === "light" ? "text-gray-600" : "text-[#A6ADBA]"
                      }`}
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type={isShowPassword ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      name="password"
                    ></input>

                    <div
                      onClick={() => {
                        setIsShowPassword(!isShowPassword);
                      }}
                      className="icons absolute bottom-[30%] text-2xl cursor-pointer right-[5%]"
                    >
                      {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                  <div className="flex gap-2 ">
                    <input type="checkbox" name="term" id="term" />
                    <label className="label" htmlFor="term">
                      <span className="label-text">
                        Accept Our Term and Condition{" "}
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  {isoading && (
                    <span className="loading loading-bars loading-lg"></span>
                  )}
                  <div
                    className={`error text-sm ${registerErr && "text-red-700"}
                     ${success && "text-green-500"}  my-5`}
                  >
                    <h2>
                      {registerErr && registerErr.replace("Firebase:", "")}
                    </h2>
                    <h2>{success && success}</h2>
                  </div>
                  <button
                    type="submit"
                    className={`inline-flex w-full items-center justify-center rounded-md
                    ${
                      theme === "light"
                        ? "text-white hover:bg-primary/80 bg-primary"
                        : "text-[#A6ADBA] bg-black hover:bg-black "
                    } px-3.5 py-2.5 font-semibold leading-7 `}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className={`inline-flex w-full items-center justify-center rounded-md
                ${
                  theme === "light"
                    ? "text-white hover:bg-[#d34836]/80 bg-[#d34836]"
                    : " bg-[A6ADBA] border border-[#A6ADBA] text-[#A6ADBA] hover:bg-black "
                } px-3.5 py-2.5 font-semibold leading-7 `}
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
