import React from "react";
import SkeletonElement from "./SkeletonElement";

function ProfileSettingsSkeletons() {
  return (
    <>
      <div className="triple-article profile-settings">
        <header className="userSettings-header">
          <h1 className="userSettings-main-title">Paramètres</h1>
        </header>
        <div className="stack">
          <SkeletonElement type="property-container-skeleton">
            <SkeletonElement type="circle-profile superposed" />
            <div
              className="stack-skeleton-triple-article-text"
              style={{ width: "70%" }}
            >
              <SkeletonElement type="title superposed" />
              <SkeletonElement type="text superposed" />
            </div>
          </SkeletonElement>
        </div>
        <div className="stack">
          <SkeletonElement type="property-container-skeleton">
            <SkeletonElement type="circle-profile superposed" />
            <div
              className="stack-skeleton-triple-article-text"
              style={{ width: "70%" }}
            >
              <SkeletonElement type="title superposed" />
              <SkeletonElement type="text superposed" />
            </div>
          </SkeletonElement>
        </div>
        <div className="stack">
          <SkeletonElement type="property-container-skeleton">
            <SkeletonElement type="circle-profile superposed" />
            <div
              className="stack-skeleton-triple-article-text"
              style={{ width: "70%" }}
            >
              <SkeletonElement type="title superposed" />
              <SkeletonElement type="text superposed" />
            </div>
          </SkeletonElement>
        </div>
      </div>
    </>
  );
}

export default ProfileSettingsSkeletons;
