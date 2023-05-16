import {useState} from "react";
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
  const { firstName, lastName,sex,dateOfBirth} = formData;
 
  const [value, setValue] = useState('female');
  const [dateValue, setDateValue] = useState(new Date());
  const pattern = /^[A-Za-z ]+$/;
  const regex = new RegExp(pattern);
  const handleChange = (event) => {
    formData.sex = event.target.value;
    setValue(event.target.value);
    
  }; 



  return (
    <Container maxWidth="xs">
      <h3>Personal Details</h3>
    
          <FormControl>
          <TextField
            error = {firstName === "" || !regex.test(firstName) ? true :false}
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            helperText={firstName === "" ? "Please enter a first name.": 
                        !regex.test(firstName) ? "The name must not contain numbers":""}
            fullWidth
          />
        
          <TextField
           error = {lastName === "" ? true :false}
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            helperText={lastName === "" ? "Please enter a last name.": ""}
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
            onClick={() => navigation.next()}
          >
            Next
          </Button>
          </FormControl>

      
    </Container>
  );
};