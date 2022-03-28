import { BiSearchAlt } from "react-icons/bi";
import { BsShieldFillCheck } from "react-icons/bs";
import { RiHeart2Fill } from "react-icons/ri";
import ServiceCard from "./ServiceCard";

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
