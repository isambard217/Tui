import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Menu, Segment, Grid } from 'semantic-ui-react';

const AdminMainMenu = (props) => {
  const { onMenuItemClickHandler } = props;
  return (
    <Grid container>
      <Menu attached='top'>
        <Dropdown item icon='wrench' simple>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name='dropdown' />
              <span className='text'>New</span>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={onMenuItemClickHandler}
                >Project</Dropdown.Item>
                <Dropdown.Item
                  onClick={onMenuItemClickHandler}
                >Technique</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={onMenuItemClickHandler}
            >Projects</Dropdown.Item>
            <Dropdown.Item
              onClick={onMenuItemClickHandler}
            >Techniques</Dropdown.Item>
            <Dropdown.Item
              onClick={onMenuItemClickHandler}
            >Events</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Extras ...</Dropdown.Header>
            <Dropdown.Item
              onClick={onMenuItemClickHandler}
            >Import</Dropdown.Item>
            <Dropdown.Item
              onClick={onMenuItemClickHandler}
            >Export</Dropdown.Item>
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
