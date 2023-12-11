import React from 'react';

function CharacterFilters({ onSearch, onElementFilter, onClearFilters, elements, selectedElement }) {
  return (
    <div className="flex justify-center items-center mb-4">
      <input
        type="text"
        placeholder="Search characters..."
        className="border p-2 mr-2"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="flex">
        {elements.map((element, index) => {
          const buttonClass = selectedElement === element ? 'bg-secondary text-white' : 'bg-primary text-white';
          return (
            <button
              key={index}
              className={`rounded p-2 mr-2 ${buttonClass}`}
              onClick={() => onElementFilter(element)}
            >
              {element}
            </button>
          );
        })}
        <button className="bg-gray-500 text-white rounded p-2" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default CharacterFilters;
