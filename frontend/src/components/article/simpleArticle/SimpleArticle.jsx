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
        <img className="simple-article-img" src={image} alt="" />
        <div className="article-content-container">
          <h4 className="simple-article-date">{date}</h4>
          <h2 className="simple-article-title">{title}</h2>
        </div>
      </a>
    </div>
  );
};

export default SimpleArticle;
