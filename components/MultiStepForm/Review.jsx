import React from "react";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetail from '@mui/material/AccordionDetails';


import ListItemText from '@mui/material/ListItemText'

import IconButton from '@mui/material/IconButton';


export const Review = ({ formData, navigation }) => {
  const { go } = navigation;
  const {
    firstName,
    lastName,
    sex,
    dateOfBirth,
    phone, 
    email,
    university,
    nationality,
    departCountry
    
  } = formData;

  return (
    <Container maxWidth='sm'>
      <h3>Review</h3>
      <RenderAccordion summary="Personal Details" go={ go } details={[
        { 'First Name': firstName },
        { 'Last Name': lastName },
        { 'sex': sex },
        { 'date of birth': dateOfBirth },
        { 'nationality': nationality }
      ]} />

      <RenderAccordion summary="Contact" go={ go } details={[
        { 'Phone': '+'+phone },
        { 'Email': email },
        { 'University': university },
        { 'Departing country': departCountry },
        
      ]} />
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
        color="primary"
        variant="contained"
        style={{backgroundColor: "#1565c0"}}
        onClick={() => go('submit')}
      >
        Submit
      </Button>
      </div>

    </Container>
  );
};

export const RenderAccordion = ({ summary, details, go }) => (
  <Accordion>
    <AccordionSummary

    >{summary}</AccordionSummary>
    <AccordionDetail>
      <div>
        { details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];

          return <ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>

        }) }
        <IconButton
          color="primary"
          component="span"
          onClick={() => go(`${summary.toLowerCase()}`)}
        ></IconButton>
      </div>
    </AccordionDetail>
  </Accordion>
)