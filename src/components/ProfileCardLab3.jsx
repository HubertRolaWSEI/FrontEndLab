import React from 'react'; 
import ProfileParagraph from './ProfileParagraph';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import RatingBar from './RatingBar';


function ProfileCardLab3({ 
  id, 
  name, 
  email, 
  phone, 
  birthDate, 
  rating, 
  check,  
  dispatch 
}) {

  const handleEdit = () => {
    console.log(`(Lab 3) Edit: ${name}`);
  };



  const handleDelete = () => {
    dispatch({ 
      type: "delete", 
      id: id 
    });
  };

  const handleCheck = () => {
    dispatch({ 
      type: "check", 
      id: id 
    });
  };

  const handleRate = () => {
    dispatch({ 
      type: "rate", 
      id: id,
      rating: rating 
    });
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column"> 
        <h5 className="card-title mb-3" style={{ color: '#15dc0eff' }}>Profil (Lab 3)</h5>
        
        <ProfileParagraph label="Imię" title={name}/>
        <ProfileParagraph label="Email" title={email}/>
        <ProfileParagraph label="Telefon" title={phone}/>
        <ProfileParagraph label="Data urodzin" title={birthDate}/>
        
        <div className="mb-2">
          <strong className="d-block">Rating:</strong>
          <RatingBar rate={rating} />
        </div>

        <Form.Check 
          type="checkbox"
          id={`check-${id}`} 
          label="Zaznacz (Check)"
          checked={check} 
          onChange={handleCheck} 
          className="mb-3"
        />

        <ButtonGroup className="mt-auto">
          <Button variant="outline-primary" size="sm" onClick={handleEdit}>Edit</Button>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>Delete</Button>
          <Button variant="outline-success" size="sm" onClick={handleRate}>Rate</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default ProfileCardLab3;