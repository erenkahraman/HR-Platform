import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Contact = ({ formData, setForm, navigation }) => {
  const { phone, email,university } = formData;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailRegex = new RegExp(emailPattern);

  const controlRegexHelper = (str) => {
    return( str === "" ? "Please enter a first name.": 
    !emailRegex.test(str) ? "The name must not contain numbers":"")
  };

  return (
    <Container maxWidth="xs">
      <h3>Contact</h3>
      
      <TextField
        error = {controlRegexHelper}
        label="E-Mail"
        name="email"
        value={email}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        helperText={controlRegexHelper(email)}
        fullWidth
      />
      <TextField
        label="Phone"
        name="phone"
        value={phone}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
       <TextField
        label="University"
        name="university"
        value={university}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <div style={{ marginTop: "1rem" }}>
        <Button
          color="secondary"
          variant="contained"
          style={{ marginRight: "1rem" }}
          onClick={() => navigation.previous()}
        >
          Back
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigation.next()}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};