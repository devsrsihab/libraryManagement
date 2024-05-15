import BestBorroweds from "../../Components/Home/BestBorrowedBook/BestBorroweds";
import Categories from "../../Components/Home/Category/Categories";
import NewBooks from "../../Components/Home/NewBooks/NewBooks";
import Sliders from "../../Components/Home/Sliders/Sliders";
import StayWithUs from "../../Components/Home/StayWithUs";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* slider */}
      <Sliders />
      {/* categories */}
      <Categories />
      {/* stay with us   */}
      <StayWithUs />
      {/* bbest borrowe */}
      <BestBorroweds />
      {/* new Book  */}
      <NewBooks />
    </div>
  );
};

export default Home;
