import React from "react";
import Header from "./_components/header";
import DesktopSideBar from "./_components/desktopSideBar";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-7xl h-full px-5">
        <Header/>
      <div className="flex items-start h-full md:space-x-5">
        <DesktopSideBar/>
        {children}
      </div>
    </div>
  );
};

export default PlatformLayout;
