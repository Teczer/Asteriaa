import React, { useEffect } from "react";

const NoScroll = ({ children }) => {
  useEffect(() => {
    const disableScroll = (e) => {
      e.preventDefault();
    };

    document.body.style.overflow = "hidden";
    document.body.addEventListener("touchmove", disableScroll, {
      passive: false,
    });

    return () => {
      document.body.style.overflow = "visible";
      document.body.removeEventListener("touchmove", disableScroll);
    };
  }, []);

  return <>{children}</>;
};

export default NoScroll;
