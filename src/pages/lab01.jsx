import ProfileCard from '../components/ProfileCard';
import ProfileGrid from '../components/ProfileGrid';
import { people } from '../module-data';

function Lab01() {
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


