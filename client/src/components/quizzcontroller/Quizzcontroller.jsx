import "./quizzcontroller.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "./questionCard/QuestionCard";
import QuestionAnswerCard from "./questionAnswerCard/QuestionAnswerCard";
import QuizzResult from "./quizzResult/QuizzResult";
import { Link, useParams } from "react-router-dom";

function Quizzcontroller() {
	const [posts, setPosts] = useState([]);
	const params = useParams();
	useEffect(() => {
		axios
			.get(
				`http://146.59.150.192:3000/${params.quizzType}0${params.quizzProgression}`,
			)
			.then((res) => {
				console.log(res);
				setPosts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const [CorrectAns, setCorrectAns] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [clicked, setClicked] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentQuestion1, setCurrentQuestion2] = useState(1);
	const [questionCardDisplay, setQuestionCardDisplay] = useState("flex");
	const [questionAnswerCardDisplay, setQuestionAnswerCardDisplay] =
		useState("none");
	const [goodAnswerColorEffect, setGoodAnswerColorEffect] =
		useState("var(--oxford-blue)");
	const [activeAnswer, setActiveAnswer] = useState();

	const toChangeColorGreen = (question) => {
		if (question.isCorrect === true) {
			setGoodAnswerColorEffect("green");
		} else {
			setGoodAnswerColorEffect("red");
		}
	};

	const hanldleAnswrOption = (isGood) => {
		if (isGood === true) {
			setCorrectAns(CorrectAns + 1);
		}
	};

	const handleNextOption = () => {
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < posts.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowResult(true);
		}
		const nextQuestion1 = currentQuestion1 + 1;
		setCurrentQuestion2(nextQuestion1);
		setGoodAnswerColorEffect("var(--oxford-blue)");
	};

	const displayFromQuestionToAnswer = () => {
		setQuestionCardDisplay("none");
		setQuestionAnswerCardDisplay("flex");
	};

	const displayFromAnswerToQuestion = () => {
		setQuestionCardDisplay("flex");
		setQuestionAnswerCardDisplay("none");
	};

	const backToHomeAlert = () => {
		alert("Retourner à la page d'accueil ?");
	};

	const [displayModalQuit, setDisplayModalQuit] = useState("none");
	const displayModalQuitQuizz = () => {
		setDisplayModalQuit("flex");
	};
	const hideModalQuitQuizz = () => {
		setDisplayModalQuit("none");
	};
	return (
		<div className="quizzcontroller">
			{/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
			{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="backToHomeContainer"
				onClick={() => {
					displayModalQuitQuizz();
				}}
			>
				<i className="fa-solid fa-circle-chevron-left" />
			</div>

			<div className="backToHomeModal" style={{ display: displayModalQuit }}>
				<h3>Êtes vous sûr de vouloir retourner à l'accueil ?</h3>
				<a href="/">
					<input type="submit" value="QUITTER" />
				</a>
				{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					className="cancelBackToHome"
					onClick={() => {
						hideModalQuitQuizz();
					}}
				>
					<input type="submit" value="ANNULER" />
				</div>
			</div>

			{showResult ? (
				<QuizzResult CorrectAns={CorrectAns} />
			) : (
				<>
					{/* rome-ignore lint/complexity/useOptionalChain: <explanation> */}
					{posts &&
						posts
							.slice(currentQuestion, currentQuestion1)
							.map((post, index) => (
								// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<div key={index}>
									<QuestionCard
										photoQuestion={post.photoQuestion}
										questionValue={post.questionValue}
										questionOptions={post.questionOptions}
										chiffre={currentQuestion + 1}
										handleNextOption={handleNextOption}
										hanldleAnswrOption={hanldleAnswrOption}
										questionCardDisplay={questionCardDisplay}
										displayFromQuestionToAnswer={displayFromQuestionToAnswer}
										goodAnswerColorEffect={goodAnswerColorEffect}
										toChangeColorGreen={toChangeColorGreen}
										activeAnswer={activeAnswer}
										changeActiveAnswer={(questionAnswer) =>
											setActiveAnswer(questionAnswer)
										}
									/>
								</div>
							))}
				</>
			)}

			{/* rome-ignore lint/complexity/useOptionalChain: <explanation> */}
			{posts &&
				posts.slice(currentQuestion, currentQuestion1).map((post, index) => (
					// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index}>
						<QuestionAnswerCard
							photoAnswer={post.photoAnswer}
							answerName={post.answerName}
							handleNextOption={handleNextOption}
							answerExplanation={post.answerExplanation}
							questionAnswerCardDisplay={questionAnswerCardDisplay}
							displayFromAnswerToQuestion={displayFromAnswerToQuestion}
						/>
					</div>
				))}
		</div>
	);
}

export default Quizzcontroller;
