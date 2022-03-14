import "@testing-library/jest-dom";

import {
  render,
  screen,
} from "@project/tests/utils";

import Services from "./Services";

describe("renders content", () => {
  test("should have h1 header with text", () => {
    render(<Services/>);

    let header = screen.getByRole('heading', { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent!.startsWith("Services that we continue")).toBe(true);
  });

  test("should have 3 service cards", () => {
    render(<Services/>);

    let items = screen.getAllByRole("heading", {level: 3}); // service cards have a h3 for its title
    expect(items.length).toBe(3);
  });
});
