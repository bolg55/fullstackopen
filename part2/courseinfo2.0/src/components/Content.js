import React from 'react';
import Parts from './Parts';

const Content = ({ content }) => {
  return (
    <div>
      {content.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <Parts content={content} />
    </div>
  );
};

export default Content;
