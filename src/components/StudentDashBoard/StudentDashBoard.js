import React, { Component } from 'react';
import { Grid, Sidebar, Menu, Segment, Header } from 'semantic-ui-react';
import "./StudentDashBoard.css";
import Project from './Project';
import Technique from './Technique';
import Analysis from './Analysis';

class StudentDashBoard extends Component {
  constructor(props){
    super(props);
    this.state ={
      student: {name: 'Tom Hardning', account:'th32'},
      activeMenu: 'Project',
      activeComponent:<Project/>,
    }
    
    this.onSideBarClick = this.onSideBarClick.bind(this);
  }
  
  onSideBarClick(event, { name }) {
    event.preventDefault();
    let { activeComponent, activeMenu} = this.state;
    switch (name) {
      case 'Project':
        activeMenu = 'Project';
        activeComponent = <Project/> ;
        break;
      case 'Technique':
        activeMenu ='Technique';
        activeComponent=  <Technique/>;
        break;
      case 'Request Analysis':
        activeMenu ='Request Analysis';
        activeComponent=  <Analysis />;
        break;
      default:
        activeMenu = 'Project';
        activeComponent = <Project/> ;
    }
    
    this.setState({activeMenu, activeComponent});
    
  }
  render() {
    const { onSideBarClick } = this;
    const { activeComponent, activeMenu } = this.state;
    return (
      <Grid className='two column center aligned top aligned equal width student-dashBoard' container>
        <Sidebar.Pushable as={Segment}>
          <Grid.Column>
            <Sidebar as={Menu} animation='overlay' icon='labeled' vertical visible width='thin' className='student-menu'>
              <Menu.Item
                as='a'
                name='Project'
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
          <Grid.Column>
            <Sidebar.Pusher>
              <Segment basic>
                <Header as='h3'>{activeMenu}</Header>
                {activeComponent}
              </Segment>
            </Sidebar.Pusher>
          </Grid.Column>
        </Sidebar.Pushable>
      </Grid>
    );
    
  }
}

export default StudentDashBoard;
