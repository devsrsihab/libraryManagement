import { Outlet } from "react-router-dom";
import MenuNavbar from "../Components/Header/Navbar";
import Footer from "../Components/Footer/Footer";
import { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeChangeProvider";
const MainLayouts = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className="main ">
        <div
          className={`header sticky ${
            theme === "light" ? "bg-white text-black" : " bg-black text-white"
          }  top-0 z-[99999999] mx-auto`}
        >
          <MenuNavbar />
        </div>
        <div className="outlet mx-auto ">
          <Outlet />
        </div>
        <div className="footer mx-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayouts;
