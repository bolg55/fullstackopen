const Search = ({ search, setSearch, handleChange }) => {
  return (
    <div>
      find countries:
      <input
        value={search}
        onChange={handleChange}
        placeholder='Search for a country'
      />
      <button onClick={() => setSearch('')}>clear</button>
    </div>
  );
};

export default Search;
