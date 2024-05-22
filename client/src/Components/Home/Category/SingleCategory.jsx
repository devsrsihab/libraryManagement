import { useLoaderData, useParams } from "react-router-dom";
import BookCard from "../../Shared/BookCard";
import SectionHeading from "../../Shared/SectionHeading";

const SingleCategory = () => {
  // const get params
  const params = useParams();
  const books = useLoaderData();
  console.log(books);

  return (
    <div
      style={{
        background: `url(${"CategorieBg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center ",
        backgroundRepeat: "no-repeat",
      }}
      className="categories py-12"
    >
      <div className="inner-section w-[80%] mx-auto">
        {/* section header */}
        <SectionHeading
          className="w-[50%] mx-auto"
          title={params.category.replace(/-/g, " ")}
          highlightTitle="category"
        />

        {/* categories items */}
        <div
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-bottom"
          className={`my-16 ${
            books.length === 0 ? "grid-cols-1" : "grid-cols-4 gap-6 "
          } grid  `}
        >
          {books.length === 0 ? (
            <div className="text-center bg-base-400">
              {" "}
              <h1 className="py-10 text-2xl text-white text-center ">
                No books found
              </h1>{" "}
            </div>
          ) : (
            books?.map((book) => (
              <BookCard
                key={book._id}
                image={book.image}
                title={book.name}
                category={book.category}
                rating={book.rating}
                buttonText="See More"
                author={book.authorName}
                cardLink={`/book/${book._id}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCategory;
