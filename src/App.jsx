import React, { useState } from "react";
import "./App.css";
import QanA from "./QanA";
import Title from "./Title";

// Function to shuffle an array
function shuffleArray(array) {
  // Create a copy of the original array
  const shuffledArray = [...array];

  // Perform Fisher-Yates shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function App() {
  const [shuffledData, setGameData] = useState([]);
  const [gameStart, setGameStart] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
      );
      const data = await response.json();
      console.log(data);
      const shuffledData = data.results.map((item) => ({
        ...item,
        answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
      }));

      setGameData(shuffledData);
      setGameStart(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const startOver = () => {
    setGameStart(false);
  };

  return (
    <>
      {!gameStart && <Title fetchData={fetchData} />}

      {gameStart && (
        <div className="container">
          <QanA fetchData={shuffledData} setGameStart={startOver} />
        </div>
      )}
    </>
  );
}

export default App;
