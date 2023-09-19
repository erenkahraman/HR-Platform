import {useState} from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";

export const AppDetails = ({ formData, setForm, navigation }) => {
  const { appliedOn } = formData;
  const [dateValue, setDateValue] = useState(new Date());
  const [value, setValue] = useState(new Date());
  return (
    <Container maxWidth="xs">
      <div className="mb-2 font-semibold">
      Application Details
    </div>
        <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dateValue || null}
        
            onChange={(newValue) => {
              formData.appliedOn = newValue;
              setDateValue(newValue);
              
            }}
            
            renderInput={(params) => (
              <TextField {...params} />
            )}
          />
        </LocalizationProvider>
        <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
<DatePicker
  label="Controlled picker"
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>
        </FormControl>
    </Container>
  );
};