import {useState, useRef} from "react";
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
  const [value, setValue] = useState('female');
  const [dateValue, setDateValue] = useState(new Date());


  const handleChange = (event) => {
    formData.sex = event.target.value;
    setValue(event.target.value);
    
  }; 
  const [userInput, setUserInput] = useState("");
  
  const [error, setError] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false); // ADDED
  function style(error) {
    if (error) {
      return { backgroundColor: "rgba(255, 0, 0, 0.5)" };
    }
  }
  const ref = useRef();
  const handleBlur = (event) => {
    if (!error) {
      if (event.target.validity.patternMismatch) {
        ref.current.focus();
        setError(true);
        setShowErrorText(true);
      }
    }
    if (error) {
      setShowErrorText(false);
    }
  };
  const handleChangeF = (event) => {
    const newValueIsValid = !event.target.validity.patternMismatch;
    if (error) {
      if (newValueIsValid) {
        setError(false);
        setShowErrorText(false);
      }
    }
    setUserInput(event.target.value);
  };
  const handleFocus = () => {
    if (error) {
      setShowErrorText(true);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form
    navigation.next()
  };

  

  return (
    
    <Container maxWidth="xs">
      <h3>Personal Details</h3>
      <form >
          <FormControl>
          <label htmlFor="number-input-field">Enter a number: </label>
      <input
        type="text"
        id="number-input-field"
        inputMode="decimal"
        onBlur={handleBlur}
        onChange={handleChangeF}
        onFocus={handleFocus}
        pattern="[a-zA-Z ]+"
        ref={ref}
        style={style(error)}
        value={userInput}
      />
      {showErrorText && (
        <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
          Please make sure you've entered a <em>number</em>
        </p>
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
            onClick={() => navigation.next()}
          >
            Next
          </Button>
          </FormControl>
  </form>
      
    </Container>
  );
};