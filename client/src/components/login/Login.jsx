import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import { useLogin } from "../../../hooks/useLogin";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, isLoading } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await login(email, password);
	};
	return (
		<main className="login-screen">
			{/* 	<img
				src="https://res.cloudinary.com/dw3mwclgk/image/upload/v1670710895/launchlogo_3x_gw4cwy.png"
				alt="Asterialogo"
			/> */}
			<h1>
				Bienvenue sur <span className="asteria-name"> Asteria </span>,
				veuillez-vous{" "}
				<span>
					{" "}
					<Link to="/" style={{ color: "var(--lavender-blush)" }}>
						{" "}
						authenthifiez{" "}
					</Link>{" "}
				</span>
			</h1>
			<section className="loginform-container">
				<div id="login">
					<form
						className="login-form" /* onSubmit={this.onSubmit} */
						onSubmit={handleSubmit}
					>
						<span className="fa fa-user" />
						<input
							// rome-ignore lint/a11y/noAutofocus: <explanation>
							autoFocus
							maxLength="25"
							/* onChange={this.handleChange.bind(this, "email")} */
							placeholder="Email"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							/* value={this.state.user.email} */
							required
						/>
						<span className="fa fa-lock" />
						<input
							autoComplete="off"
							maxLength="12"
							/* onChange={this.handleChange.bind(this, "password")} */
							placeholder="Mot de passe"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							/* value={this.state.user.password} */
							required
						/>
						<input type="submit" value="Se connecter" disabled={isLoading} />
						{error && (
							<div className="error" style={{ color: "red" }}>
								{error}
							</div>
						)}
					</form>
				</div>
				<div className="notmember-container">
					<p>
						Pas membre ? <a href="/signup">Inscription</a>{" "}
						<span className="fa fa-arrow-right" />
					</p>
				</div>
			</section>
		</main>
	);
}

export default Login;
