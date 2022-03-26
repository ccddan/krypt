import "@testing-library/jest-dom";

import NavbarItem, { NavbarItemProps } from "./NavbarItem";
import { render, screen } from "@project/tests/utils";

describe("renders content", () => {
  test("title and class are included", () => {
    const props: NavbarItemProps = {
      title: "Hello World!",
      classProps: "custom-class",
    };
    render(<NavbarItem {...props} />);

    let item = screen.getByRole("listitem");

    expect(item.textContent).toEqual(props.title);
    expect(item.className.includes(props.classProps)).toBe(true);
  });
});
