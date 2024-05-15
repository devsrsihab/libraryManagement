import SectionHeading from "../../Shared/SectionHeading";
import newBook from "../../../../public/newBook.svg";
import BookCard from "../../Shared/BookCard";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../Providers/ThemeChangeProvider";

const NewBooks = () => {
  // use theme context
  const { theme } = useContext(ThemeContext);
  // book new book data
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div
      style={{
        background: `url(${theme === "light" ? newBook : ""})`,
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
          title="new"
          highlightTitle="books"
          details="There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form"
        />
        {/* books items */}
        <div
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-bottom"
          className="my-16 grid gap-8 grid-cols-1 sm:grid-cols-2  md:grid-cols-3  2xl:grid-cols-4  "
        >
          {books
            ?.filter((book) => book.quantity < 10)
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
  );
};

export default NewBooks;
