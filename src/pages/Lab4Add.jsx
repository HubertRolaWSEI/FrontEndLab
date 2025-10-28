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
    
    try {
      if (data.get("photo")) new URL(data.get("photo"));
    } catch (e) {
      newErrors.photo = "Wprowadzono niepoprawny URL zdjęcia.";
    }
    try {
      if (data.get("url")) new URL(data.get("url"));
    } catch (e) {
      newErrors.url = "Wprowadzono niepoprawny URL strony www.";
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
      photo: data.get("photo"),
      url: data.get("url"),
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
      <h2>Lab 4 - Dodaj profil</h2>

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
          <Form.Label htmlFor="photo">URL Zdjęcia (nowe pole)</Form.Label>
          <FormControl id="photo" type="url" name="photo" placeholder="https://..." isInvalid={!!errors.photo} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="url">URL Strony WWW (nowe pole)</Form.Label>
          <FormControl id="url" type="url" name="url" placeholder="https://..." isInvalid={!!errors.url} />
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