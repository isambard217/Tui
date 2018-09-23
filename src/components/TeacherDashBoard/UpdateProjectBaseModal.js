import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input, Form, Label, Header } from 'semantic-ui-react';
import _ from 'lodash';

class UpdateProjectBaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const { name, description } = this.props;
    this.setState({ name, description });
  }
  onChange(event, { name, value }) {
    event.preventDefault();
    this.setState({ [name]: value });
  }
  render() {
    const { name, description } = this.state;
    const { trigger, id, isOpen } = this.props;
    return (
      <Modal
        open={isOpen}
        trigger={trigger}
        header={<Header as='h2'>{`Update Project Title: ${name}`}</Header>}
        content={<Form>
          <Form.Field>
            <Label className='tiny'>Title</Label>
            <Input name='name' className='tiny' value={name} onChange={this.onChange} />
          </Form.Field>
          <Form.Field>
            <Label className='tiny'>Description</Label>
            <Input
              name='description'
              className='tiny'
              value={description}
              onChange={this.onChange}
            />
          </Form.Field>
          <Button
            className='tiny orange'
            onClick={(e) => {
              e.preventDefault();
              this.props.onUpdateHandler({ id, name, description });
            }}
          >Update</Button>
          <Button
            className='tiny green'
            onClick={this.props.openCloseHandler}
          >Cancel</Button>
        </Form>}
      />
    );
  }
}
UpdateProjectBaseModal.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  trigger: PropTypes.node,
  openCloseHandler: PropTypes.func.isRequired,
  onUpdateHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
UpdateProjectBaseModal.defaultProps = {
  trigger: <Button
    className='green mini basic'
    key={_.uniqueId()}
  >Update</Button>,
};
export default UpdateProjectBaseModal;
