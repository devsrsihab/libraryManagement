import BestBorroweds from "../../Components/Home/BestBorrowedBook/BestBorroweds";
import Categories from "../../Components/Home/Category/Categories";
import HeroSection from "../../Components/Home/HeroSection";
import NewBooks from "../../Components/Home/NewBooks/NewBooks";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* hero section */}
      <HeroSection />
      {/* categories */}
      <Categories />
      {/* bbest borrowe */}
      <BestBorroweds />
      {/* new Book  */}
      <NewBooks />
    </div>
  );
};

export default Home;
