import Swagger from 'swagger-client';
import React from 'react';
import _ from 'lodash';
import { Grid } from 'semantic-ui-react';
import UserEvent from './UserEvent';

class UsersEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis['api-users'].listUsingGET({ auth });
      })
      .then(({ body }) => this.setState({ users: body }))
      .catch(error => console.log(error));
  }
  render() {
    const { users } = this.state;
    return (
      <Grid>
        {
          _.map(users, user => (
            <Grid.Row key={_.uniqueId()}>
              <UserEvent
                userName={user.userName}
                userEvents={user.events}
              />
            </Grid.Row>))
        }
      </Grid>
    );
  }
}
export default UsersEvents;
