const PersonForm = ({
  people,
  setPeople,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  const addPerson = (e) => {
    e.preventDefault();
    for (let i = 0; i < people.length; i++) {
      if (people[i].name.toLowerCase().includes(newName.toLowerCase())) {
        alert(`${newName} is already added to phonebook`);
        setNewName('');
        setNewNumber('');
      } else {
        setPeople(people.concat({ name: newName, number: newNumber }));
        setNewName('');
        setNewNumber('');
      }
    }
  };

  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input required value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input required value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
