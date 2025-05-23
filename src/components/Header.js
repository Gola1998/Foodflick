import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

export const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();

  return (
    <div className="w-full bg-white shadow-md px-4 py-3 flex flex-wrap items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex-shrink-0 mb-2 sm:mb-0">
        <Link to="/">
          <img className="w-24 md:w-28" src={LOGO_URL} alt="Logo" />
        </Link>
      </div>

      {/* Navigation + Button + Online Status */}
      <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base font-semibold text-gray-800">
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-4">
          <Link className="px-2 py-1 rounded hover:bg-orange-500 hover:text-white transition" to="/">Home</Link>
          <Link className="px-2 py-1 rounded hover:bg-orange-500 hover:text-white transition" to="/about">About</Link>
          <Link className="px-2 py-1 rounded hover:bg-orange-500 hover:text-white transition" to="/contact">Contact</Link>
          {/* <Link className="px-2 py-1 rounded hover:bg-orange-500 hover:text-white transition" to="/grocery">Grocery</Link> */}
          <Link className="px-2 py-1 rounded hover:bg-orange-500 hover:text-white transition" to="/cart">Cart</Link>
        </div>

        {/* Login Button */}
        <button
          className="px-4 py-2 border border-orange-500 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          onClick={() =>
            setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login")
          }
        >
          {btnNameReact}
        </button>

        {/* Online Status */}
        <span
          className="text-xl select-none"
          title={onlineStatus ? "Online" : "Offline"}
        >
          {onlineStatus ? "🟢" : "🔴"}
        </span>
      </div>
    </div>
  );
};

export default Header;
