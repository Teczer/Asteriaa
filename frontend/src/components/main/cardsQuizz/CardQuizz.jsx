import "./cardQuizz.scss";

function CardQuizz({ src }) {
  return (
    <article className="card-quizz-box">
      <img className="card-quizz-img" src={src} alt="soleil" />
      <div className="depliage">Jouer</div>
    </article>
  );
}

export default CardQuizz;
