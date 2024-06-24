import { Menu, Transition } from "@headlessui/react";
import { HiOutlineHome,HiLogout , HiChevronDown } from "react-icons/hi";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

export default function DropDownMenu({children}) {
  // use AuthContext
  const { logOut } = useContext(AuthContext);
  // navigate
  const navigation = useNavigate();
  // handle logout
  const handleLogout = () => {
    // logout
    logOut()
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        navigation("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div className="w-52 text-right ">
      <Menu as="div" className="__demoMode">
        <Menu.Button className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm font-semibold text-white shadow-innerfocus:bg-gray-700">
          {children}
          <HiChevronDown className="w-4 h-4 text-black/60" />
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-52 mt-2 origin-top-right rounded-xl border border-white/10 bg-gray-900 text-white shadow-lg focus:outline-none">
            <Menu.Item>
              <Link
                to={"/admin"}
                className="group transition-all duration-300 hover:bg-red-300 bg-gray-900 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <HiOutlineHome className="w-4 h-4 fill-white" />
                Dashboard
                <kbd className="ml-auto  text-xs text-black hover:text-white/50 group-focus:inline">
                  ⌘E
                </kbd>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={handleLogout}
                className="group hover:bg-red-300 transition-all duration-300 bg-gray-900 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <HiLogout className="w-4 h-4 fill-white" />
                Logout
                <kbd className="ml-auto  text-xs text-black hover:text-white/50 group-focus:inline">
                  ⌘El
                </kbd>
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

DropDownMenu.propTypes = {
  children: PropTypes.node.isRequired,
};
