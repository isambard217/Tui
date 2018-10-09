import Swagger from 'swagger-client';
import React from 'react';
import { Grid, Form, Checkbox, Button } from 'semantic-ui-react';
import User from '../domain/User';

class AddNewSystemUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: new User(),
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event, { name, value }) {
    event.preventDefault();
    const { newUser } = this.state;
    newUser[name] = value;
    this.setState({ newUser });
  }
  onSubmit(event) {
    event.preventDefault();
    const { newUser } = this.state;
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis['api-users'].addUsingPOST({ auth, apiUserToAddDtos: [newUser] });
      })
      .then(() => {
        this.setState({ newUser: new User() });
        return window.location.reload();
      })
      .catch(error => Promise.reject(error));
  }
  render() {
    const { onChange, onSubmit } = this;
    return (<Grid container>
      <Form onSubmit={onSubmit}>
        <Form.Input
          name='userName'
          onChange={onChange}
          fluid
          icon='user'
          iconPosition='left'
          placeholder='university username'
        />
        <Form.Input
          name='password'
          onChange={onChange}
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
        />
        <Form.Input
          name='firstName'
          onChange={onChange}
          fluid
          icon='angle right'
          iconPosition='left'
          placeholder='First name'
        />
        <Form.Input
          name='lastName'
          onChange={onChange}
          fluid
          icon='angle right'
          iconPosition='left'
          placeholder='Last name'
        />
        <Form.Input
          name='email'
          onChange={onChange}
          fluid
          icon='angle right'
          iconPosition='left'
          placeholder='email address'
        />
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </Grid>);
  }
}
export default AddNewSystemUser;
