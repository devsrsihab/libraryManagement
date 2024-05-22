import SectionHeading from "../../Shared/SectionHeading";
import BookCard from "../../Shared/BookCard";
import { useEffect, useState } from "react";
import Container from "../../Shared/Container";

const NewBooks = () => {
  // book new book data
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="dark:bg-slate-800">
      <Container>
        <div className="bg-[#F9F9F9] dark:bg-slate-800 books py-12">
          <div className="inner-section ">
            {/* section header */}
            <SectionHeading
              className=" text-white"
              title="new"
              highlightTitle="books"
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
      </Container>
    </div>
  );
};

export default NewBooks;
