import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Header, Divider, Label } from 'semantic-ui-react';
import _ from 'lodash';

class DeleteProjectBaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }
  componentDidMount() {
    const { name, description } = this.props;
    this.setState({ name, description });
  }
  render() {
    const { trigger, id, isOpen, description, name, onDeleteHandler, openCloseHandler }
      = this.props;
    return (
      <Modal
        open={isOpen}
        trigger={trigger}
        basic
        size='small'
      >
        <Header icon='archive' content={`Archive Old Project:  ${name}`} />
        <Modal.Content>
          <Label className='red'>Id</Label>
          <p>{id}</p>
          <Divider />
          <Label className='red'>description</Label>
          <p> {description} </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color='green'
            inverted
            onClick={openCloseHandler}
          >
            <Icon name='remove' /> No
          </Button>
          <Button
            onClick={(event) => {
              event.preventDefault();
              onDeleteHandler(id);
            }}
            color='red'
            inverted
          >
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
DeleteProjectBaseModal.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  trigger: PropTypes.node,
  openCloseHandler: PropTypes.func.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
DeleteProjectBaseModal.defaultProps = {
  trigger: <Button
    className='green mini basic'
    key={_.uniqueId()}
  >Update</Button>,
};
export default DeleteProjectBaseModal;
