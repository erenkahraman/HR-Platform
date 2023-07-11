import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
      <Radio
        id="sex"
        checked={selectedValue === 'Male'}
        onChange={handleChange}
        value="Male"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'Male' }}
      />
      <Radio
        id="sex"
        checked={selectedValue === 'Female'}
        onChange={handleChange}
        value="Female"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'Female' }}
      />
      <Controller
        control={control}
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
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
        style={{ marginTop: "1rem" }}
        onClick={() => navigation.next()}
      >
        Next
      </Button>
    </Container>
  );
};