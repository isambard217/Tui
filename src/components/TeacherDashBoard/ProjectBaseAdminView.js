import Swagger from 'swagger-client';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'semantic-ui-react';
import ProjectBase from '../common/ProjectBase';
import UpdateProjectBaseModal from './UpdateProjectBaseModal';
import DeleteProjectBaseModal from './DeleteProjectBaseModal';

class ProjectBaseAdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdateModalOpen: false,
      isDeleteModalOpen: false,
    };
    this.updateProjectBaseHandler = this.updateProjectBaseHandler.bind(this);
    this.deleteProjectBaseHandler = this.deleteProjectBaseHandler.bind(this);
    this.createUpdateDeleteModals = this.createUpdateDeleteModals.bind(this);
    this.openCloseUpdateModal = this.openCloseUpdateModal.bind(this);
    this.openCloseDeleteModal = this.openCloseDeleteModal.bind(this);
  }
  openCloseUpdateModal(event) {
    event.preventDefault();
    const { isUpdateModalOpen } = this.state;
    if (isUpdateModalOpen) { return this.setState({ isUpdateModalOpen: false }); }
    return this.setState({ isUpdateModalOpen: true });
  }
  openCloseDeleteModal(event) {
    event.preventDefault();
    const { isDeleteModalOpen } = this.state;
    if (isDeleteModalOpen) { return this.setState({ isDeleteModalOpen: false }); }
    return this.setState({ isDeleteModalOpen: true });
  }
  updateProjectBaseHandler(projectBase) {
    const { reloadProjectBases } = this.props;
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis.templates.updateTemplatesUsingPUT({ auth, templates: [projectBase] });
      })
      .then(() => reloadProjectBases())
      .catch(error => Promise.reject(error));
  }
  deleteProjectBaseHandler(id) {
    const { reloadProjectBases } = this.props;
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis.templates.deleteTemplateUsingDELETE({ auth, id });
      })
      .then(() => reloadProjectBases())
      .catch(error => Promise.reject(error));
  }
  createUpdateDeleteModals() {
    const { id, name, description } = this.props;
    const modals = [];
    const deleteModal = (
      <DeleteProjectBaseModal
        key={_.uniqueId()}
        id={id}
        name={name}
        description={description}
        openCloseHandler={this.openCloseDeleteModal}
        onDeleteHandler={this.deleteProjectBaseHandler}
        isOpen={this.state.isDeleteModalOpen}
        trigger={<Button
          className='mini basic red'
          onClick={this.openCloseDeleteModal}
        >Delete</Button>}
      />);
    const updateModal = (
      <UpdateProjectBaseModal
        key={_.uniqueId()}
        name={name}
        id={id}
        description={description}
        openCloseHandler={this.openCloseUpdateModal}
        onUpdateHandler={this.updateProjectBaseHandler}
        isOpen={this.state.isUpdateModalOpen}
        trigger={<Button
          className='mini basic orange'
          onClick={this.openCloseUpdateModal}
        >Update</Button>}
      />);
    modals.push(updateModal);
    modals.push(deleteModal);
    modals.push();
    return modals;
  }
  render() {
    const { name, description } = this.props;
    return (
      <ProjectBase
        ProjectBaseName={name}
        ProjectDescription={description}
        buttons={this.createUpdateDeleteModals()}
      />);
  }
}
ProjectBaseAdminView.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  reloadProjectBases: PropTypes.func.isRequired,
};
export default ProjectBaseAdminView;
