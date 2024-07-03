import SectionHeading from "../../Shared/SectionHeading";
import { useEffect, useState } from "react";
import Container from "../../Shared/Container";
import axiosReq from "../../../utils/axios";
import Category from "./Category";
import { Link } from "react-router-dom";

const Categories = () => {
  // Category List
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    axiosReq
      .get("/categories")
      .then((res) => setCategory(res.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="categories py-12">
      <Container>
        <div className="inner-section w-[100%] mx-auto">
          {/* Section header */}
          <SectionHeading title="Book Category" />

          {/* Categories items */}
          <div className="booke_cate_section flex gap-3  overflow-x-scroll ">
            {categories?.map((category) => (
              <Link key={category._id} to={`/books/${category.categoryName}`}>
                <Category category={category} />
              </Link>
            ))}

            {/* Navigation arrows */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Categories;
