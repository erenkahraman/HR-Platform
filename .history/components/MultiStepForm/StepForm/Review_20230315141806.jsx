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
    nationality
    
  } = formData;

  return (
    <Container maxWidth='sm'>
      <h3>Review</h3>
      <RenderAccordion summary="Personal Details" go={ go } details={[
        { 'First Name': firstName },
        { 'Last Name': lastName },
        { 'sex': sex },
        { 'dateOfBirth': dateOfBirth },
        { 'nationality': nationality }
      ]} />

      <RenderAccordion summary="Contact" go={ go } details={[
        { 'Phone': phone },
        { 'Email': email },
        { 'University': university },
        
      ]} />
 <Button
          color="secondary"
          variant="contained"
          style={{ marginRight: "1rem" }}
          onClick={() => navigation.previous()}
        >
          Back
        </Button>
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: '1.5rem' }}
        onClick={() => go('submit')}
      >
        Submit
      </Button>

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