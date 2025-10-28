import React, { useContext } from 'react';
import ProfileCard from '../components/ProfileCard';
import ProfileGrid from '../components/ProfileGrid';
import AppContext from '../data/AppContext';

function Lab01() {
  const context = useContext(AppContext);
  const people = context.items;

  return (
    <>
      <h2>Lab01</h2>
      <ProfileGrid columns={3}>
        {people.map(person => (
          <ProfileCard
            key={person.id}
            name={person.name}
            email={person.email}
            birthDate={person.birthDate}
            phone={person.phone}
          />
        ))}
      </ProfileGrid>
    </>
  );
}

export default Lab01;