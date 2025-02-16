import React, { useState } from 'react';
import styled from 'styled-components';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Contact from ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `;
    
    window.location.href = `mailto:djpavithra2005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <FormContainer>
      <h2>GET IN TOUCH</h2>
      <Form onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <Input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
        <TextArea name="message" placeholder="Message" onChange={handleChange} required />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default GetInTouch;

const h2 = styled.h2`
  font-size: 2rem;
  color: #12283c;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
  text-align: center;
  width: 100%;
  max-width: 350px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 80px;
`;

const SubmitButton = styled.button`
  background: #12283c;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: #0d1f30;
  }
`;
