import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FileInput = styled.input`
  margin: 10px 0;
`;

const Admin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("expiryDate", expiryDate);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post("/api/tenders", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Tender Added");
    } catch (error) {
      console.error("Error uploading tender:", error);
      alert("Failed to add tender");
    }
  };

  return (
    <Container>
      <h1>Admin Panel</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="date"
           placeholder="Expiry date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <FileInput
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Add Tender</button>
      </Form>
    </Container>
  );
};

export default Admin;
