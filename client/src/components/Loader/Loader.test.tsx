import "@testing-library/jest-dom";

import { render } from "@project/tests/utils";

import Loader from "./Loader";

describe("renders content", () => {
  let _container: HTMLElement;

  beforeEach(() => {
    const { container } = render(<Loader />);
    _container = container;
  });

  test("infinite loader is present", () => {
    let menuItems = _container.getElementsByClassName("animate-spin");
    expect(menuItems.length).toEqual(1);
  });
});
