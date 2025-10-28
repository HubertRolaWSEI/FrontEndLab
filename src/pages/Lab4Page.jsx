import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Lab4Page() {
  return (
    <>
      <h2>Lab4</h2>
      <p>Strona główna laboratorium 4.</p>
      
      <Button 
        as={Link} 
        to="/lab4/add" 
        variant="light" 
        size="lg" 
        className="mt-3"
        style={{ 
          backgroundColor: '#15dc0eff', 
          borderColor: '#000000ff'      
        }}
      >
        Dodaj Nowy Profil
      </Button>
    </>
  );
}

export default Lab4Page;