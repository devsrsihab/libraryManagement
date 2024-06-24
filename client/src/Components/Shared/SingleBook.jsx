import { BiBookAdd, BiBook } from "react-icons/bi";
import ModalBorrowBook from "../../Pages/Web/BorrowedBooks/ModalBorrowBook";
import { useContext, useState } from "react";
import { ThemeContext } from "../../Providers/ThemeChangeProvider";
import { useLoaderData } from "react-router-dom";
import Rating from "react-rating";
import toast from "react-hot-toast";

const SingleBook = () => {
  const { theme } = useContext(ThemeContext);
  const book = useLoaderData();
  const [qty, setQty] = useState(book.quantity);

  // if the user already borrowed
  const checkQty = () =>
    toast.error("The book haven't enough quantity!", {
      position: "bottom-right",
    });

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <nav className="flex ">
          <ol role="list" className="flex items-center">
            <li className="text-left">
              <div
                className={`-m-1 ${
                  theme === "light"
                    ? "text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                    : " "
                }`}
              >
                <a
                  href="#"
                  className={`rounded-md p-1 text-sm font-medium ${
                    theme === "light" ? "" : ""
                  } `}
                >
                  {"Home"}
                </a>
              </div>
            </li>
            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <a
                    href="#"
                    className={`rounded-md p-1 text-sm font-medium ${
                      theme === "light" ? "" : ""
                    } `}
                  >
                    {"book"}
                  </a>
                </div>
              </div>
            </li>
            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <a
                    href="#"
                    className={`rounded-md p-1 text-sm font-medium ${
                      theme === "light" ? "text-[#ce887e]" : "text-white"
                    } `}
                    aria-current="page"
                  >
                    {book.name}
                  </a>
                </div>
              </div>
            </li>
          </ol>
        </nav>
        <div className="mt-8 flex m-auto items-center  gap-8 lg:mt-12 ">
          {/* product image */}
          <div className="">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 w-96 lg:ml-5">
                <div className=" overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full max-w-full object-cover"
                    src={book.image}
                    alt={book.name}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h1
              className={`sm: text-2xl capitalize font-bold ${
                theme === "light" ? "text-gray-900" : ""
              }  sm:text-3xl`}
            >
              {book.name}
            </h1>
            <div className="mt-5 flex items-center">
              <div className="flex items-center">
                <Rating
                  className="text-yellow-500"
                  fractions={10}
                  initialRating={book.rating}
                  readonly
                  emptySymbol={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  }
                  fullSymbol={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              </div>
              <p
                className={`ml-2 text-sm font-medium ${
                  theme === "light" ? "text-gray-600" : ""
                } `}
              >
                1,209 Reviews
              </p>
            </div>

            {/* book infos */}
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              {/* categorie */}
              <div className="category capitalize">
                <span
                  className={`inline-block rounded-full ${
                    theme === "light" ? "bg-white text-gray-900" : ""
                  }  py-1 text-lg font-semibold `}
                >
                  Category:
                </span>
                <span
                  className={`mr-2 uppercase inline-block rounded  px-3 py-1 text-normal ${
                    theme === "light" ? "text-gray-900" : ""
                  } `}
                >
                  {book.category}
                </span>
              </div>
              {/* author */}
              <div className="author capitalize">
                <span
                  className={`inline-block rounded-full ${
                    theme === "light" ? "bg-white text-gray-900" : ""
                  }  py-1 text-lg font-semibold `}
                >
                  author:
                </span>
                <span
                  className={`mr-2 uppercase inline-block rounded  px-3 py-1 text-normal ${
                    theme === "light" ? "text-gray-900" : ""
                  } `}
                >
                  {book.authorName}
                </span>
              </div>
            </div>

            {/* book quantity */}
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              {/* author */}
              <div className="quantity capitalize">
                <span
                  className={`inline-block rounded-full ${
                    theme === "light" ? "bg-white text-gray-900" : ""
                  }  py-1 text-lg font-semibold `}
                >
                  quantity:
                </span>
                <span
                  className={`mr-2 uppercase inline-block rounded  px-3 py-1 text-normal ${
                    theme === "light" ? "text-gray-900" : ""
                  } `}
                >
                  {qty}
                </span>
              </div>
            </div>

            <div className="mt-3 select-none ">
              {/* short description */}
              <div className="short-description capitalize">
                <span
                  className={`capitalize inline-block rounded ${
                    theme === "light" ? "text-gray-900" : ""
                  }   py-1 text-normal `}
                >
                  {book.shortDescription}
                </span>
              </div>
            </div>

            {/* borrow section */}
            <h2
              className={`mt-8 text-base ${
                theme === "light" ? "text-gray-900" : ""
              }  capitalize `}
            >
              borrow the book and read it
            </h2>

            <div className="mt-5 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              {/* buttons */}
              <div className="buttons flex gap-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-primary/80 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-primary"
                >
                  <BiBook className="text-2xl mr-3" />
                  Read
                </button>
                <button onClick={() => qty < 1 && checkQty()} type="button">
                  <label
                    htmlFor={qty > 0 ? "BorrowBookModal" : null}
                    className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-600 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 cursor-pointer"
                  >
                    <BiBookAdd className="text-2xl mr-3" />
                    Borrow
                  </label>
                </button>
              </div>
            </div>

            {/* extra options */}
            <ul className="mt-8 space-y-2">
              <li
                className={`flex items-center text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-600" : ""
                }`}
              >
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    className=""
                  />
                </svg>
                Free 5 Book Borrow
              </li>
              <li
                className={`flex items-center text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-600" : ""
                }`}
              >
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    className=""
                  />
                </svg>
                Read Anytime
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Borrow mdoal */}
      <ModalBorrowBook book={book} setQty={setQty} qty={qty} />
    </section>
  );
};

export default SingleBook;
