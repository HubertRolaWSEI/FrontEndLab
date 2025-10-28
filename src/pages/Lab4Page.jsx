import React from 'react';
import { Button } from 'react-bootstrap'; // 1. Importuj Button
import { Link } from 'react-router-dom';   // 2. Importuj Link

function Lab4Page() {
  return (
    <>
      <h2>Lab4</h2>
      <p>Strona główna laboratorium 4.</p>
      
      {/* 3. Dodaj przycisk jako Link */}
      <Button as={Link} to="/lab4/add" variant="primary" size="lg" className="mt-3">
        Dodaj Nowy Profil
      </Button>
    </>
  );
}

export default Lab4Page;