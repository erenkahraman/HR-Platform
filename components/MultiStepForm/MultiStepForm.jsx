import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { PersonalDetails } from "./stepForm/PersonalDetails";
import { AppDetails } from "./stepForm/AppDetails";
import { Contact } from "./stepForm/Contact";
import { Review } from "./stepForm/Review";
import { Submit } from "./stepForm/Submit";
// import "./MultiStepForm.css";


const defaultData = {
    firstName: "",
    lastName: "",
    sex: "female",
    dateOfBirth: new Date(),
    phone: "",
    email: "",
    university: "",
    nationality:"",
    departCountry: "",
    appliedOn: new Date()
  };
  
const steps = [
    { id: "names" },
    { id: "contact" },
    { id: "appDetails" },
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
  case "appDetails":
    return <AppDetails {...props} />;
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