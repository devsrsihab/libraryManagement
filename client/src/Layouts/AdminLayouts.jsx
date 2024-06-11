import { Outlet } from "react-router-dom";
import DarkSidebar from "../Components/Admin/DarkSidebar";

const AdminLayouts = () => {
  return (
    <>
      <DarkSidebar>
        <Outlet />
      </DarkSidebar>
    </>
  );
};

export default AdminLayouts;
