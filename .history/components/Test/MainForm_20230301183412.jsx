import React, { Component } from 'react';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import Confirmation from './Confirmation';
import Success from './Success';
// ...

class MainForm extends Component {
    state = {
      step: 1,
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      city: '',
      country: ''
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
          step : step + 1
        })
      }
    
      prevStep = () => {
        const { step } = this.state
        this.setState({
          step : step - 1
        })
      }
    
      handleChange = input => event => {
        this.setState({[input]: event.target.value})
      }
    
  }
  
  export default MainForm;