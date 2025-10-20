import React from 'react';

function ProfileParagraph({ label, title }) {
  return (
    <div className="mb-3">
      <strong className="d-block">{label}:</strong>
      <p className="mb-0">{title}</p>
    </div>
  );
}

export default ProfileParagraph;