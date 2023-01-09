import "./mainarticle.scss";

const MainArticle = ({ image, title, sommaire, date, linkto }) => {
	return (
		<div className="main-article">
			<a href={linkto} target="_blank" rel="noreferrer">
				<img src={image} alt="" />
				<h4>{date}</h4>
				<h2>{title}</h2>
				<p>{sommaire}</p>
			</a>
		</div>
	);
};

export default MainArticle;
