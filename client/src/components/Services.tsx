import { ReactElement } from "react";

import { IconType } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";
import { BsShieldFillCheck } from "react-icons/bs";
import { RiHeart2Fill } from "react-icons/ri";

type ServiceCardProps = {
  title: string;
  subtitle: string;
  color: string;
  icon: ReactElement<IconType>;
};
const ServiceCard = (props: ServiceCardProps) => {
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

export const Services = () => {
  return (
    <div className="flex flex-col md:flex-row pb-10 w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4"></div>
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
          Services that we continue
          <br />
          to improve
        </h1>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          title="Security Guaranteed"
          subtitle="Security is guaranteed. We always maintain privacy while maintaining the quality of our products."
          color="bg-[#2952E3]"
          icon={<BsShieldFillCheck fontSize={12} className="text-white" />}
        />
        <ServiceCard
          title="Best exchange rates"
          subtitle="Security is guaranteed. We always maintain privacy while maintaining the quality of our products."
          color="bg-[#8945F8]"
          icon={<BiSearchAlt fontSize={12} className="text-white" />}
        />
        <ServiceCard
          title="Security Guaranteed"
          subtitle="Security is guaranteed. We always maintain privacy while maintaining the quality of our products."
          color="bg-[#F84550]"
          icon={<RiHeart2Fill fontSize={12} className="text-white" />}
        />
      </div>
    </div>
  );
};

export default Services;
