import SectionHeading from "../../Shared/SectionHeading";
import BookCard from "../../Shared/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../Shared/Container";
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
        <div className=" inner-section w-[100%] mx-auto">
          {/* section header */}
          <SectionHeading title="products" highlightTitle="category" />

          {/* categories items */}
          <div
            // data-aos="fade-up"
            // data-aos-anchor-placement="bottom-bottom"
            className=" grid gap-6 grid-cols-1 sm:grid-cols-2  md:grid-cols-3  2xl:grid-cols-4 "
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
      </Container>
    </div>
  );
};

export default Categories;
