import React, { Component } from 'react';
import { Grid, Header, Segment, Button, List } from 'semantic-ui-react';

class Confirmation extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values: { firstName, lastName, email, age, city, country } } = this.props;

    return (
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header textAlign='center'>
          <h1>Confirm your Details</h1>

          <p>Click Confirm if the following details have been correctly entered</p>
        </Header>

        <Segment>
          <List divided relaxed>
            <List.Item>
              <List.Icon name='users' size='large' />
              <List.Content>First Name: {firstName}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='users' size='large' />
              <List.Content>Last Name: {lastName}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='mail' size='large' />
              <List.Content>Email: {email}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='calendar' size='large' />
              <List.Content>Age: {age}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='marker' size='large' />
              <List.Content>Location: {city}, {country}</List.Content>
            </List.Item>
          </List>
        </Segment>

        <Segment textAlign='center'>
          <Button onClick={this.back}>Back</Button>

          <Button onClick={this.saveAndContinue}>Confirm</Button>
        </Segment>
      </Grid.Column>
    )
  }
}

export default Confirmation;