import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Segment } from 'semantic-ui-react';
import './loginForm.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(even, { name, value }) {
    even.preventDefault();
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { userName, password } = this.state;
    const { signIn } = this.props;
    signIn({ userName, password });
  }
  render() {
    const { handleSubmit, handleChange } = this;
    return (
      <Grid textAlign='center' verticalAlign='middle' container>
        <Grid.Column width={8} className='fifty_percent_height'>
          <Form
            onSubmit={handleSubmit}
          >
            <Segment>
              <Form.Input
                name='userName'
                onChange={handleChange}
                fluid
                icon='user'
                iconPosition='left'
                placeholder='University Account ...'
              />
              <Form.Input
                name='password'
                onChange={handleChange}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
              <Form.Button color='teal' fluid size='large'>
                Login
              </Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
LoginForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};
export default LoginForm;
