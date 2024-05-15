import {  useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"
import PropTypes from "prop-types"; // ES6
import { Navigate, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const AdminRoute = ({children}) => {

// use auth user
const {user} = useContext(AuthContext)
// user collection data
const dbuser = useLoaderData()
// filter the admin email
const adminUser = dbuser.filter(user => user.role === "librarian"  )

// get user email
const userEmail = user.email 
// get admin email
const adminEmail = adminUser[0].email
// if user email mathc with admin email
if (adminEmail === userEmail) {
  return children
    
}

//show error
Swal.fire({
    icon: "error",
    title: "Not Admin",
    text: "Hey, You are not admin!",
  });
  
// if not admin email equal user email
return <Navigate to={'/'}></Navigate>



}

AdminRoute.propTypes = {
    children: PropTypes.node,
  };

export default AdminRoute