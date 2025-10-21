import React from 'react';
import DataContainer from '../components/DataContainer';
import { people } from '../module-data'; 
import ProfileCardLab3 from '../components/ProfileCardLab3'; 

function Lab3Page() {
  return (
    <>
      <h2>Lab3</h2>

      <DataContainer 
        element={ProfileCardLab3} 
        data={people} 
        columns={3} 
      />
    </>
  );
}

export default Lab3Page;