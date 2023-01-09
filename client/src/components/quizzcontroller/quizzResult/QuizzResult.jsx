import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./quizzresult.scss";
import { useAuthContext } from "../../../../hooks/useAuthContext";

function QuizzResult({ CorrectAns }) {
	const params = useParams();
	const { user } = useAuthContext();
	async function saveProgression() {
		console.log("wsh");
		const currentProgression = localStorage.getItem(params.quizzType);
		localStorage.setItem(params.quizzType, Number(params.quizzProgression) + 1);
		const quiZz = params.quizzType;
		const response = await axios.patch(
			"http://localhost:5001/workouts/63bbd758b9ea583d921f2721",
			{ [params.quizzType]: Number(params.quizzProgression) + 1 },
			{
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			},
		);
		console.log(response.data);
		console.log(params.quizzProgression);
	}

	useEffect(() => {
		saveProgression();
	}, []);
	return (
		<div className="quizzresult-container">
			<div className="total-result-wrapper">
				<h1>{CorrectAns} / 3</h1>
				<h2>bonnes réponses</h2>
			</div>
			<div className="btn-containerr">
				<div className="button-to-home">
					<Link to="/">Retourner à l'accueil</Link>
				</div>
				<div className="button-to-home">
					<a
						href={`/quizzcontroller/${params.quizzType}/${
							Number(params.quizzProgression) + 1
						}`}
					>
						Niveau suivant
					</a>
				</div>
			</div>
		</div>
	);
}

export default QuizzResult;
