import React from "react";
import {useForm, useStep} from "react-hooks-helper";


export const MultiStepForm = () =>{
    const [formData, setFormData] = useForm(defaultData);
    
    return (
        <div>
            <h1>Multi step form</h1>
        </div>
    )
}