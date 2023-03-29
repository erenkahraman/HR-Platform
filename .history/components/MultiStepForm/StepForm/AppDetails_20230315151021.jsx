import React from "react";
import Container from "@mui/material/Container";
import Controller from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const AppDetails = ({ formData, setForm, navigation }) => {
  const { address, city, state, zip } = formData;
  return (
    <Container maxWidth="xs">
      <div className="mb-2 font-semibold">
      Application Details
    </div>

    <div className="flex gap-4">
      {/* Applied on */}
      <div className="flex flex-[1] flex-col gap-2">
        <label htmlFor="applied-on" className="block text-sm">
          Applied on
        </label>
        <Controller
          control={control}
          name="student.applicant.applicationDate"
          rules={{
            required: "Please, enter the application date",
          }}
          render={({ field: { onChange, value } }) => (
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
          )}
        />
        <p className="text-sm font-thin text-red-600">
          {errors.student?.applicant?.applicationDate?.message}
        </p>
      </div>
      </div>
    </Container>
  );
};