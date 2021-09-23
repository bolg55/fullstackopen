import directoryService from '../services/people';

const PersonForm = ({
  people,
  setPeople,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleNameChange,
  handleNumberChange,
  setNotificationMessage,
  setErrorMessage,
}) => {
  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    // Check if person already exists in directory.
    for (let i = 0; i < people.length; i++) {
      if (
        people[i].name.toLowerCase().includes(personObject.name.toLowerCase())
      ) {
        // If person exists but phone number entered is different than in directory, prompt to update number
        if (
          window.confirm(
            `${personObject.name} already exists with phone number: ${people[i].number}, replace the old number with ${personObject.number}?`
          )
        ) {
          // On prompt confirm, update number in directory, fetch all directory listings and display
          directoryService
            .update(people[i].id, personObject)
            .then(() => {
              directoryService.getAll().then((res) => setPeople(res.data));
              setNotificationMessage(
                `Successfully updated ${people[i].name} number to: ${newNumber}`
              );
              setTimeout(() => {
                setNotificationMessage(null);
              }, 2000);
            })
            .catch((error) => {
              setErrorMessage(
                `Information for ${people[i].name} has already been removed from the server`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);

              setPeople(people.filter((p) => p.id !== people[i].id));
            });
        }
        setNewName('');
        setNewNumber('');
        return people;
      }
      // Check if number already belongs to person in directory and alert if true
      if (people[i].number === personObject.number) {
        alert(`${personObject.number} already belongs to ${people[i].name}`);

        setNewName('');
        setNewNumber('');
        return people;
      }
    }
    // Create new directory listing from personObject (name, phone)
    directoryService.create(personObject).then((res) => {
      setPeople(people.concat(res.data));
      setNewName('');
      setNewNumber('');
      setNotificationMessage(
        `Successfully added ${personObject.name} (${personObject.number})`
      );
      setTimeout(() => {
        setNotificationMessage(null);
      }, 2000);
    });
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
