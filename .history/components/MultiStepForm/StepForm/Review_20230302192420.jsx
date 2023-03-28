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
    address,
    city,
    state,
    zip,
    phone,
    email,
  } = formData;

  return (
    <Container maxWidth='sm'>
      <h3>Review</h3>
      <RenderAccordion summary="Names" go={ go } details={[
        { 'First Name': firstName },
        { 'Last Name': lastName },
        { 'Nick Name': nickName },
      ]} />
      <RenderAccordion summary="Address" go={ go } details={[
        { 'Address': address },
        { 'City': city },
        { 'State': state },
        { 'Zip': zip },
      ]} />
      <RenderAccordion summary="Contact" go={ go } details={[
        { 'Phone': phone },
        { 'Email': email },
      ]} />
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