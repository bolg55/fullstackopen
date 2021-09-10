const Filter = ({ newSearch, handleSearch }) => {
  return (
    <div>
      search by name or number:{' '}
      <input value={newSearch} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
