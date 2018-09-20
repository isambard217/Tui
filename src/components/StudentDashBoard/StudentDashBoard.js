import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Sidebar, Menu, Segment, Header } from 'semantic-ui-react';
import './StudentDashBoard.css';
import ProjectBasesList from '../common/ProjectBasesList';
import TechniquesList from './TechniquesList';
import Analysis from './Analysis';
import AppNavigationHeader from '../common/AppNavigationHeader';

class StudentDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'Projects',
      activeComponent: <ProjectBasesList />,
      user: {},
    };

    this.onSideBarClick = this.onSideBarClick.bind(this);
  }
  componentDidMount() {
    const { verifyAuthentication, getUserDetailsHandler, verifyAuthorization } = this.props;
    verifyAuthentication();
    verifyAuthorization('student_dash_board');
    this.setState({ user: getUserDetailsHandler() });
  }
  onSideBarClick(event, { name }) {
    event.preventDefault();
    let { activeComponent, activeMenu } = this.state;
    switch (name) {
      case 'Projects':
        activeMenu = 'Projects';
        activeComponent = <ProjectBasesList />;
        break;
      case 'Technique':
        activeMenu = 'Technique';
        activeComponent = <TechniquesList />;
        break;
      case 'Request Analysis':
        activeMenu = 'Request Analysis';
        activeComponent = <Analysis />;
        break;
      default:
        activeMenu = 'ProjectBase';
        activeComponent = <ProjectBasesList />;
    }
    this.setState({ activeMenu, activeComponent });
  }
  render() {
    const { onSideBarClick } = this;
    const { activeComponent, activeMenu, user } = this.state;
    const { signOutHandler } = this.props;
    return (
      <Grid className='center two column aligned top aligned student-dashBoard' container>
        <AppNavigationHeader
          fullName={`${user.firstName} ${user.lastName}`}
          userName={user.sub}
          signOutHandler={signOutHandler}
        />
        <Sidebar.Pushable as={Segment}>
          <Grid.Column width={4}>
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              vertical
              visible
              width='thin'
              className='student-menu'
            >
              <Menu.Item
                as='a'
                name='Projects'
                icon='home'
                onClick={onSideBarClick}
              />
              <Menu.Item
                as='a'
                icon='magnify'
                name='Technique'
                onClick={onSideBarClick}
              />
              <Menu.Item
                as='a'
                icon='in cart'
                name='Request Analysis'
                onClick={onSideBarClick}
              />
            </Sidebar>
          </Grid.Column>
          <Sidebar.Pusher>
            <Grid.Column width={12}>
              <Header>{activeMenu}</Header>
              {activeComponent}
            </Grid.Column>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid>
    );
  }
}
StudentDashBoard.propTypes = {
  getUserDetailsHandler: PropTypes.func.isRequired,
  signOutHandler: PropTypes.func.isRequired,
  verifyAuthentication: PropTypes.func.isRequired,
  verifyAuthorization: PropTypes.func.isRequired,
};
export default StudentDashBoard;
