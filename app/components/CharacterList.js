import React, { useState, useEffect } from 'react';
import CharacterFilters from './CharacterFilter';
import CharacterDetails from './CharacterDetails';

function CharacterList() {
  const [characterDetails, setCharacterDetails] = useState([]);
  const [characterNames, setCharacterNames] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [elementFilter, setElementFilter] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const elements = ['Anemo', 'Geo', 'Electro', 'Dendro', 'Hydro', 'Pyro', 'Cryo'];

  useEffect(() => {
    const getAllCharacterDetails = async () => {
      try {
        const response = await fetch('https://api.genshin.dev/characters/');
        const names = await response.json();
        setCharacterNames(names);

        const details = await Promise.all(
          names.map(async (character) => {
            const detailsResponse = await fetch(`https://api.genshin.dev/characters/${character}`);
            const details = await detailsResponse.json();
            return details || {};
          })
        );

        setCharacterDetails(details);
        setFilteredCharacters(details);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    getAllCharacterDetails();
  }, []);

  const getCharacterIconUrl = (characterName) => {
    const formattedName = characterName.toLowerCase();
    const formattedFullName = formattedName.replace(' ', '-');
    return `https://api.genshin.dev/characters/${formattedFullName}/icon-big`;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(term, elementFilter);
  };

  const handleElementFilter = (element) => {
    setElementFilter(element);
    applyFilters(searchTerm, element);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setElementFilter(null);
    setFilteredCharacters(characterDetails);
    setSelectedCharacter(null); 
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const applyFilters = (search, element) => {
    let filtered = characterDetails;

    if (search) {
      const searchTermLower = search.toLowerCase();
      filtered = filtered.filter((character) => character.name.toLowerCase().includes(searchTermLower));
    }

    if (element) {
      filtered = filtered.filter((character) => character.vision === element);
    }

    setFilteredCharacters(filtered);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <CharacterFilters
        onSearch={handleSearch}
        onElementFilter={handleElementFilter}
        onClearFilters={handleClearFilters}
        elements={elements}
        selectedElement={elementFilter}
      />

      {selectedCharacter ? (
        <CharacterDetails character={selectedCharacter} onBack={() => setSelectedCharacter(null)} />
      ) : (
        <div className="grid lg:grid-cols-5 gap-4" style={{ maxHeight: '1000px', overflowY: 'auto', marginTop: '8px' }}>
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((character, index) => (
              <div key={index} className="card w-36 bg-base-100 shadow-xl mx-auto" onClick={() => handleCharacterClick(character)}>
                <figure>
                  <img
                    src={getCharacterIconUrl(character.name)}
                    alt={`${character.name}'s icon`}
                    className="w-30 h-40 object-cover"
                  />
                </figure>
                <div className="text-center">
                  <h4>{character.name}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No characters available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default CharacterList;
