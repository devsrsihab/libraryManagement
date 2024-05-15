import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Admin/Sidebar";
import Navbar from "../Components/Header/Navbar";

const AdminLayouts = () => {
  return (
    <>
      <div className="main flex gap-10 ">
        <div className="sidebar ">
          <Sidebar />
        </div>
        <div className="admin-outlet h-screen w-full ">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayouts;
