import "@testing-library/jest-dom";

import { BsShieldFillCheck } from "react-icons/bs";

import {
  render,
  screen,
} from "@project/tests/utils";

import ServiceCard, { ServiceCardProps } from "./ServiceCard";

describe("renders content", () => {
  test("title and subtitle text and color class are present", () => {
    const props: ServiceCardProps = {
      title: "Security Guaranteed",
      subtitle: "Security is guaranteed. We always maintain privacy while maintaining the quality of our products.",
      color: "bg-[#2952E3]",
      icon: <BsShieldFillCheck fontSize={12} className="text-white" />,
    };

    let {container} = render(<ServiceCard {...props}/>);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.subtitle)).toBeInTheDocument();
    expect(container.getElementsByClassName(props.color).length).toBe(1);
  });
});
