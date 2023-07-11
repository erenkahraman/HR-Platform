import {useState, useMemo} from "react";
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
import Select from 'react-select';
import countryList from "react-select-country-list";

export const PersonalDetails = ({ formData, setForm, navigation }) => {
  const { firstName, lastName,nationality} = formData;
  
  const [value, setValue] = useState('female');
  const [country,setCountry] = useState('');
  const [dateValue, setDateValue] = useState(new Date());
  const pattern = /^[A-Za-z ]+$/;
  const countriesList = useMemo(() => countryList().getData(), [])
  const regex = new RegExp(pattern);

  const handleChangeSex = (event) => {
    formData.sex = event.target.value;
    setValue(event.target.value);
  }; 

  const handleChangeCountry = (country) => {
    formData.nationality = country.label;
    console.log(country.label)
    setCountry(country);
  }; 
  
  const controlRegexError = (str) => {
    
    return( str === "" || !regex.test(str)? true : false)
  };

  const controlRegexHelper = (str) => {
    return( str === "" ? "Please enter a first name.": 
    !regex.test(str) ? "The name must not contain numbers":"")
  };
  console.log(error)
  const controlSubmit = () => {
    return (firstName !== "" && lastName !== "" && nationality !==""  ? false : true)
  }
  const controlDate = (date) => {
    return (date.$d > new Date(Date.now()) ? "The date must be less than current date":"");
  }

  return (
    <Container maxWidth="xs" >
      <h3>Personal Details</h3>
    
          <FormControl>
          <TextField
            error = {controlRegexError(firstName)}
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            helperText={controlRegexHelper(firstName)}
            fullWidth
          />
        
          <TextField
           error = {controlRegexError(lastName)}
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            helperText={controlRegexHelper(lastName)}
            autoComplete="off"
            fullWidth
          />
          <br></br>
            <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChangeSex}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <br></br>
            <FormLabel >Date of birth</FormLabel>
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
            <br/>
            <FormLabel >Nationality</FormLabel>
            <Select options={countriesList}  value={country} onChange={handleChangeCountry} />
            <Button
            disabled={controlSubmit()}
            variant="contained"
            fullWidth
           
            style={{ marginTop: "1rem",backgroundColor: controlSubmit() ? "transparent": "#1565c0" }}
            onClick={() => navigation.next()}
          >
            Next
          </Button>
          </FormControl>

      
    </Container>
  );
};