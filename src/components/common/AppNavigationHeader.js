import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Button, Label} from 'semantic-ui-react';
import Avatar from 'react-avatar';
import './AppNavigationHeader.css';
import BasicStudentAvatar from './basicStudentAvatar.png';
const AppNavigationHeader = (props) => {
  const { userName, signOutHandler } = props;
    return (
      <Grid className='equal width main-header' columns={3}>
        <Grid.Column className='left aligned'>
          <Avatar size='50' name='Tom Hardning' round={true} src={BasicStudentAvatar}/>
          <Label className='student-name'>{ userName }</Label>
        </Grid.Column>
        <Grid.Column className='center aligned'>
          <Header as="h4"> £1,500 credits remaining </Header>
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
}
AppNavigationHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  signOutHandler: PropTypes.func.isRequired,
};
export default AppNavigationHeader;
