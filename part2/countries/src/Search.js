const Search = ({ search, handleChange }) => {
  return (
    <div>
      find countries:
      <input
        value={search}
        onChange={handleChange}
        placeholder='Search for a country'
      />
    </div>
  );
};

export default Search;
