export default function Title({ fetchData }) {
  return (
    <div className="container">
      <h2 className="title">Quiz App</h2>
      <p>They Wanted Something Here!</p>
      <button className="start-btn" onClick={fetchData}>
        Start Quiz
      </button>
    </div>
  );
}
