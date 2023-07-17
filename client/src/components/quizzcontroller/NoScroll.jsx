import React, { useEffect } from "react";

const NoScroll = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
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
    }, 200);
  }, []);

  return <>{children}</>;
};

export default NoScroll;
