import React, { useState } from "react";
import he from "he";
import { v4 as uuidv4 } from "uuid";

const QuizItem = ({
  item,
  answerIndex,
  isClicked,
  isCorrectAnswer,
  checkedAnswers,
  handleClickAnswer,
}) => {
  const isClickedClass = isClicked === answerIndex ? "clicked" : "";
  let answerStatusClass = "";

  if (checkedAnswers) {
    if (isClickedClass && isCorrectAnswer) {
      answerStatusClass = "correct";
    } else if (isClickedClass && !isCorrectAnswer) {
      answerStatusClass = "incorrect";
    }
  }

  const className = `list-item ${isClickedClass} ${answerStatusClass}`;

  return (
    <li className={className} onClick={() => handleClickAnswer(answerIndex)}>
      {he.decode(item.answers[answerIndex])}
    </li>
  );
};

const QanA = ({ fetchData, setGameStart }) => {
  const [isClicked, setIsClicked] = useState({});
  const [isCorrectCount, setIsCorrectCount] = useState(0);
  const [checkedAnswers, setCheckedAnswers] = useState(false);

  const handleClickAnswer = (questionIndex, answerIndex) => {
    // Update isClicked state when an answer is clicked
    const updatedIsClicked = {
      ...isClicked,
      [questionIndex]: answerIndex,
    };
    setIsClicked(updatedIsClicked);
  };

  const checkAnswer = () => {
    // Count the correct answers when "Check Answers" button is clicked
    const correctAnswerCount = Object.keys(isClicked).reduce(
      (count, questionIndex) => {
        const selectedAnswerIndex = isClicked[questionIndex];
        const isCorrect =
          fetchData[questionIndex].answers[selectedAnswerIndex] ===
          fetchData[questionIndex].correct_answer;
        if (isCorrect) {
          count += 1;
        }
        return count;
      },
      0
    );

    setIsCorrectCount(correctAnswerCount);
    setCheckedAnswers(true);
  };

  const resetGame = () => {
    // Reset the state when "Start Over" button is clicked
    setIsClicked({});
    setIsCorrectCount(0);
    setCheckedAnswers(false);
    setGameStart(false); // Set gameStart to false to show the title screen again
  };

  return (
    <div className="container">
      {isCorrectCount > 0 && (
        <p className="final-score">Final Score: {isCorrectCount}</p>
      )}
      {fetchData.map((item, questionIndex) => {
        const isCorrectAnswer =
          isClicked[questionIndex] !== undefined &&
          fetchData[questionIndex].answers[isClicked[questionIndex]] ===
            fetchData[questionIndex].correct_answer;

        return (
          <div key={uuidv4()} className="question-container">
            <p className="question">{he.decode(item.question)}</p>
            <ul className="list">
              {item.answers.map((_, answerIndex) => (
                <QuizItem
                  key={uuidv4()}
                  item={item}
                  answerIndex={answerIndex}
                  isClicked={isClicked[questionIndex]}
                  isCorrectAnswer={isCorrectAnswer}
                  checkedAnswers={checkedAnswers} // Pass the checkedAnswers prop
                  handleClickAnswer={() =>
                    handleClickAnswer(questionIndex, answerIndex)
                  }
                />
              ))}
            </ul>
          </div>
        );
      })}
      {checkedAnswers ? (
        <button className="reset-button" onClick={resetGame}>
          Reset
        </button>
      ) : (
        <button className="check-button" onClick={checkAnswer}>
          Check Answers
        </button>
      )}
    </div>
  );
};

export default QanA;
