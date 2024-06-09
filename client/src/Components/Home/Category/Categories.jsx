import SectionHeading from "../../Shared/SectionHeading";
// import BookCard from "../../Shared/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../Shared/Container";
import {VscArrowLeft , VscArrowRight } from "react-icons/vsc";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { IconContext } from "react-icons/lib";

const Categories = () => {
  // Category List
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2000/categories")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="categories bg-secondary/10   py-12">
      <Container>
        {/* // <BookCard
              //   key={category._id}
              //   image={category.image}
              //   title={category.categoryName}
              //   buttonText="Details"
              //   cardLink={`books/${category.categoryName
              //     .replace(/\s/g, "-")
              //     .replace(/-$/, "")}`}
              // /> */}

        <div className="inner-section w-[100%] mx-auto">
          {/* Section header */}
          <SectionHeading title="Products" highlightTitle="Category" />

          {/* Categories items */}
          <div className="categoryBooks">
            <Swiper
              slidesPerView={3}
              cssMode={true}
              navigation={{
                nextEl: ".sr-button-next",
                prevEl: ".sr-button-prev",
              }}
              pagination={{ clickable: true }}
              mousewheel={true}
              keyboard={true}
              spaceBetween={30} // Add space between slides (30px in this example)
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="categoryBooksSwiper mt-10"
            >
              {categories?.map((category) => (
                <SwiperSlide key={category._id} className="category_slide_item">
                  <img src={category.image} alt="slide_image" />
                  <div className="category_slide_caption">{category.name}</div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Navigation arrows */}
            {/* // In your component */}
            <IconContext.Provider value={{ color: "black", size: "34px" }}>
            <div className="slider_controll">
              <div className="sr-button-prev ">
                <VscArrowLeft className="curso-pointer" />
              </div>
              <div className="sr-button-next ">
                <VscArrowRight />
              </div>
            </div>
            </IconContext.Provider>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Categories;
