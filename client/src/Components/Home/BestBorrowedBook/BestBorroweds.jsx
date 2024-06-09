import SectionHeading from "../../Shared/SectionHeading";
import BookCard from "../../Shared/BookCard";
import { useEffect, useState } from "react";
import Container from "../../Shared/Container";
import axiosReq from "../../../utils/axios";

const BestBorroweds = () => {
  // book new book data
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosReq
      .get("/books")
      .then((res) => {
        setBooks(res.data); // Assuming the data is in res.data
      })
      .catch((error) => {
        console.error("Error retrieving books:", error);
      });
  }, []);

  return (
    <div className="dark:bg-slate-800">
      <Container>
        <div className="bg-white dark:bg-slate-800 books py-12">
          <div className="inner-section ">
            {/* section header */}
            <SectionHeading
              className="w-[50%] mx-auto text-white"
              title="best"
              highlightTitle="borrowed"
            />
            {/* books items */}
            <div className=" grid gap-6 grid-cols-1 sm:grid-cols-2  md:grid-cols-3  2xl:grid-cols-4 ">
              {books
                ?.filter((book) => book.quantity > 10)
                .slice(0, 4)
                .map((book) => (
                  <BookCard
                    key={book.image}
                    image={book.image}
                    title={book.name}
                    category={book.category}
                    author={book.author}
                    rating={book.rating}
                    buttonText={"See Details"}
                    badgeText="new"
                    cardLink={`/book/${book._id}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BestBorroweds;
