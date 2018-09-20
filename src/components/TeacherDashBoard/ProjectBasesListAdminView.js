import React from 'react';
import Swagger from 'swagger-client';
import { Grid, Button } from 'semantic-ui-react';
import _ from 'lodash';
import ProjectBase from '../common/ProjectBase';

class ProjectBasesListAdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectBases: [],
    };
    this.createButtons = this.createButtons.bind(this);
    this.updateProjectBase = this.updateProjectBase.bind(this);
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
  updateProjectBase(event, { id }) {
    event.preventDefault();
    const { projectBases } = this.state;
    const projectToUpdate = _.filter(projectBases, projectBase => projectBase.id === id);
    console.log(projectToUpdate);
  }
  createButtons(projectBase) {
    const buttons = [];
    const deletButton = (<Button
      className='red mini basic'
      key={_.uniqueId()}
      id={projectBase.id}
    >Delete</Button>);
    const updateButton = (<Button
      className='green mini basic'
      key={_.uniqueId()}
      id={projectBase.id}
      onClick={this.updateProjectBase}
    >Update</Button>);
    buttons.push(updateButton);
    buttons.push(deletButton);
    return buttons;
  }
  render() {
    const { projectBases } = this.state;
    return (
      <Grid>
        {_.map(projectBases, projectBase => (
          <ProjectBase
            key={_.uniqueId()}
            ProjectBaseName={projectBase.name}
            ProjectDescription={projectBase.description}
            buttons={this.createButtons(projectBase)}
          />))}
      </Grid>
    );
  }
}
export default ProjectBasesListAdminView;
