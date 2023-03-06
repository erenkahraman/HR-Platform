import React from "react";
import {useForm, useStep} from "react-hooks-helper";

const defaultData = {
    firstName: '',
    lastName: '',
    nickName: ''
};

const steps = [
    {id: 'names'},
    {id: 'address'},
    {id: 'contact'},
    {id: 'review'},
    {id: 'submit'}
];

export const MultiStepForm = () =>{
    const [formData, setFormData] = useForm(defaultData);
    
    const [step, navigation] = useStep({
        steps,
        initialStep: 0
    });
    console.log(step)
    return (
        <div>
            <h1>Multi step form</h1>
        </div>
    );
};