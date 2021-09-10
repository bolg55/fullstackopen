import React, { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import People from './People';

const App = () => {
  // State handlers //
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newSearch, setNewSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Event handlers //
  const handleSearch = (e) => {
    setNewSearch(e.target.value);
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  // Search filter //
  const filteredPeople = people.filter((info) => {
    if (newSearch === '') {
      return info;
    } else if (
      info.name.toLowerCase().includes(newSearch.toLowerCase()) ||
      info.number.includes(newSearch)
    ) {
      return info;
    }
    return false;
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        people={people}
        value={newSearch}
        setNewSearch={setNewSearch}
        handleSearch={handleSearch}
      />
      <PersonForm
        people={people}
        setPeople={setPeople}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <People people={filteredPeople} />
    </div>
  );
};

export default App;
