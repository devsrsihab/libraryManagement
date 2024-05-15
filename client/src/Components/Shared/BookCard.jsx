import Rating from "react-rating";
import PropTypes from "prop-types"; // ES6
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../Providers/ThemeChangeProvider";

const BookCard = ({
  title = "",
  image = "",
  rating = "",
  category = "",
  quantity = "",
  author = "",
  borrowedDate = "",
  borrowedReturnDate = "",
  borrowedBy = "",
  isBorrowed = false,
  badgeText = "",
  cardLink = "",
  buttonText = "",
  seeButtonText = "",
  seeButtonLInk = "",
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme === "light" ? "text-black bg-white " : "text-white bg-black"
      } relative flex flex-col overflow-hidden  rounded-md border  `}
    >
      {
        //  product badge
        badgeText ? (
          <span
            className="absolute capitalize w-24  bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-sm text-black text-center top-0
        left-0 translate-y-4  -translate-x-6 -rotate-45 "
          >
            {badgeText}
          </span>
        ) : (
          ""
        )
      }

      {/* image */}
      <div className="bookCover  sm:h-[300px] ">
        <img
          src={image}
          alt="Laptop"
          className="h-full w-full rounded-t-md  sm:object-cover"
        />
      </div>
      <div className="flex flex-col grow mt-5 p-4 space-y-3 ">
        {/* card title */}
        <h1 className="title inline-flex capitalize items-center text-lg font-semibold">
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
                    ? "text-black bg-white "
                    : "text-white bg-black "
                }  py-1 text-[14px] font-semibold text-gray-900`}
              >
                Category:
              </span>
              <span
                className={` mr-2 uppercase inline-block rounded ${
                  theme === "light"
                    ? "text-gray-900 bg-primary/30 "
                    : "text-white bg-black "
                } px-3 py-1 text-[10px] font-semibold `}
              >
                {category}
              </span>
            </div>
          ) : (
            ""
          )}
          {/* author */}
          {author ? (
            <div className="author capitalize">
              <span
                className={`mr-2 inline-block rounded-full ${
                  theme === "light"
                    ? "text-black bg-white "
                    : "text-white bg-black "
                }  py-1 text-[14px] font-semibold text-gray-900`}
              >
                Author:
              </span>
              <span
                className={` mr-2 uppercase inline-block rounded ${
                  theme === "light"
                    ? "text-gray-900 bg-primary/30 "
                    : "text-white bg-black "
                } px-3 py-1 text-[10px] font-semibold `}
              >
                {author}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="property space-y-3 ">
          {/* categorie */}
          {quantity ? (
            <div className="category capitalize">
              <span
                className={`mr-2 inline-block rounded-full ${
                  theme === "light"
                    ? "text-black bg-white "
                    : "text-white bg-black "
                }  py-1 text-[14px] font-semibold text-gray-900`}
              >
                Quantity:
              </span>
              <span
                className={` mr-2 uppercase inline-block rounded ${
                  theme === "light"
                    ? "text-gray-900 bg-primary/30 "
                    : "text-white bg-black "
                } px-3 py-1 text-normal font-semibold `}
              >
                {quantity}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>





        {isBorrowed ? (
          // borrowed
          <div className="borrowed-date flex gap-4">
            <div className="row">
              {borrowedDate ? (
                <div className="borrowd-date mt-4 capitalize">
                  <span
                    className={`mr-2 inline-block rounded-full ${
                      theme === "light"
                        ? "text-black bg-white "
                        : "text-white bg-black "
                    }  py-1 text-[14px] font-semibold text-gray-900`}
                  >
                    Borrowed Date:
                  </span>
                  <span
                    className={` mr-2 uppercase inline-block rounded ${
                      theme === "light"
                        ? "text-gray-900 bg-primary/30 "
                        : "text-white bg-black "
                    } px-3 py-1 text-[10px] font-semibold `}
                  >
                    {borrowedDate}
                  </span>
                </div>
              ) : (
                ""
              )}
              {borrowedBy ? (
                <div className="borrowed-by mt-4 capitalize">
                  <span
                    className={`mr-2 inline-block rounded-full ${
                      theme === "light"
                        ? "text-black bg-white "
                        : "text-white bg-black "
                    }  py-1 text-[14px] font-semibold text-gray-900`}
                  >
                    Borrowed By:
                  </span>
                  <span
                    className={` mr-2 uppercase inline-block rounded ${
                      theme === "light"
                        ? "text-gray-900 bg-primary/30 "
                        : "text-white bg-black "
                    } px-3 py-1 text-[10px] font-semibold `}
                  >
                    {borrowedBy}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="row">
              {borrowedReturnDate ? (
                <div className="borrowed-by mt-4 capitalize">
                  <span
                    className={`mr-2 inline-block rounded-full ${
                      theme === "light"
                        ? "text-black bg-white "
                        : "text-white bg-black "
                    }  py-1 text-[14px] font-semibold text-gray-900`}
                  >
                    Borrowed Return:
                  </span>
                  <span
                    className={` mr-2 uppercase inline-block rounded ${
                      theme === "light"
                        ? "text-gray-900 bg-primary/30 "
                        : "text-white bg-black "
                    } px-3 py-1 text-[10px] font-semibold `}
                  >
                    {borrowedReturnDate}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* rating */}
        {rating ? (
          <div className="ratin flex items-center gap-4 ">
            <span>Rating: </span>
            <Rating
              className="text-yellow-500"
              fractions={10}
              initialRating={rating}
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
        ) : (
          ""
        )}

        {/* buttons */}
        <Link to={cardLink}>
          <button
            type="button"
            className={`mt-4 w-full capitalize ${
              theme === "light"
                ? "text-black bg-primary hover:bg-primary/80 focus-visible:outline-primary"
                : "text-white bg-black border"
            }   rounded-sm  px-2 py-1.5 text-lg font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
          >
            {buttonText}
          </button>
        </Link>
        {seeButtonLInk ? (
          <Link to={seeButtonLInk}>
            <button
              type="button"
              className={`mt-4 w-full capitalize ${
                theme === "light"
                  ? "text-black bg-primary hover:bg-primary/80 focus-visible:outline-primary"
                  : "text-white bg-black border"
              }   rounded-sm  px-2 py-1.5 text-lg font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
            >
              {seeButtonText}
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

BookCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  rating: PropTypes.string,
  category: PropTypes.string,
  author: PropTypes.string,
  borrowedDate: PropTypes.string,
  borrowedBy: PropTypes.string,
  buttonText: PropTypes.string,
  quantity: PropTypes.string,
  badgeText: PropTypes.string,
  cardLink: PropTypes.string,
  seeButtonText: PropTypes.string,
  seeButtonLInk: PropTypes.string,
  borrowedReturnDate: PropTypes.string,
  isBorrowed: PropTypes.bool,
};
export default BookCard;
