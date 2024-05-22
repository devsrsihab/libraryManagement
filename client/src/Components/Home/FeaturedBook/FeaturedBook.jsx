import { bookCoverCss } from "../../../utils/bookCss";
import BookButton from "../../Shared/BookButton";
import Container from "../../Shared/Container";

// https://i.ibb.co/cNhgDFL/thumb-2173.png
// https://i.ibb.co/7jcsCxt/thumb-2129.png
const FeaturedBook = () => {
  return (
    <Container>
      <div className=" flex gap-3">
        <div className="item">
          <div className="main_area  border border-[#70707017] bg-[#F5F5EC] rounded-lg flex items-center min-h-[300px]">
            <div className="left_row w-[50%] ">
              <div style={bookCoverCss} className="book">
                <img
                  src="https://i.ibb.co/7jcsCxt/thumb-2129.png"
                  alt="featured-book"
                />
              </div>
            </div>

            <div className="right_row w-[50%] text-right pr-7 pt-5 pb-5 ">
              <div className="book_content ">
                <span className="bg-[#FFDF74] capitalize font-bold text-[10px] text-black px-[12px] py-[5px] rounded-md">
                  book of the day
                </span>
                <h2 className="text-title mb-2 font-bold text-3xl">
                  SIDE HUSTLE - From Idea to Inc
                </h2>
                <p className="text-subtitle mb-3 text-xs ">
                  by Chris Guillebeau
                </p>
                <BookButton btnText="start learning" btnBgColor="bg-primary" />
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="main_area  border border-[#70707017] bg-[#F5F5EC] rounded-lg flex items-center min-h-[300px]">
            <div className="left_row w-[50%] ">
              <div style={bookCoverCss} className="book">
                <img
                  src="https://i.ibb.co/cNhgDFL/thumb-2173.png"
                  alt="featured-book"
                />
              </div>
            </div>

            <div className="right_row w-[50%] text-right pr-7 pt-5 pb-5 ">
              <div className="book_content ">
                <span className="bg-[#FFDF74] capitalize font-bold text-[10px] text-black px-[12px] py-[5px] rounded-md">
                  book of the day
                </span>
                <h2 className="text-title mb-2 font-bold text-3xl">
                  SIDE HUSTLE - From Idea to Inc
                </h2>
                <p className="text-subtitle mb-3 text-xs ">
                  by Chris Guillebeau
                </p>
                <BookButton btnText="start learning" btnBgColor="bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FeaturedBook;
