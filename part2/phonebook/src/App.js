import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import People from './components/People';
import directoryService from './services/people';
import Notification from './components/Notifications';

const App = () => {
  // State handlers //
  const [people, setPeople] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Effect handlers //

  useEffect(() => {
    directoryService.getAll().then((res) => {
      setPeople(res.data);
    });
  }, []);

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
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Notification error={errorMessage} />
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
        setNotificationMessage={setNotificationMessage}
        setErrorMessage={setErrorMessage}
      />
      <People
        people={filteredPeople}
        setPeople={setPeople}
        setNotificationMessage={setNotificationMessage}
      />
    </div>
  );
};

export default App;
