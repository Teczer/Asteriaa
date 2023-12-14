import "./cardQuizz.scss";

function CardQuizz({ src, isMobile }) {
  return (
    <article className="card-quizz-box">
      <img
        className={`card-quizz-img ${isMobile ? "lazy-load" : ""}`}
        loading={isMobile ? "lazy" : "eager"}
        src={src}
        alt="soleil"
      />
      <div className="depliage">Jouer</div>
    </article>
  );
}

export default CardQuizz;
