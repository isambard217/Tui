import React from 'react';
import Swagger from 'swagger-client';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import ProjectBaseAdminView from './ProjectBaseAdminView';

class ProjectBasesListAdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectBases: [],
      isUpdateModalOpen: false,
    };
    this.reloadProjectBases = this.reloadProjectBases.bind(this);
  }
  componentDidMount() {
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis.templates.getTemplatesUsingGET({ auth });
      })
      .then(({ body }) => this.setState({ projectBases: body }))
      .catch(() => console.log('could not get Api client'));
  }
  reloadProjectBases() {
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis.templates.getTemplatesUsingGET({ auth });
      })
      .then(({ body }) => this.setState({ projectBases: body }))
      .catch(() => console.log('could not get Api client'));
  }
  render() {
    const { projectBases } = this.state;
    return (
      <Grid>
        {_.map(projectBases, projectBase => (
          <ProjectBaseAdminView
            key={_.uniqueId()}
            name={projectBase.name}
            description={projectBase.description}
            id={projectBase.id}
            reloadProjectBases={this.reloadProjectBases}
          />))}
      </Grid>
    );
  }
}
export default ProjectBasesListAdminView;
