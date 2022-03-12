import { ReactElement } from "react";

import { IconType } from "react-icons";

export type ServiceCardProps = {
  title: string;
  subtitle: string;
  color: string;
  icon: ReactElement<IconType>;
};
export const ServiceCard = (props: ServiceCardProps) => {
  return (
    <div className="flex flex-row justify-center items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div
        className={`w-10 h-10 rounded-full flex justify-center items-center ${props.color}`}
      >
        {props.icon}
      </div>
      <div className="ml-5 flex flex-col flex-1">
        <h3 className="mt-2 text-white text-lg">{props.title}</h3>
        <p className="mt-2 text-white text-sm md:w-9/12">{props.subtitle}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
