const People = ({ people }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {people.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default People;
