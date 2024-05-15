const BestBorrowed = () => {
  return (
    <div data-aos="zoom-in-down" className="book-card">
      <div className="card  bg-base-100 shadow-xl">
        <figure className="h-[300px]">
          <img
            className="w-full h-full object-cover"
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body justify-center items-center px-3 py-4">
          <h2 className="card-title">Shoes!</h2>
          <p className="text-center">
            If a dog chews shoes whose shoes does he choose?
          </p>
          <div className="card-actions ">
            <button className="btn bg-primary text-white">See Books</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestBorrowed;
