import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { useState, useContext } from "react";
import AppContext from '../data/AppContext';
import { useNavigate } from 'react-router-dom';

function Lab4Add() {

  const [errors, setErrors] = useState({});
  const [isSending, setSending] = useState(false);
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const validateForm = (data) => {
    const newErrors = {};
    const phoneRegex = /^\d{3}-\d{3}-\d{3}$/;

    if (!data.get("name") || data.get("name").length < 3) {
      newErrors.name = "Imię jest wymagane (min. 3 znaki).";
    } else if (data.get("name").length > 50) {
      newErrors.name = "Imię jest za długie (max. 50 znaków).";
    }

    if (!data.get("email")) {
      newErrors.email = "Email jest wymagany.";
    }

    if (!data.get("phone") || !phoneRegex.test(data.get("phone"))) {
      newErrors.phone = "Telefon jest wymagany (format XXX-XXX-XXX).";
    }

    if (!data.get("birthDate")) {
      newErrors.birthDate = "Data urodzenia jest wymagana.";
    }
    
    if (!data.get("eyeColor")) {
      newErrors.eyeColor = "Kolor oczu jest wymagany.";
    }
    if (!data.get("birthPlace")) {
      newErrors.birthPlace = "Miejsce urodzenia jest wymagane.";
    }

    return newErrors;
  };

  const onSubmitFunction = async (e) => {
    e.preventDefault();
    setErrors({}); 
    
    const data = new FormData(e.target);
    const newErrors = validateForm(data);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); 

    const newPerson = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      birthDate: data.get("birthDate"),
      eyeColor: data.get("eyeColor"), 
      birthPlace: data.get("birthPlace"),
      rating: 0,
      check: false
    };

    dispatch({ type: "add", person: newPerson });

    setSending(false);
    e.target.reset(); 
    
    alert("Nowy profil został dodany!");
    navigate("/lab3"); 
  };

  return (
    <>
      <h2>Dodawanie nowego profilu</h2>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          {Object.values(errors).map((error, i) => (
            <p key={i} className="mb-0">{error}</p>
          ))}
        </Alert>
      )}

      <Form onSubmit={onSubmitFunction}>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Imię i nazwisko</Form.Label>
          <FormControl required id="name" name="name" minLength={3} maxLength={50} isInvalid={!!errors.name} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <FormControl required id="email" type="email" name="email" isInvalid={!!errors.email} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="phone">Telefon</Form.Label>
          <FormControl required id="phone" type="tel" name="phone" placeholder="XXX-XXX-XXX" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" isInvalid={!!errors.phone} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="birthDate">Data urodzenia</Form.Label>
          <FormControl required id="birthDate" type="date" name="birthDate" isInvalid={!!errors.birthDate} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="eyeColor">Kolor oczu</Form.Label>
          <FormControl required id="eyeColor" type="text" name="eyeColor" isInvalid={!!errors.eyeColor} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="birthPlace">Miejsce urodzenia</Form.Label>
          <FormControl required id="birthPlace" type="text" name="birthPlace" isInvalid={!!errors.birthPlace} />
        </Form.Group>

        <div className="d-grid">
          <Button disabled={isSending} type="submit" variant="outline-primary" size="lg">
            {isSending ? "Wysyłanie..." : "Dodaj"}
          </Button>
        </div>

      </Form>
    </>
  );
}

export default Lab4Add;