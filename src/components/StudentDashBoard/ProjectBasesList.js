import React from 'react';
import Swagger from 'swagger-client';
import _ from 'lodash';
import { Grid } from 'semantic-ui-react';
import ProjectBase from './ProjectBase'
import './projectBasesList.css';

class ProjectBasesList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      projects: [],
    };
  }
  
  componentDidMount(){
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/Api-docs';
    Swagger(serverUrl)
      .then(client =>{
        const auth = window.localStorage.getItem('auth');
       return client.apis.templates.getTemplatesUsingGET({ auth });
      })
      .then(({ body }) => this.setState({ projects: body }))
      .catch(error => console.log('could not get Api client'));
  }
  
  render() {
    const { projects } = this.state;
    return (
      <Grid className='left aligned equal width fluid' container columns={3}>
        {
          _.map( projects, project => (
            <ProjectBase
              key={_.uniqueId()}
              ProjectBaseName={project.name}
              ProjectDescription={project.description}
            />
          ))
        }
      </Grid>
    );
  }
}

export default ProjectBasesList;
