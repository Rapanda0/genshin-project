// CharacterDetails.js
import React from 'react';

const BasicInfo = ({ character }) => (
  <div>
    <h2>{character.name}</h2>
    <p>Title: {character.title}</p>
    <p>Vision: {character.vision}</p>
    <p>Weapon: {character.weapon}</p>
    <p>Nation: {character.nation}</p>
  </div>
);
const SkillTalents = ({ skillTalents }) => (
  <div>
    <h3>Skill Talents</h3>
    {skillTalents.map((talent, index) => (
      <div key={index}>
        <h4>{talent.name}</h4>
        <p>{talent.description}</p>
        {talent.upgrades && talent.upgrades.length > 0 && (
          <ul>
            {talent.upgrades.map((upgrade, i) => (
              <li key={i}>
                {upgrade.name}: {upgrade.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

const PassiveTalents = ({ passiveTalents }) => (
  <div>
    <h3>Passive Talents</h3>
    {passiveTalents.map((talent, index) => (
      <div key={index}>
        <h4>{talent.name}</h4>
        <p>{talent.description}</p>
        {talent.level && <p>Level: {talent.level}</p>}
      </div>
    ))}
  </div>
);

const Constellations = ({ constellations }) => (
  <div>
    <h3>Constellations</h3>
    {constellations.map((constellation, index) => (
      <div key={index}>
        <h4>{constellation.name}</h4>
        <p>{constellation.description}</p>
        {constellation.level && <p>Level: {constellation.level}</p>}
      </div>
    ))}
  </div>
);

const CharacterDetails = ({ character, onBack }) => {
  return (
    <div className="character-details">
       <button className="bg-primary text-white px-4 py-2 rounded" onClick={onBack}>
        Back to Character List
      </button>
      <BasicInfo character={character} />
      <SkillTalents skillTalents={character.skillTalents} />
      <PassiveTalents passiveTalents={character.passiveTalents} />
      <Constellations constellations={character.constellations} />
    
    </div>
  );
};

export default CharacterDetails;
