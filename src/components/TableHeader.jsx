import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function TableHeader({ title, sortKey, dispatch }) {

  const handleSort = (type) => {
    dispatch({ type: type, key: sortKey });
  };

  return (
    <th style={{ padding: '0.5rem' }}> 
      <DropdownButton 
        id={`dropdown-${sortKey}`} 
        title={title} 
        size="sm"
        className="btn-custom-green"
      >
        <Dropdown.Item onClick={() => handleSort('SORT_ASC')}>
          Sortuj Rosnąco (A-Z, 0-9)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort('SORT_DESC')}>
          Sortuj Malejąco (Z-A, 9-0)
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleSort('SORT_RESET')}>
          Resetuj (Naturalna kolejność)
        </Dropdown.Item>
      </DropdownButton>
    </th>
  );
}

export default TableHeader;