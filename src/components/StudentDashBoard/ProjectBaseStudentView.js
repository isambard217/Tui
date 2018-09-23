import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'semantic-ui-react';
import ProjectBase from '../common/ProjectBase';
import SelectProjectModal from './SelectProjectModal';

class ProjectBaseStudentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectProjectModalOpen: false,
    };
    this.openCloseSelectProjectModal = this.openCloseSelectProjectModal.bind(this);
  }
  openCloseSelectProjectModal(event) {
    event.preventDefault();
    const { isSelectProjectModalOpen } = this.state;
    if (isSelectProjectModalOpen) { return this.setState({ isSelectProjectModalOpen: false }); }
    return this.setState({ isSelectProjectModalOpen: true });
  }
  render() {
    const { name, description, id, selectProjectHandler, budget, startTime, isOneProject }
    = this.props;
    const Buttons = [<SelectProjectModal
      key={_.uniqueId()}
      trigger={<Button
        className='mini basic green'
        onClick={this.openCloseSelectProjectModal}
      > Select </Button>}
      id={id}
      name={name}
      description={description}
      openCloseHandler={this.openCloseSelectProjectModal}
      onSelectHandler={selectProjectHandler}
      isOpen={this.state.isSelectProjectModalOpen}
    />];
    return (
      <ProjectBase
        isOneProject={isOneProject}
        budget={budget}
        startTime={startTime}
        ProjectBaseName={name}
        ProjectDescription={description}
        buttons={isOneProject ? [] : Buttons}
      />
    );
  }
}
ProjectBaseStudentView.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  selectProjectHandler: PropTypes.func.isRequired,
  budget: PropTypes.number,
  startTime: PropTypes.number,
  isOneProject: PropTypes.bool.isRequired,
};
ProjectBaseStudentView.defaultProps = {
  budget: 0,
  startTime: 0,
};
export default ProjectBaseStudentView;
