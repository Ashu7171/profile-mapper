import React from 'react';

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 text-center">
      <input
        type="text"
        placeholder="Search by name or address..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 w-72 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
};



export default SearchFilter;
