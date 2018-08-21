import React from 'react';
import { Grid } from 'semantic-ui-react';
import ProjectBase from './ProjectBase'
import './projectBasesList.css';

class ProjectBasesList extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <Grid className='left aligned equal width fluid' container columns={3}>
      <ProjectBase
        ProjectBaseName='Old Man killed in library'
        ProjectDescription='Description of the porject goes here ...'
      />
        <ProjectBase
          ProjectBaseName='Old Man killed in library'
          ProjectDescription='Description of the porject goes here ...'
        />
        <ProjectBase
          ProjectBaseName='Old Man killed in library'
          ProjectDescription='Description of the porject goes here ...'
        />
        <ProjectBase
          ProjectBaseName='Old Man killed in library'
          ProjectDescription='Description of the porject goes here ...'
        />
        <ProjectBase
          ProjectBaseName='Old Man killed in library'
          ProjectDescription='Description of the porject goes here ...'
        />
        <ProjectBase
          ProjectBaseName='Old Man killed in library'
          ProjectDescription='Description of the porject goes here ...'
        />
        <ProjectBase
          ProjectBaseName='Old Man killed in library'
          ProjectDescription='Description of the porject goes here ...'
        />
      </Grid>
    );
  }
}

export default ProjectBasesList;
