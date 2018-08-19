import React from 'react';
import { Grid, Header, Button, Label} from 'semantic-ui-react';
import Avatar from 'react-avatar';
import './AppNavigationHeader.css';
import BasicStudentAvatar from './basicStudentAvatar.png';

class AppNavigationHeader extends React.Component {
  
  render () {
    return (
      <Grid className='equal width main-header' columns={3}>
        <Grid.Column className='left aligned'>
          <Avatar size='50' name='Tom Hardning' round={true} src={BasicStudentAvatar}/>
          <Label className='student-name'>Tom Hardning</Label>
        </Grid.Column>
        <Grid.Column className='center aligned'>
          <Header as="h4"> £1,500 credits remaining </Header>
        </Grid.Column>
        <Grid.Column className='right aligned'>
          <Button
            className='basic red'
            content='Sign out'
            icon='sign out alternate'
            labelPosition='right'
          />
        </Grid.Column>
      </Grid>);
  }
}

export default AppNavigationHeader;
