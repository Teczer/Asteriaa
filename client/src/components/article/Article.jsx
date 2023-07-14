import "./article.scss";
import MainArticle from "./mainArticle/MainArticle";
import SimpleArticle from "./simpleArticle/SimpleArticle";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleSkeletons from "../skeletons/ArticleSkeletons";

const Article = ({ marginFix }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.spaceflightnewsapi.net/v3/articles")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <section className="article-section" style={{ marginTop: marginFix }}>
        <h1 className="category-title">Actualités</h1>
        <div className="articles-container">
          {posts &&
            posts
              .slice(0, 1)
              .map((post) => (
                <MainArticle
                  key={post.id}
                  image={post.imageUrl}
                  date={dayjs(post.publishedAt).format("MMMM DD, YYYY")}
                  title={post.title}
                  sommaire={post.summary}
                  linkto={post.url}
                />
              ))}

          <div
            className="triple-article"
            style={{ display: posts.length === 0 ? "none" : "flex" }}
          >
            {posts &&
              posts
                .slice(1, 4)
                .map((post) => (
                  <SimpleArticle
                    key={post.id}
                    image={post.imageUrl}
                    date={dayjs(post.publishedAt).format("MMMM DD, YYYY")}
                    title={post.title}
                    linkto={post.url}
                  />
                ))}
          </div>
          {posts.length === 0 && <ArticleSkeletons />}
        </div>
      </section>
    </>
  );
};

export default Article;
