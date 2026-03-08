// src/components/Logo.jsx
import React from "react";
import ewucseLogo from "../assets/ewucscLogo.jpg";

const Logo = ({ className = "h-12 w-12" }) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={ewucseLogo}
        className={`${className} rounded-lg object-contain shadow-lg shadow-primary/40`}
        alt="EWUCSC Logo"
      />
      <span className="hidden sm:inline-block font-bold text-xl tracking-tight text-primary ">
        EWUCSC
        <span className="text-secondary text-sm block -mt-1 tracking-tighter">
          Cyber Security Club
        </span>
      </span>
    </div>
  );
};

export default Logo;
