import Search from './Search';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filtered = countries.filter((country) => {
    if (search === '') {
      return '';
    } else if (country.name.toLowerCase().includes(search.toLowerCase())) {
      return country;
    }
    return false;
  });

  const countryList = filtered.map(
    (country) => filtered.length > 1 && <p key={country.name}>{country.name}</p>
  );

  const countryInfo = filtered.map((country) => (
    <>
      <h2 key={country.name}>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name} />
    </>
  ));

  return (
    <div className='App'>
      <Search search={search} handleChange={handleChange} />
      {filtered.length > 10 ? 'Too many matches' : countryList}
      {filtered.length === 1 && countryInfo}
    </div>
  );
};

export default App;
