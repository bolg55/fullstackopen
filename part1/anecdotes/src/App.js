import React, { useState } from 'react';

const Title = ({ title }) => <h2>{title}</h2>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ anecdote }) => <p>{anecdote}</p>;

const Votes = ({ votes }) => <p>has {votes} votes</p>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const mostVotes = Math.max(...votes);
  const bestAnecdote = anecdotes[votes.indexOf(mostVotes)];

  const handleClick = () => {
    let rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  };

  const handleVote = () => {
    const newVote = [...votes];
    newVote[selected] += 1;
    setVotes(newVote);
  };

  return (
    <div>
      <Title title='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} />
      <Votes votes={votes[selected]} />

      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleClick} text='next anecdote' />

      <Title title='Anecdote with most votes' />
      <Anecdote anecdote={bestAnecdote} />
      <Votes votes={mostVotes} />
    </div>
  );
};

export default App;
