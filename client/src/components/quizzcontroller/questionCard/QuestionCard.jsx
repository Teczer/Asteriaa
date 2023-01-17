import React from "react";
import "./questioncard.scss";

function QuestionCard({
	photoQuestion,
	questionValue,
	chiffre,
	questionOptions,
	handleNextOption,
	hanldleAnswrOption,
	questionCardDisplay,
	displayFromQuestionToAnswer,
	goodAnswerColorEffect,
	toChangeColorGreen,
	changeActiveAnswer,
	activeAnswer,
}) {
	const handleClick = (event) => {
		event.currentTarget.disabled = true;
		console.log("button clicked");
	};
	return (
		<div
			className="question-container"
			style={{ display: questionCardDisplay }}
		>
			<h3>QUESTION {chiffre}</h3>
			<img src={photoQuestion} alt="" />
			<p>{questionValue}</p>
			<div className="button-anwser-container">
				{questionOptions.map((question, index) => (
					// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						className="button-quizz"
						tabIndex={(1, 2, 3, 4)}
						onClick={() => {
							handleClick(event);
							hanldleAnswrOption(question.isCorrect);
							changeActiveAnswer(question.questionAnswer);
							toChangeColorGreen(question);

							setTimeout(() => {
								displayFromQuestionToAnswer();
							}, "1800");
						}}
						onKeyDownCapture={() => {
							if (event.key === "Enter") {
								hanldleAnswrOption(question.isCorrect);
								changeActiveAnswer(question.questionAnswer);
								toChangeColorGreen(question);

								setTimeout(() => {
									displayFromQuestionToAnswer();
								}, "1800");
							}
						}}
						// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						style={{ backgroundColor: goodAnswerColorEffect }}
					>
						{question.questionAnswer}
					</div>
				))}
			</div>
		</div>
	);
}

export default QuestionCard;
