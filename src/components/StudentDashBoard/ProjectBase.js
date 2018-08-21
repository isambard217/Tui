import React from 'react';
import { Grid, Button, Card } from 'semantic-ui-react';
import './projectBase.css';

const ProjectBase = (props) => {
    const { ProjectBaseName, ProjectDescription } = props;
  return  (
    <Grid.Column className='project-list'>
    <Card>
      <Card.Content>
        <Card.Header>
          {ProjectBaseName}
        </Card.Header>
          <Card.Description>
            {ProjectDescription}
          </Card.Description>
          <Card.Content extra>
              <Button basic color='green' className='mini'>
                  Select
              </Button>
          </Card.Content>
      </Card.Content>
    </Card>
    </Grid.Column>
  );
};

export default ProjectBase;
