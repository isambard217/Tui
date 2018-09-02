import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Sidebar, Menu, Segment, Header } from 'semantic-ui-react';
import "./StudentDashBoard.css";
import ProjectBasesList from './ProjectBasesList';
import TechniquesList from './TechniquesList';
import Analysis from './Analysis';
import AppNavigationHeader from '../common/AppNavigationHeader';

class StudentDashBoard extends Component {
  constructor(props){
    super(props);
    this.state ={
      student: {name: 'Tom Hardning', account:'th32'},
      activeMenu: 'Projects',
      activeComponent:<ProjectBasesList />,
      userName:'unknown user'
    }
    
    this.onSideBarClick = this.onSideBarClick.bind(this);
  }
  onSideBarClick(event, { name }) {
    event.preventDefault();
    let { activeComponent, activeMenu} = this.state;
    switch (name) {
      case 'Projects':
        activeMenu = 'Projects';
        activeComponent = <ProjectBasesList /> ;
        break;
      case 'Technique':
        activeMenu ='Technique';
        activeComponent=  <TechniquesList />;
        break;
      case 'Request Analysis':
        activeMenu ='Request Analysis';
        activeComponent=  <Analysis />;
        break;
      default:
        activeMenu = 'ProjectBase';
        activeComponent = <ProjectBasesList /> ;
    }
    
    this.setState({activeMenu, activeComponent});
    
  }
  componentDidMount(){
    const { verifyAuthentication, getUserDetailsHandler } = this.props;
    verifyAuthentication();
    this.setState({ userName: getUserDetailsHandler() });
  }
  render() {
    const { onSideBarClick } = this;
    const { activeComponent, activeMenu, userName } = this.state;
    const { signOutHandler } = this.props;
    return (
      <Grid className='center two column aligned top aligned student-dashBoard' container>
        <AppNavigationHeader userName={userName} signOutHandler={signOutHandler} />
        <Sidebar.Pushable as={Segment}>
          <Grid.Column width={4}>
            <Sidebar as={Menu} animation='overlay' icon='labeled' vertical visible width='thin' className='student-menu'>
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
};
export default StudentDashBoard;
