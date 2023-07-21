import React from "react";
import "./skeleton.scss";

function SkeletonElement({ type, children }) {
  const classes = `skeleton ${type}`;
  return <div className={classes}>{children}</div>;
}

export default SkeletonElement;
