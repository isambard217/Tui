import React from 'react';
import { Modal, Button, Icon, Header, Label, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const SelectProjectModal = (props) => {
  const { trigger, id, isOpen, description, name, onSelectHandler, openCloseHandler }
    = props;
  return (<Modal
    open={isOpen}
    trigger={trigger}
    basic
    size='small'
  >
    <Header icon='fork' content={`Are you sure you want to select Project:  ${name} ?`} />
    <Modal.Content>
      <Label className='green'>Id</Label>
      <p>{id}</p>
      <Divider />
      <Label className='green'>description</Label>
      <p> {description} </p>
    </Modal.Content>
    <Modal.Actions>
      <Button
        basic
        color='red'
        inverted
        onClick={openCloseHandler}
      >
        <Icon name='remove' /> No
      </Button>
      <Button
        onClick={(event) => {
          event.preventDefault();
          onSelectHandler(id);
        }}
        color='green'
        inverted
      >
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>);
};
SelectProjectModal.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  trigger: PropTypes.node,
  openCloseHandler: PropTypes.func.isRequired,
  onSelectHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
SelectProjectModal.defaultProps = {
  trigger: <Button
    className='green mini basic'
    key={_.uniqueId()}
  >Select</Button>,
};
export default SelectProjectModal;
