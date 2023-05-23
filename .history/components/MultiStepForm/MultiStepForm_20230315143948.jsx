import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { PersonalDetails } from "./StepForm/PersonalDetails";
import { Address } from "./stepForm/Address";
import { Contact } from "./stepForm/Contact";
import { Review } from "./stepForm/Review";
import { Submit } from "./stepForm/Submit";

const defaultData = {
    firstName: "",
    lastName: "",
    sex: "female",
    dateOfBirth: new Date(),
    phone: "",
    email: "",
    university: "",
    nationality:"",
    departCountry:""
  };
  
  const steps = [
    { id: "names" },
   /* { id: "address" },*/
    { id: "contact" },
    { id: "review" },
    { id: "submit" },
  ];

 const MultiStepForm = () => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  const props = { formData, setForm, navigation };

  switch (step.id) {
    case "names":
      return <PersonalDetails {...props} />;
   /* case "address":
      return <Address {...props} />;*/
    case "contact":
      return <Contact {...props} />;
    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
  }

  return (
    <div>
      <h1>Multi step form</h1>
    </div>
  );
};
export default MultiStepForm;