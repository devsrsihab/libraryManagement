import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../../public/loginImg.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { ThemeContext } from "../../Providers/ThemeChangeProvider";
import axiosReq from "../../utils/axios";

const LoginForm = () => {
  // Authcontext use for login
  const { signInUser, signWithGoogle } = useContext(AuthContext);
  // theme context
  const { theme } = useContext(ThemeContext);

  // navigation
  const navigation = useNavigate();
  const location = useLocation();

  // success state
  const [success, setSuccess] = useState("");
  const [erros, setErrors] = useState("");
  // states
  const [isoading, setIsloding] = useState(false);

  // handle login form
  const handleLoginForm = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const userEmail = { email };

    // reset password
    setErrors("");
    setSuccess("");

    // signInWithEmailAndPassword
    signInUser(email, password)
      .then((success) => {
        const isEmailVerified = success.user.emailVerified;
        if (!isEmailVerified) {
          setErrors("Check Your Email inbox and Verify Your Email First");
        } else {
          setSuccess("Your Have login Succesfully");
        }
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
            console.error( error);
          });
      })

      .catch((err) => {
        setSuccess("");
        setErrors(err.message);
        console.log(err.message);
      });
  };

  // google sign in
  const handleGoogleSignIn = (e) => {
    e.preventDefault();

    signWithGoogle()
      .then((result) => {
        // The signed-in user info.
        setSuccess("Your Have login Succesfully");
        setIsloding(false);

        // generate jwt toekn
        const email = result?.user?.email;
        const userEmail = {email};
        axiosReq
          .post("/jwtToken", userEmail, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });

        navigation(`${location?.state ? location.state : "/"}`);
      })
      .catch((error) => {
        setErrors(error.message);
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
              src={loginImg}
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3 className=" text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Log In Boighor.com
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
              className={`text-3xl font-bold leading-tight ${
                theme === "light" ? "text-black" : "text-[#A6ADBA]"
              }  sm:text-4xl`}
            >
              Log In
            </h2>
            <p
              className={`mt-2 text-base ${
                theme === "light" ? "text-gray-600" : "text-[#A6ADBA]"
              } `}
            >
              Don not an account? <Link to="/register">Sign Up</Link>
            </p>
            <form onSubmit={handleLoginForm} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className={`text-base font-medium ${
                      theme === "light" ? "text-gray-600" : "text-[#A6ADBA]"
                    }`}
                  >
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
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
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                    ></input>
                  </div>
                </div>
                <div>
                  <div
                    className={
                      success ? "text-green-500 my-6" : "text-red-500 my-6"
                    }
                  >
                    {success && success}
                    {erros && erros.replace("Firebase:", "Your")}
                  </div>
                  <button
                    type="submit"
                    className={`inline-flex w-full items-center justify-center rounded-md
                    ${
                      theme === "light"
                        ? "text-white hover:bg-primary/80 bg-primary"
                        : "text-[#A6ADBA] bg-black  hover:bg-black "
                    } px-3.5 py-2.5 font-semibold leading-7 `}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              {isoading && (
                <span className="loading loading-bars loading-lg"></span>
              )}
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
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
