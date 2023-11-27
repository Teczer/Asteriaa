import "./cardQuizz.scss";

function CardQuizz({ src, label }) {
	return (
		<article>
			<img src={src} alt="soleil" />
			<div className="depliage">
				<p>Jouer</p>
			</div>
		</article>
	);
}

export default CardQuizz;
