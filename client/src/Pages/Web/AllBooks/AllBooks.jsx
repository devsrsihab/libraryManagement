import SectionHeading from "../../../Components/Shared/SectionHeading.jsx";
import AllBooksBG from "../../../../public/AllBooksBG.svg";
import BookCard from "../../../Components/Shared/BookCard.jsx";
import { BiFilter } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const AllBooks = () => {
  // all books
  const booksData = useLoaderData();
  const [books, setBooks] = useState(booksData);
  // handleFilter
  const handleFilter = () => {
    const newBooks = books.filter((book) => parseInt(book.quantity) !== 0);
    setBooks(newBooks);
  };

  return (
    <div
      style={{
        background: `url(${AllBooksBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center ",
        backgroundRepeat: "no-repeat",
      }}
      className="books py-12"
    >
      <div className="inner-section w-[80%] mx-auto">
        {/* section header */}
        <SectionHeading
          className="w-[50%] mx-auto text-white"
          title="all"
          highlightTitle="books"
          details="all deferent book is here and also some new book in our library"
        />
        {/* books items */}
        <div className="books">
          <button
            onClick={handleFilter}
            className="btn bg-accent hover:bg-accent/70 text-white mt-6"
          >
            <BiFilter className="text-2xl" /> Filter{" "}
            <span className="mx-2 ">{books.length}</span>
          </button>

          <div className="my-16 grid gap-6 grid-cols-1 sm:grid-cols-2  md:grid-cols-3  2xl:grid-cols-4 ">
            {books?.map((book) => (
              <BookCard
                key={book._id}
                title={book.name}
                image={book.image}
                category={book.category}
                author={book.authorName}
                quantity={book.quantity}
                rating={book.rating}
                buttonText="update"
                cardLink="/admin/booksList"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
