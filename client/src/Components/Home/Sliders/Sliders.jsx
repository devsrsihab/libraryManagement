// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Sliders = () => {
  const sliders = [
    {
      title: "Books are the keys to ",
      highlightTitle: "wisdom  treasure",
      img: "https://i.ibb.co/qyRXPT1/slider3.jpg",
    },
    {
      title: "Reading is an adventure that ",
      highlightTitle: "never ends",
      img: "https://i.ibb.co/DY6ZH0Z/slider4.jpg",
    },
    {
      title: "A book is a gift you can open ",
      highlightTitle: "again and again",
      img: "https://i.ibb.co/5rCVYfH/slider5.jpg",
    },
    {
      title: "Books are the mirrors of ",
      highlightTitle: "the soul",
      img: "https://i.ibb.co/Pr992XC/slider6.jpg",
    },
    {
      title: "Readers are leaders- the ",
      highlightTitle: "key to success",
      img: "https://i.ibb.co/16JWfhs/slider7.jpg",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the duration (in milliseconds)
    });
  }, []);
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      style={{  zIndex: '99'  }}
    >
      {sliders.map((slider) => (
        <SwiperSlide
        
          key={slider.img}
          style={{ background: `url(${slider.img})` }}
          className={`"slider  relative w-full min-h-[650px] bg-cover bg-no-repeat "`}
        >
          <div className="absolute w-full h-full   bg-black z-20 opacity-50"></div>
          <div data-aos="zoom-in" className="slider-content flex items-center flex-col gap-10 justify-center  relative min-h-[650px] w-[80%] mx-auto text-center z-50 ">
            <h2  className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[4.8rem] text-white uppercase">
              {slider.title}
              <span className="text-primary">{slider.highlightTitle}</span>
            </h2>
            <button className="btn bg-accent hover:bg-accent text-white ">
              Show All Books
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Sliders;
