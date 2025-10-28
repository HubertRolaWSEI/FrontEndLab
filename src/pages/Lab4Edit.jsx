import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormControl, Alert } from 'react-bootstrap';
import AppContext from '../data/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

function Lab4Edit() {
  const { items, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams(); 

  const personToEdit = items.find(p => p.id === Number(id));

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      id: personToEdit?.id,
      name: personToEdit?.name,
      email: personToEdit?.email,
      phone: personToEdit?.phone,
      birthDate: personToEdit?.birthDate,
      eyeColor: personToEdit?.eyeColor || '',   
      birthPlace: personToEdit?.birthPlace || ''  
    }
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); 

    dispatch({ type: "edit", person: data });
    
    alert("Dane zaktualizowane!");
    navigate("/lab3"); 
  };

  if (!personToEdit) {
    return (
      <>
        <h2>Błąd</h2>
        <Alert variant="danger">Nie znaleziono profilu o ID: {id}</Alert>
      </>
    );
  }

  return (
    <>
      <h2>LAB 4 - EDYTUJ PROFIL</h2>
      
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          {errors.name && <p className="mb-0">{errors.name.message}</p>}
          {errors.email && <p className="mb-0">{errors.email.message}</p>}
          {errors.phone && <p className="mb-0">{errors.phone.message}</p>}
          {errors.birthDate && <p className="mb-0">{errors.birthDate.message}</p>}
          {errors.eyeColor && <p className="mb-0">{errors.eyeColor.message}</p>}
          {errors.birthPlace && <p className="mb-0">{errors.birthPlace.message}</p>}
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>

        <input type="hidden" {...register("id")} />

        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Imię i nazwisko</Form.Label>
          <FormControl
            id="name"
            {...register("name", {
              required: "Imię jest wymagane.",
              minLength: { value: 3, message: "Imię musi mieć min. 3 znaki." },
              maxLength: { value: 50, message: "Imię może mieć max. 50 znaków." }
            })}
            isInvalid={!!errors.name}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <FormControl
            id="email"
            type="email"
            {...register("email", { required: "Email jest wymagany." })}
            isInvalid={!!errors.email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="phone">Telefon</Form.Label>
          <FormControl
            id="phone"
            type="tel"
            placeholder="XXX-XXX-XXX"
            {...register("phone", {
              required: "Telefon jest wymagany.",
              pattern: { value: /^\d{3}-\d{3}-\d{3}$/, message: "Niepoprawny format (oczekiwano XXX-XXX-XXX)." }
            })}
            isInvalid={!!errors.phone}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="birthDate">Data urodzenia</Form.Label>
          <FormControl
            id="birthDate"
            type="date"
            {...register("birthDate", { required: "Data urodzenia jest wymagana." })}
            isInvalid={!!errors.birthDate}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="eyeColor">Kolor oczu</Form.Label>
          <FormControl 
            id="eyeColor" 
            type="text" 
            {...register("eyeColor", { required: "Kolor oczu jest wymagany." })} 
            isInvalid={!!errors.eyeColor}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="birthPlace">Miejsce urodzenia</Form.Label>
          <FormControl 
            id="birthPlace" 
            type="text" 
            {...register("birthPlace", { required: "Miejsce urodzenia jest wymagane." })} 
            isInvalid={!!errors.birthPlace}
          />
        </Form.Group>

        <div className="d-grid">
          <Button disabled={isSubmitting} type="submit" variant="outline-primary" size="lg">
            {isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}
          </Button>
        </div>

      </Form>
    </>
  );
}

export default Lab4Edit;