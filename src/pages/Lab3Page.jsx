import React from 'react';
import DataContainer from '../components/DataContainer';
import ProfileCardLab3 from '../components/ProfileCardLab3';

function Lab3Page() {
  return (
    <>
      <h2>Lab3</h2>

      <DataContainer
        element={ProfileCardLab3}
        columns={3}
      />
    </>
  );
}

export default Lab3Page;