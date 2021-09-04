import React from 'react';

const Parts = ({ content }) => {
  const exercise = [];
  for (let i = 0; i < content.length; i++) {
    exercise.push(content[i].exercises);
  }

  const total = exercise.reduce((acc, cur) => acc + cur, 0);
  return <p>total of {total} exercises</p>;
};

export default Parts;
