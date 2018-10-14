import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Button, Label } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import './AppNavigationHeader.css';

const AppNavigationHeader = (props) => {
  const { fullName, userName, signOutHandler, message } = props;
  return (
    <Grid className='equal width main-header' columns={3}>
      <Grid.Column className='left aligned'>
        <Avatar size='50' name={fullName} round />
        <Label className='student-name'>{ userName }</Label>
      </Grid.Column>
      <Grid.Column className='center aligned'>
        {message}
      </Grid.Column>
      <Grid.Column className='right aligned'>
        <Button
          className='basic red'
          content='Sign out'
          onClick={signOutHandler}
          icon='sign out alternate'
          labelPosition='right'
        />
      </Grid.Column>
    </Grid>);
};
AppNavigationHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  signOutHandler: PropTypes.func.isRequired,
  fullName: PropTypes.string.isRequired,
  message: PropTypes.node,
};
AppNavigationHeader.defaultProps = {
  message: <Header as='h4' className='blue'>Wish All of You Good Luck ... Good Luck ..</Header>,
};
export default AppNavigationHeader;
