import { useLoaderData } from "react-router-dom";

const BookRead = () => {
  // book state
  const book = useLoaderData();

  console.log(book);

  return (
    <>
      <div className="p-10 my-20">
        <div className=" w-[80%] flex flex-col justify-center items-center gap-10  mx-auto text-center  ">

          <div className="thumbnail h-40  ">
            <img
              className="h-full object-cover "
              src={book.image}
              alt={book.name}
            />
          </div>

          <div className="title ">
            <h1 className="text-3xl font-bold text-white">{book.name}</h1>
          </div>

          <div className="descriptsfsdfion">
            <p className="text-white text-xl text-center  ">
              {book.shortDescription}
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default BookRead;
