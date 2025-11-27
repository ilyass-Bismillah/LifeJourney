import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="max-w-7xl p-5 z-50 mx-auto flex items-center flex-wrap md:justify-between justify-center md:space-y-0 space-y-3">
      <div className="flex items-center">
        <Image src="/script.png" alt="logo" width={50} height={50} />
        <h1 className="text-primary font-bold font-mono">LifeJourney</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant={"link"}>Privacy Policy</Button>
        <Button variant={"link"}>Terms of Service</Button>
      </div>
    </footer>
  );
};

export default Footer;
