const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part, number }) => {
  return (
    <p>
      {part} {number}
    </p>
  );
};

//*** How I would actually do this ***//
// const Content = ({ parts }) => {
//   return parts.map((part) => (
//     <Part key={part.id} part={part.name} number={part.exercises} />
//   ));
// };

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} number={props.parts[0].exercises} />
      <Part part={props.parts[1].name} number={props.parts[1].exercises} />
      <Part part={props.parts[2].name} number={props.parts[2].exercises} />
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };
  return (
    <div className='App'>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
