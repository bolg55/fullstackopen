import Search from './Search';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({
    temp: '',
    feelsLike: '',
    icon: '',
    wind: '',
  });

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (country) => {
    setSearch(country.name);
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
    (country) =>
      filtered.length > 1 && (
        <div key={country.name}>
          <p>
            {country.name}
            <button onClick={() => handleClick(country)}>show</button>
          </p>
        </div>
      )
  );

  const countryInfo = filtered.map((country) => {
    if (filtered.length === 1 && country.name.includes(filtered[0].name)) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${filtered[0].capital}&appid=${API_KEY}&units=metric`
        )
        .then((res) =>
          setWeather({
            temp: res.data.main.temp,
            feelsLike: res.data.main.feels_like,
            icon: res.data.weather.icon,
            wind: res.data.wind.speed,
          })
        );
    }

    return (
      <div key={country.name}>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map((lang) => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={country.name} />
        <h3>Weather in {country.capital}</h3>
        <p>temperature: {weather.temp} Celcius</p>
        <p>feels like: {weather.feelsLike} Celcius</p>
        <p>wind speed: {weather.wind} mph</p>
        <img src={weather.icon} alt='weather_icon' />
      </div>
    );
  });

  return (
    <div className='App'>
      <Search
        search={search}
        setSearch={setSearch}
        handleChange={handleChange}
      />
      {filtered.length > 10 ? 'Too many matches' : countryList}
      {filtered.length === 1 && countryInfo}
    </div>
  );
};

export default App;
