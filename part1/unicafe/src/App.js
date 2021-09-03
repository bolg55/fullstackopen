import { useState } from 'react';

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ feedback }) => {
  const total = feedback.good + feedback.neutral + feedback.bad;
  const avg = (total / 3).toFixed(2);
  const positive = ((feedback.good / total) * 100).toFixed(2) + '%';
  return (
    <tbody>
      <StatisticLine text='good' value={feedback.good} />
      <StatisticLine text='neutral' value={feedback.neutral} />
      <StatisticLine text='bad' value={feedback.bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={avg} />
      <StatisticLine text='positive' value={positive} />
    </tbody>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGood = () => {
    setFeedback({ ...feedback, good: feedback.good + 1 });
  };

  const handleNeutral = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 });
  };

  const handleBad = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 });
  };

  return (
    <div className='App'>
      <h1>give feedback</h1>
      <Button text='good' onClick={handleGood} />
      <Button text='neutral' onClick={handleNeutral} />
      <Button text='bad' onClick={handleBad} />

      <h2>statistics</h2>

      {feedback.good + feedback.neutral + feedback.bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <Statistics feedback={feedback} />
        </table>
      )}
    </div>
  );
};

export default App;
