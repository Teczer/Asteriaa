import "./simplearticle.scss";

const SimpleArticle = ({ image, date, title, linkto }) => {
  return (
    <div className="simple-article">
      <a
        className="simple-article-link"
        href={linkto}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="simple-article-img"
          src={image}
          alt="cover-article"
          loading="lazy"
        />
        <div className="article-content-container">
          <span className="simple-article-date">{date}</span>
          <h2 className="simple-article-title">{title}</h2>
        </div>
      </a>
    </div>
  );
};

export default SimpleArticle;
