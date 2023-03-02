import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';

class UserDetails extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  render() {
    const { values } = this.props;

    return (
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header textAlign='center'>
          <h1>Enter User Details</h1>
        </Header>

        <Form>
          <Segment>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder='First Name'
                onChange={this.props.handleChange('firstName')}
                defaultValue={values.firstName}
              />
            </Form.Field>

            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder='Last Name'
                onChange={this.props.handleChange('lastName')}
                defaultValue={values.lastName}
              />
            </Form.Field>

            <Form.Field>
              <label>Email Address</label>
              <input
                type='email'
                placeholder='Email Address'
                onChange={this.props.handleChange('email')}
                defaultValue={values.email}
              />
            </Form.Field>
          </Segment>

          <Segment>
            <Button onClick={this.saveAndContinue}>Save And Continue</Button>
          </Segment>
        </Form>
      </Grid.Column>
    );
  }
}

export default UserDetails;