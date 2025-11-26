import React from "react";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      navbar
      <main>{children}</main>
      footer
    </div>
  );
};

export default LandingPageLayout;
