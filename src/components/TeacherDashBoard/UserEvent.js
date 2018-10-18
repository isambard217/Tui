import Swagger from 'swagger-client';
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Checkbox, Divider } from 'semantic-ui-react';
import _ from 'lodash';

class UserEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEvents: [],
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  componentDidMount() {
    const { userName, userEvents } = this.props;
    this.setState({ userName, userEvents });
  }
  onClickHandler(event, { id }) {
    event.preventDefault();
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis['teacher-events'].updateEventUsingPUT({ auth, eventId: id });
      })
      .then(() => { this.props.reloadUsers(); })
      .catch(error => console.log(error));
  }
  render() {
    const { userName, userEvents } = this.state;
    return (
      <Grid container>
        {
          _.map(userEvents, (userEvent) => {
            const eventTime = new Date(parseFloat(userEvent.timeStamp));
            return (
              <Grid.Row key={_.uniqueId()} className={userEvent.handled ? 'green' : 'yellow'}>
                <Grid.Column>{userName}</Grid.Column>
                <Checkbox
                  id={userEvent.id}
                  toggle
                  checked={userEvent.handled}
                  onClick={this.onClickHandler}
                />
                <Grid.Column>{userEvent.name}</Grid.Column>
                <Grid.Column>{`${eventTime.getDate()}/${eventTime.getMonth()}`}</Grid.Column>
                <Grid.Column>{`${eventTime.getHours()}:${eventTime.getMinutes()}`}</Grid.Column>
              </Grid.Row>);
          })
        }
        <Divider clearing />
      </Grid>);
  }
}
UserEvent.propTypes = {
  userName: PropTypes.string.isRequired,
  userEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  reloadUsers: PropTypes.func.isRequired,
};
export default UserEvent;
