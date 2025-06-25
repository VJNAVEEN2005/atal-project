import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 2rem;
  background: #ffffff;
  border-radius: 0.5rem;
`;

const FieldWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const AdvancedFilterForm = ({ filters, setFilters, onConfirm }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <FormContainer>
      <FieldWrapper>
        <Label >Founded Year</Label>
        <Input
          id="founded"
          name="founded"
          type="number"
          value={filters.founded}
          onChange={handleInputChange}
          placeholder="Enter founded year"
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="sector">Sector</Label>
        <Input
          id="sector"
          name="sector"
          type="text"
          value={filters.sector}
          onChange={handleInputChange}
          placeholder="Enter sector"
        />
      </FieldWrapper>

      <ButtonWrapper>
        <Button onClick={onConfirm}>Confirm</Button>
      </ButtonWrapper>
    </FormContainer>
  );
};

export default AdvancedFilterForm;
