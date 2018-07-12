import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

class SettingsHeader extends React.Component {
  render (){
    return (
      <Header as='h2' icon>
      <Icon name='settings' />
      Lecturer Settings
      <Header.Subheader>Manage your account settings and set e-mail preferences.</Header.Subheader>
      </Header>
      );
  }
}
export default SettingsHeader;
