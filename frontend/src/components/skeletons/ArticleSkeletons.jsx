import React from "react";
import SkeletonElement from "./SkeletonElement";

function ArticleSkeletons() {
  return (
    <>
      <div className="main-article">
        <SkeletonElement type="thumbnail" />
        <div className="main-article-link">
          <SkeletonElement type="text" />
          <SkeletonElement type="title" />
          <SkeletonElement type="title" />
        </div>
      </div>
      <div className="triple-article">
        <div className="stack">
          <SkeletonElement type="thumbnail" />
          <div className="stack-skeleton-triple-article-text">
            <SkeletonElement type="text" />
            <SkeletonElement type="title" />
            <SkeletonElement type="title" />
          </div>
        </div>
        <div className="stack">
          <SkeletonElement type="thumbnail" />
          <div className="stack-skeleton-triple-article-text">
            <SkeletonElement type="text" />
            <SkeletonElement type="title" />
            <SkeletonElement type="title" />
          </div>
        </div>
        <div className="stack">
          <SkeletonElement type="thumbnail" />
          <div className="stack-skeleton-triple-article-text">
            <SkeletonElement type="text" />
            <SkeletonElement type="title" />
            <SkeletonElement type="title" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleSkeletons;
