import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {course.map((c) => (
        <div key={c.id}>
          <Header title={c.name} />
          <Content content={c.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
