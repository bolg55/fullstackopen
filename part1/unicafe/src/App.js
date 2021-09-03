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
  const average = ((feedback.good - feedback.bad) / total).toFixed(2);
  const positive = ((feedback.good / total) * 100).toFixed(2) + ' %';

  if (total === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={feedback.good} />
          <StatisticLine text='neutral' value={feedback.neutral} />
          <StatisticLine text='bad' value={feedback.bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </tbody>
      </table>
    );
  }
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
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
