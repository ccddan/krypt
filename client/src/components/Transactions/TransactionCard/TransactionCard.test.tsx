import "@testing-library/jest-dom";

import TransactionCard, { TransactionCardProps } from "./TransactionCard";

import { getByText } from "@testing-library/dom";
import { render } from "@project/tests/utils";

describe("renders content", () => {
  test("card with specified values", () => {
    let props: TransactionCardProps = {
      id: "custom-id",
      url: "random-url",
      message: "hello world!",
      timestamp: "8756238457",
      addressFrom: "0x1234567890",
      amount: "1.1",
      addressTo: "0x0987654321",
    };
    const { container } = render(<TransactionCard {...props} />);

    expect(getByText(container, props.addressFrom)).toBeInTheDocument();
    expect(getByText(container, props.addressTo)).toBeInTheDocument();
    expect(
      getByText(container, `Amount: ${props.amount} ETH`)
    ).toBeInTheDocument();
    expect(
      getByText(container, `Message: ${props.message}`)
    ).toBeInTheDocument();
    expect(getByText(container, props.timestamp)).toBeInTheDocument();
  });
});
