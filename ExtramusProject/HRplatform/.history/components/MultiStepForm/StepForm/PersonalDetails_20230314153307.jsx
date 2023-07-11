import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Container from "@mui/material/Container";

export const PersonalDetails = ({ formData, setForm, navigation }) => {
  const { firstName, lastName} = formData;
  const [isFirstNameInvalid, setIsFirstNameInvalid] = useState(false);
  const [value, setValue] = React.useState('female');
  const [dateValue, setDateValue] = React.useState(new Date());


  const handleChange = (event) => {
    formData.sex = event.target.value;
    setValue(event.target.value);
    
  }; 
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the email address
    if (!isFirstNameInvalid(email)) {
      setIsFirstNameInvalid(true);
      return;
    }

    // Submit the form
    navigation.next()
  };

  

  return (
    <Container maxWidth="xs">
      <h3>Personal Details</h3>
      <form onSubmit={handleSubmit}>
          <FormControl>
          <TextField
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          {isFirstNameInvalid && (
          <FormErrorMessage>
            Please enter a valid First Name.
          </FormErrorMessage>
        )}
          <TextField
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
            <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dateValue || null}
                onChange={(newValue) => {
                  formData.dateOfBirth = newValue;
                  setDateValue(newValue);
                  
                }}
                renderInput={(params) => (
                  <TextField {...params} />
                )}
              />
            </LocalizationProvider>
            <Button
            variant="contained"
            fullWidth
            color="primary" 
            style={{ marginTop: "1rem" }}
            
          >
            Next
          </Button>
          </FormControl>
  </form>
      
    </Container>
  );
};