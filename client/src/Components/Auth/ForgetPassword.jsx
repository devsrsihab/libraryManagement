import { sendPasswordResetEmail } from "firebase/auth";
import { useRef, useState } from "react";
import auth from "./firebase";

const ForgetPassword = () => {
  //  email field validation
  const [errros, setErrors] = useState("");
  const [success, setSuccess] = useState("")
  // email ref
  const emailRef = useRef(null);
  /// handleForgetPassword
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // reset
    setErrors("");

    if (0 === email.length) {
      setErrors("Please Enter Your Email");
      return;
    } else if (!emailRegex.test(email)) {
      setErrors("Invalide email Email");
      return;
    }

     //sendPasswordResetEmail
     sendPasswordResetEmail(auth, email)
     .then(response => {
        console.log(response);
        setSuccess('A Reset Link Has been sent successfully on your email')
     })
     .catch(err => {
        const errorMessage = err.message;
        console.error(errorMessage);
        console.error(err);
     })
  };

  return (
    <div className="  bg-base-200">
      <div className="hero-content ">
        <div className="card  w-1/2 shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={emailRef}
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control my-6">
              <div
                className={
                  errros ? "text-red-500 mb-5 " : "text-green-500 mb-5 "
                }
              >
                {errros && errros.replace("Firebase:", "Your")}
                {success && success}
              </div>
              <button
                onClick={handleForgetPassword}
                className="btn btn-primary"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
