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
import Controller from "react-hook-form";

export const PersonalDetails = ({ formData, setForm, navigation }) => {
  const { firstName, lastName, nickName } = formData;

  return (
    <Container maxWidth="xs">
      <h3>Personal Details</h3>
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
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
      </FormControl>
{/*
      <Controller
        
        name="student.dateOfBirth"
        rules={{
          required: "Please, enter a birth date",
        }}
        render={({ field: { onChange, value } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={value || null}
              onChange={(date) => {
                onChange(date?.isValid ? date : null);
              }}
              renderInput={(params) => (
                <TextField {...params} />
              )}
            />
          </LocalizationProvider>
        )}
              /> */}
     
      <button
        id="UpdateStudent"
        type="button"
        value="Next"
        className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => navigation.next()}
      ></button>
    </Container>
  );
};