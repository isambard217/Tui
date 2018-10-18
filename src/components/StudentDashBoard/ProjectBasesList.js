import Swagger from 'swagger-client';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid } from 'semantic-ui-react';
import './projectBasesList.css';
import ProjectBaseStudentView from './ProjectBaseStudentView';
import ProjectEntity from '../domain/ProjectEntity';
import Analysis from './Analysis';

class ProjectBasesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      isSelectModalOpen: false,
      isOneProject: false,
      apiUserId: -1,
    };
    this.selectProjectHandler = this.selectProjectHandler.bind(this);
    this.reloadProjectBases = this.reloadProjectBases.bind(this);
  }
  componentDidMount() {
    const { getUserDetailsHandler } = this.props;
    const { apiUserId } = getUserDetailsHandler();
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis.projects.getProjectsUsingGET({ auth, apiUserId });
      })
      .then(({ body }) => {
        const projects = [];
        if (body.length === 1) {
          const project = body[0];
          projects.push(new ProjectEntity(project.id, project.template.name,
            project.template.description, project.budget, project.startTime));
          return this.setState({ projects, isOneProject: true, apiUserId });
        }
        return this.setState({ projects: body, isOneProject: false, apiUserId });
      })
      .catch(() => console.log('could not get Api client'));
  }
  selectProjectHandler(templateId) {
    const { getUserDetailsHandler } = this.props;
    const { apiUserId } = getUserDetailsHandler();
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis.projects.createProjectUsingPOST({ auth, apiUserId, templateId });
      })
      .then(() => window.location.reload())
      .catch(error => Promise.reject(error));
  }
  reloadProjectBases() {
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis.templates.getTemplatesUsingGET({ auth });
      })
      .then(({ body }) => {
        const projects = [];
        if (body.length === 1) {
          const project = body[0];
          projects.push(new ProjectEntity(project.id, project.template.name,
            project.template.description, project.budget, project.startTime));
          return this.setState({ projects, isOneProject: true });
        }
        return this.setState({ projects: body, isOneProject: false });
      })
      .catch(() => console.log('could not get Api client'));
  }
  render() {
    const { projects, apiUserId } = this.state;
    return (
      <Grid className='left aligned equal width fluid' container columns={1}>
        {
          _.map(projects, project => (
            <ProjectBaseStudentView
              isOneProject={this.state.isOneProject}
              budget={project.budget}
              startTime={project.startTime}
              name={project.name}
              description={project.description}
              id={project.id}
              selectProjectHandler={this.selectProjectHandler}
              key={_.uniqueId()}
              ProjectBaseName={project.name}
              ProjectDescription={project.description}
            />
          ))
        }
        <Analysis apiUserId={apiUserId} />
      </Grid>
    );
  }
}
ProjectBasesList.propTypes = {
  getUserDetailsHandler: PropTypes.func.isRequired,
};
export default ProjectBasesList;
