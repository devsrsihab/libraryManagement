import { useContext, useEffect, useState } from "react";
import brrowedBookBG from "../../../../public/brrowedBookBG.svg";
import BorrowedBook from "./BorrowdBook";
import { ThemeContext } from "../../../Providers/ThemeChangeProvider";
import axios from "axios";
import { AuthContext } from "../../../Providers/AuthProvider";
import noDataFound from "../../../../public/noDataFound.png";
const BorrowdBooks = () => {
  // use theme context
  const { theme } = useContext(ThemeContext);
  // use auth context
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  // borrowd book
  const [borrowds, setBorrowds] = useState([]);
  const [borrowUpdate, setBorrowUpdate] = useState(false);

  // useEffect
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `https://boighore.vercel.app/borrlowed?email=${user.email}`,
          { withCredentials: true }
        );
        setBorrowds(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getOrders();
  }, [setBorrowds, user.email, borrowUpdate]);

  return (
    <div
      style={{
        background: `url(${theme === "light" ? brrowedBookBG : ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center ",
        backgroundRepeat: "no-repeat",
      }}
      className="books py-12"
    >
      <div className="inner-section w-[80%] text-white mx-auto">
        {/* section header */}
        <div className="w-[50%] mx-auto text-center">
          <h2
            data-aos="fade-down"
            className="text-3xl  my-8  font-bold uppercase"
          >
            {" "}
            All Borrowed Books
          </h2>
          <p data-aos="fade-up">
            you can see all borrowd books here and can return
          </p>
        </div>
        {/* books items */}
        <div
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-bottom"
          className={`my-16 grid ${
            borrowds.length === 0
              ? "grid-cols-1"
              : "my-16 grid gap-6 grid-cols-1 sm:grid-cols-2  md:grid-cols-3  2xl:grid-cols-4 "
          } gap-6 `}
        >
          {loading ? (
            <div className="loader h-96 flex items-center justify-center ">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : borrowds.length === 0 ? (
            <div className="noDatafoun h-screen ">
              {" "}
              <img
                className="h-full w-full object-contain "
                src={noDataFound}
                alt="no-data-found"
              />
            </div>
          ) : (
            borrowds?.map((borrow) => (
              <BorrowedBook
                key={borrow._id}
                _id={borrow._id}
                bookdId={borrow.bookId}
                image={borrow.image}
                title={borrow.bookName}
                category={borrow.category}
                borrowedDate={borrow.borrowedDate}
                borrowedReturnDate={borrow.borrowedReturnDate}
                readBtnLink={`/bookRead/${borrow.bookId}`}
                setBorrowUpdate={setBorrowUpdate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowdBooks;
