import directoryService from '../services/people';

const People = ({ people, setPeople, setNotificationMessage }) => {
  // On delete click > prompt for confirmation > delete entry from directory > filter and re-render directory
  const handleClick = (person) => {
    if (window.confirm(`Delete ${person.name}? This cannot be undone`)) {
      directoryService.remove(person.id).then(() => {
        setPeople(people.filter((p) => p.id !== person.id));
        setNotificationMessage(`Successfully deleted ${person.name} `);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 2000);
      });
    }
  };

  return (
    <div>
      <h2>Numbers</h2>
      {people.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => handleClick(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default People;
