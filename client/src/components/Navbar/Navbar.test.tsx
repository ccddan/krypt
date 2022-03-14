import "@testing-library/jest-dom";

import { render } from "@project/tests/utils";
import {
  getByRole,
  getByTestId,
  queryByTestId,
} from "@testing-library/dom";

import Navbar, { NAV_MENU_ITEMS } from "./Navbar";

describe("renders content", () => {
  let _container: HTMLElement;

  beforeEach(() => {
    const { container } = render(<Navbar />);
    _container = container;
  });

  test("logo is present", () => {
    let logo = getByRole(_container, "img");
    let logoAlt = logo.attributes.getNamedItem("alt");
    expect(logoAlt?.value).toEqual("logo");
  });

  test("navigation menu items for >= medium screen size are present", () => {
    let items = _container.getElementsByClassName("navbar-menu-item");
    expect(items.length).toEqual(NAV_MENU_ITEMS.length);
  });

  test("show navigation menu for small screens", () => {
    let showMenuSpan = getByTestId(_container, "open-menu-for-small-screen");
    let hideMenuSpan = queryByTestId(_container, "hide-menu-for-small-screen");
    let menuListSmallScreens = queryByTestId(
      _container,
      "menu-list-for-small-screens"
    );

    expect(showMenuSpan).toBeInTheDocument();
    expect(hideMenuSpan).toBeNull();
    expect(menuListSmallScreens).toBeNull();

    showMenuSpan.click();

    hideMenuSpan = getByTestId(_container, "hide-menu-for-small-screen");
    menuListSmallScreens = getByTestId(
      _container,
      "menu-list-for-small-screens"
    );
    expect(hideMenuSpan).toBeInTheDocument();
    expect(menuListSmallScreens).toBeInTheDocument();
  });

  test("hide navigation menu for small screens", async () => {
    let showMenuSpan = getByTestId(_container, "open-menu-for-small-screen");
    let menuListSmallScreens = queryByTestId(
      _container,
      "menu-list-for-small-screens"
    );

    expect(menuListSmallScreens).toBeNull();
    showMenuSpan.click();

    menuListSmallScreens = getByTestId(
      _container,
      "menu-list-for-small-screens"
    );
    let hideMenuSpan1 = getByTestId(_container, "hide-menu-for-small-screen");

    expect(menuListSmallScreens).toBeInTheDocument();
    expect(hideMenuSpan1).toBeInTheDocument();

    hideMenuSpan1.click();

    menuListSmallScreens = queryByTestId(
      _container,
      "menu-list-for-small-screens"
    );
    expect(menuListSmallScreens).toBeNull();

    showMenuSpan.click();

    menuListSmallScreens = getByTestId(
      _container,
      "menu-list-for-small-screens"
    );
    let hideMenuSpan2 = getByTestId(_container, "hide-menu-for-small-screen-2");

    expect(menuListSmallScreens).toBeInTheDocument();
    expect(hideMenuSpan2).toBeInTheDocument();

    hideMenuSpan2.click();

    menuListSmallScreens = queryByTestId(
      _container,
      "menu-list-for-small-screens"
    );
    expect(menuListSmallScreens).toBeNull();
  });
});
