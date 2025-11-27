import React from "react";
import Navbar from "./_components/navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
      footer
    </div>
  );
};

export default LandingPageLayout;
