import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Segment, Grid } from 'semantic-ui-react';

const AdminMainMenu = (props) => {
  const { onMenuItemClickHandler } = props;
  return (
    <Grid container>
      <Menu attached='top'>
        <Dropdown item icon='wrench' simple>
          <Dropdown.Menu>
            <Dropdown.Item onClick={onMenuItemClickHandler}>Student</Dropdown.Item>
            <Dropdown.Item onClick={onMenuItemClickHandler}>Projects</Dropdown.Item>
            <Dropdown.Item onClick={onMenuItemClickHandler}>Techniques</Dropdown.Item>
            <Dropdown.Item onClick={onMenuItemClickHandler}>Events</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position='right'>
          <div className='ui right aligned category search item'>
            <div className='ui transparent icon input'>
              <input className='prompt' type='text' placeholder='Search projects...' />
              <i className='search link icon' />
            </div>
            <div className='results' />
          </div>
        </Menu.Menu>
      </Menu>
      <Segment attached='bottom'>
        Projects
      </Segment>
    </Grid>
  );
};
AdminMainMenu.propTypes = {
  onMenuItemClickHandler: PropTypes.func.isRequired,
};
export default AdminMainMenu;
