import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";

import logo from "../../../images/logo.png";

export const NAV_MENU_ITEMS = Object.freeze([
  "Market",
  "Exchange",
  "Tutorials",
  "Wallet",
]);

interface NavbarItemProps {
  title: string;
  classProps: string;
}
const NavbarItem = (props: NavbarItemProps) => {
  return (
    <li className={`mx-4 cursor-pointer ${props.classProps} navbar-menu-item`}>
      {props.title}
    </li>
  );
};

const getNavbarItems = (classProps: string = "cursor-pointer") => {
  return NAV_MENU_ITEMS.map((label: string, idx: number) => (
    <NavbarItem key={`${label}${idx}`} title={label} classProps={classProps} />
  ));
};

export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {getNavbarItems("cursor-pointer hover:text-[#DEDEDE]")}
        <li className="bg-[#2952b3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <span
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
            data-testid="hide-menu-for-small-screen"
          >
            <AiOutlineClose size={28} />
          </span>
        ) : (
          <span
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
            data-testid="open-menu-for-small-screen"
          >
            <HiMenuAlt4 size={28} />
          </span>
        )}
        {toggleMenu && (
          <ul
            className="z-index-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-center rounded-md blue-glassmorphism text-white animate-slide-in"
            data-testid="menu-list-for-small-screens"
          >
            <li className="text-xl w-full my-2 cursor-pointer">
              <span
                onClick={() => setToggleMenu(false)}
                data-testid="hide-menu-for-small-screen-2"
              >
                <AiOutlineClose size={28} />
              </span>
            </li>
            {getNavbarItems(
              "my-2 text-xl hover:bg-[#000] w-full text-center rounded-md p-3 m-0"
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
