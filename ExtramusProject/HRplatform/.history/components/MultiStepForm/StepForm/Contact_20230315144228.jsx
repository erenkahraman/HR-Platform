import {useState, useMemo} from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import countryList from "react-select-country-list";
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const Contact = ({ formData, setForm, navigation }) => {
  const { phone,email,university } = formData;
  const [value,setValue] = useState();
  const [country,setCountry] = useState('');
  const countriesList = useMemo(() => countryList().getData(), [])
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailRegex = new RegExp(emailPattern);
 

  const controlRegexError = () => {
    return( email === "" || !emailRegex.test(email)? true : false)
  };
 
  const handleChangeCountry = (country) => {
    formData.nationality = country.label;
    console.log(country.label)
    setCountry(country);
  }; 

  const controlRegexHelper = () => {
    return( email === "" ? "Please enter an email.": 
    !emailRegex.test(email) ? "Please enter a valid email.":"")
  };
  const handleChange = (newValue) => {
      setValue(newValue);
      formData.phone = newValue;
  }
  const controlSubmit = () => {
    return (phone !== "" && email !== "" && university !== "" ? false : true);
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
     
      <label>Phone number </label><br/>
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={handleChange}
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
<Select options={countriesList}  value={country} onChange={handleChangeCountry} />
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