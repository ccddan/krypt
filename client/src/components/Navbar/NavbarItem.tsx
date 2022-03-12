export interface NavbarItemProps {
  title: string;
  classProps: string;
};

export const NavbarItem = (props: NavbarItemProps) => {
  return (
    <li className={`mx-4 cursor-pointer ${props.classProps} navbar-menu-item`}>
      {props.title}
    </li>
  );
};

export default NavbarItem;
