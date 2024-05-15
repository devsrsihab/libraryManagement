import SectionHeading from "../../Shared/SectionHeading";
import CategorieBg from "../../../../public/categorie.svg";
import BookCard from "../../Shared/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";
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
    <div
      style={{
        background: `url(${CategorieBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center ",
        backgroundRepeat: "no-repeat",
      }}
      className="categories   py-12"
    >
      <div className="inner-section w-[80%] mx-auto">
        {/* section header */}
        <SectionHeading
          title="products"
          highlightTitle="category"
          details="There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form"
        />

        {/* categories items */}
        <div
          // data-aos="fade-up"
          // data-aos-anchor-placement="bottom-bottom"
          className="my-16 grid gap-6 grid-cols-1 sm:grid-cols-2  md:grid-cols-3  2xl:grid-cols-4 "
        >
          {categories?.map((category) => (
            <BookCard
              key={category._id}
              image={category.image}
              title={category.categoryName}
              buttonText="Details"
              cardLink={`books/${category.categoryName
                .replace(/\s/g, "-")
                .replace(/-$/, "")}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
