import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'

export const Contact = ({ formData, setForm, navigation }) => {
  const { phone, email,university } = formData;
  const [value, setValue] = React.useState('');

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailRegex = new RegExp(emailPattern);

  const controlRegexError = () => {
    return( email === "" || !emailRegex.test(email)? true : false)
  };

  const controlRegexHelper = () => {
    return( email === "" ? "Please enter an email.": 
    !emailRegex.test(email) ? "Please enter a valid email.":"")
  };
  const handleChange = (newValue) => {
    if(matchIsValidTel(newValue))
      setValue(newValue)
    // boolean
  }
  return (
    <Container maxWidth="xs">
      <h3>Contact</h3>
      
      <TextField
        error = {controlRegexError()}
        label="E-Mail"
        name="email"
        value={email}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        helperText={controlRegexHelper()}
        fullWidth
      />
     {/* <TextField
        label="Phone"
        name="phone"
        value={phone}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
  /> */}
      <MuiTelInput value={value} onChange={handleChange} />
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