import React, { useEffect } from "react";

const NoScroll = ({ children }) => {
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    document.body.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      document.body.removeEventListener("wheel", preventScroll);
    };
  }, []);

  return <>{children}</>;
};

export default NoScroll;
