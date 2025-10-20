import React from 'react';
import ProfileParagraph from './ProfileParagraph';

function ProfileCard(profile) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title mb-3" style={{ color: '#15dc0eff' }}>Profil użytkownika</h5>
        <ProfileParagraph label="Imię" title={profile.name}/>
        <ProfileParagraph label="Email" title={profile.email}/>
        <ProfileParagraph label="Telefon" title={profile.phone}/>
        <ProfileParagraph label="Data urodzin" title={profile.birthDate}/>
      </div>
    </div>
  );
}

export default ProfileCard;