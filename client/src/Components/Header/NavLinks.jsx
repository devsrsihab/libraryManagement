import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
const NavLinks = () => {

    // use AuthContext
    const {  user,loading } = useContext(AuthContext);

  return (
    <>
      <li className="mr-12">
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li className="mr-12">
        <NavLink to={"/books"}>All Books</NavLink>
      </li>

      {
        loading ||
      
      <>
      {user ? (
        ""
      ) : (
        <>
          <li className="mr-12" >
            <NavLink to={"/register"}>Register</NavLink>
          </li>
          <li className="mr-12" >
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        </>
      )}
      </>
    }
    </>
  );
};

export default NavLinks;
