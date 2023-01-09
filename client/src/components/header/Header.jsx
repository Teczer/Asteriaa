import { Link } from "react-router-dom";
import "./header.scss";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Header = () => {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	const handleClick = () => {
		logout();
	};

	return (
		<header>
			<a href="/">
				<img
					src="https://res.cloudinary.com/dw3mwclgk/image/upload/v1670528238/asteriaLogo_af3kfh.svg"
					alt="Asteria"
				/>
			</a>
			<div className="nav-input">
				<Link to="/">Accueil</Link>
				<Link to="quizz">
					Quizz <i className="fa-solid fa-chevron-down" />
				</Link>
				<Link to="news">Actualités</Link>
				{/* 				<a href="">Vidéos</a>
				<a href="">
					Gallerie <i className="fa-solid fa-chevron-down" />
				</a>
				<a href="">
					Magasin <i className="fa-solid fa-chevron-down" />
				</a> */}
			</div>
			{user && (
				<div className="logout-wrapper">
					<span style={{ color: "var(--lavender-blush)" }}>{user.email}</span>
					<input type="submit" value="SE DÉCONNECTER" onClick={handleClick} />
				</div>
			)}

			{!user && (
				<div className="authentification-wrapper">
					<Link className="signup" to="login">
						Connexion
					</Link>
					<Link className="login" to="signup">
						Inscription
					</Link>
				</div>
			)}
		</header>
	);
};

export default Header;
