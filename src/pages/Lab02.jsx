import { useParams } from 'react-router-dom';
import { people } from '../module-data';
import ProfileCard from '../components/ProfileCard';

function Lab02() {
  const { id } = useParams();

  if (!id) {
    return <p>Brak identyfikatora osoby.</p>;
  }

  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    return <p>Niepoprawny identyfikator.</p>;
  }

  const person = people.find(p => p.id === numericId);
  if (!person) {
    return <p>Nie znaleziono osoby o tym identyfikatorze.</p>;
  }

  return (
    <>
      <h2>Lab02</h2>
      <ProfileCard
        key={person.id}
        name={person.name}
        email={person.email}
        birthDate={person.birthDate}
        phone={person.phone}
      />
    </>
  );
}

export default Lab02;


