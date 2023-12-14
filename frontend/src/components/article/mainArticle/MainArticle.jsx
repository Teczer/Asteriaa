import "./mainarticle.scss";

const MainArticle = ({ image, title, sommaire, date, linkto }) => {
  return (
    <div className="main-article">
      <a
        className="main-article-link"
        href={linkto}
        target="_blank"
        rel="noreferrer"
      >
        <img className="main-article-img" src={image} alt="" />
        <span className="main-article-date">{date}</span>
        <h2 className="main-article-title">{title}</h2>
        <p className="main-article-sommary">{sommaire}</p>
      </a>
    </div>
  );
};

export default MainArticle;
