import "@testing-library/jest-dom";

import Footer from "./Footer";
import { getByText } from "@testing-library/dom";
import { render } from "@project/tests/utils";

describe("renders content", () => {
  let _container: HTMLElement;

  beforeEach(() => {
    const { container } = render(<Footer />);
    _container = container;
  });

  test("menu is included", () => {
    let menuItems = _container.getElementsByClassName("footer-menu-item");
    expect(menuItems.length).toEqual(4);

    expect(getByText(_container, "Market")).toBeInTheDocument();
    expect(getByText(_container, "Exchange")).toBeInTheDocument();
    expect(getByText(_container, "Tutorials")).toBeInTheDocument();
    expect(getByText(_container, "Wallets")).toBeInTheDocument();
  });

  test("contact info is included", () => {
    expect(getByText(_container, "Come join us")).toBeInTheDocument();
    expect(getByText(_container, "info@krypt.com")).toBeInTheDocument();
  });

  test("legal rights are included", () => {
    expect(getByText(_container, "@krypt")).toBeInTheDocument();
    expect(getByText(_container, "All rights reserved")).toBeInTheDocument();
  });
});
