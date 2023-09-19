import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
//import countryList from "react-select-country-list";

export const Contact = ({ formData, setForm, navigation }) => {
  const { phone,email,university } = formData;
  const [value, setValue] = React.useState('+33123456789');
  const [isPhoneValid,setIsPhoneValid] = React.useState(false);

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
    if(!isPhoneValid){
      setIsPhoneValid(matchIsValidTel(newValue))
      setValue(newValue)
      formData.phone = newValue
    }
    
    // boolean
  }
  const controlSubmit = () => {
    return (phone !== "" && email !== "" && university !== "" ? false : true)
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
     {console.log(isPhoneValid)
     /* <TextField
        label="Phone"
        name="phone"
        value={phone}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
  /> */}
      <label>Phone number </label><br/>
      <MuiTelInput //disabled={ isPhoneValid ? true : false} 
      fullWidth value={value} 
      style={{outline : isPhoneValid ? "2px solid green" : "2px solid red"}} 
      onChange={handleChange} />
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
          style={{ marginRight: "1rem", backgroundColor:"#9c27b0" }}
          onClick={() => navigation.previous()}
        >
          Back
        </Button>
        <Button
          disabled={controlSubmit()}
          color="primary"
          variant="contained"
          style={{backgroundColor: controlSubmit() ? "transparent": "#1565c0"}}
          onClick={() => navigation.next()}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};