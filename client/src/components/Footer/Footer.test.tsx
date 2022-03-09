import "@testing-library/jest-dom";

import { render } from "@project/tests/utils";
import {
  Matcher,
  SelectorMatcherOptions,
} from "@testing-library/react";

import Footer from "./Footer";

describe("renders content", () => {
  let _container: HTMLElement;
  let _getByText: (
    id: Matcher,
    options?: SelectorMatcherOptions | undefined
  ) => HTMLElement;

  beforeEach(() => {
    const { container, getByText } = render(<Footer />);
    _container = container;
    _getByText = getByText;
  });

  test("menu is included", () => {
    let menuItems = _container.getElementsByClassName("footer-menu-item");
    expect(menuItems.length).toEqual(4);

    expect(_getByText("Market")).toBeInTheDocument();
    expect(_getByText("Exchange")).toBeInTheDocument();
    expect(_getByText("Tutorials")).toBeInTheDocument();
    expect(_getByText("Wallets")).toBeInTheDocument();
  });

  test("contact info is included", () => {
    expect(_getByText("Come join us")).toBeInTheDocument();
    expect(_getByText("info@krypt.com")).toBeInTheDocument();
  });

  test("legal rights are included", () => {
    expect(_getByText("@krypt")).toBeInTheDocument();
    expect(_getByText("All rights reserved")).toBeInTheDocument();
  });
});
