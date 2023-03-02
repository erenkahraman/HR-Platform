import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';

class PersonalDetails extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values } = this.props;

    return (
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header textAlign='center'>
          <h1>Enter Personal Details</h1>
        </Header>

        <Form>
          <Segment>
            <Form.Field>
              <label>Age</label>
              <input placeholder='Age'
                onChange={this.props.handleChange('age')}
                defaultValue={values.age}
              />
            </Form.Field>

            <Form.Field>
              <label>City</label>
              <input placeholder='City'
                onChange={this.props.handleChange('city')}
                defaultValue={values.city}
              />
            </Form.Field>

            <Form.Field>
              <label>Country</label>
              <input placeholder='Country'
                onChange={this.props.handleChange('country')}
                defaultValue={values.country}
              />
            </Form.Field>
          </Segment>

          <Segment textAlign='center'>
            <Button onClick={this.back}>Back</Button>

            <Button onClick={this.saveAndContinue}>Save And Continue</Button>
          </Segment>
        </Form>
      </Grid.Column>
    )
  }
}

export default PersonalDetails;