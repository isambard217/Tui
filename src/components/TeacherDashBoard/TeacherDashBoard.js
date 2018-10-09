import React from 'react';
import { Grid, Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AppNavigationHeader from '../common';
import AdminMainMenu from './AdminMainMenu';
import ProjectBasesListAdminView from './ProjectBasesListAdminView';
import UsersEvents from './UsersEvents';
import AddNewSystemUser from './AddNewSystemUser';

class TeacherDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      activeMenu: '',
      activeView: <ProjectBasesListAdminView />,
    };
    this.menuItemClickHandler = this.menuItemClickHandler.bind(this);
  }
  componentDidMount() {
    const { verifyAuthentication, getUserDetailsHandler, verifyAuthorization } = this.props;
    verifyAuthentication();
    verifyAuthorization('teacher_dash_board');
    this.setState({ user: getUserDetailsHandler() });
  }
  menuItemClickHandler(event, { children }) {
    event.preventDefault();
    console.log(children);
    let activeView = <Grid />;
    switch (children) {
      case 'Projects':
        activeView = <ProjectBasesListAdminView />;
        break;
      case 'Events':
        activeView = <UsersEvents />;
        break;
      case 'Student':
        activeView = <AddNewSystemUser />;
        break;
      default:
        activeView = <ProjectBasesListAdminView />;
    }
    this.setState({ activeMenu: children, activeView });
  }
  render() {
    const { user, activeView } = this.state;
    const { signOutHandler } = this.props;
    const { menuItemClickHandler } = this;
    return (
      <Grid className='center one column aligned top aligned student-dashBoard' container>
        <Grid.Column width={16}>
          <AppNavigationHeader
            fullName={`${user.firstName} ${user.lastName}`}
            userName={(typeof user.sub === 'undefined') ? 'UnKnown userName' : user.sub}
            signOutHandler={signOutHandler}
            message={<Header as='h2' className='orange'> The Trace Admin Panel</Header>}
          />
          <Divider />
          <AdminMainMenu onMenuItemClickHandler={menuItemClickHandler} />
          {activeView}
        </Grid.Column>
      </Grid>
    );
  }
}
TeacherDashBoard.propTypes = {
  verifyAuthorization: PropTypes.func.isRequired,
  getUserDetailsHandler: PropTypes.func.isRequired,
  verifyAuthentication: PropTypes.func.isRequired,
  signOutHandler: PropTypes.func.isRequired,
};
export default TeacherDashBoard;
