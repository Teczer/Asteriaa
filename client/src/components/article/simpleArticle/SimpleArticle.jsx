import "./simplearticle.scss";

const SimpleArticle = ({ image, date, title, linkto }) => {
	return (
		<div className="simple-article">
			<a href={linkto} target="_blank" rel="noreferrer">
				<img src={image} alt="" />
				<div className="article-content-container">
					<h4>{date}</h4>
					<h2>{title}</h2>
				</div>
			</a>
		</div>
	);
};

export default SimpleArticle;
