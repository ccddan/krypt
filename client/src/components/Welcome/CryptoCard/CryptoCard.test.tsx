import "@testing-library/jest-dom";

import CryptoCard, { CryptoCardProps } from "./CryptoCard";

import { getByText } from "@testing-library/dom";
import { render } from "@project/tests/utils";

describe("renders content", () => {
  test("card with default values", () => {
    let props: CryptoCardProps = {
      account: "",
      balance: "",
    };
    const { container } = render(<CryptoCard {...props} />);

    expect(getByText(container, "0x000000000000000000000")).toBeInTheDocument();
    expect(getByText(container, "N/A")).toBeInTheDocument();
  });

  test("card with non-default values", () => {
    let props: CryptoCardProps = {
      account: "0x123456789",
      balance: "1234.56789",
    };
    const { container } = render(<CryptoCard {...props} />);

    expect(getByText(container, props.account)).toBeInTheDocument();
    expect(getByText(container, `${props.balance}`)).toBeInTheDocument();
  });
});
