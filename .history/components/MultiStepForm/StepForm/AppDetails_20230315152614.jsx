import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from "@mui/material/Button";

export const AppDetails = ({ formData, setForm, navigation }) => {
  const { address, city, state, zip } = formData;
  return (
    <Container maxWidth="xs">
      <div className="mb-2 font-semibold">
      Application Details
    </div>
        <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
          disableMaskedInput
            value={value || null}
            inputFormat="DD/MM/YYYY"
            onChange={(date) => {
              onChange(date?.isValid ? date : null);
            }}
            renderInput={(params) => (
              <TextField {...params} />
            )}
          />
        </LocalizationProvider>
        </FormControl>
    </Container>
  );
};