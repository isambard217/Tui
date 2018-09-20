import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Button, Card } from 'semantic-ui-react';
import './projectBase.css';

const ProjectBase = (props) => {
  const { ProjectBaseName, ProjectDescription, buttons } = props;
  return (
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
            {_.map(buttons, button => button)}
          </Card.Content>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};
ProjectBase.propTypes = {
  ProjectBaseName: PropTypes.string.isRequired,
  ProjectDescription: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.node),
};
ProjectBase.defaultProps = {
  buttons: [<Button key={_.uniqueId()} basic color='green' className='mini'>Select</Button>],
};
export default ProjectBase;
