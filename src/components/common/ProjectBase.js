import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Card, Label, Icon, Input, Divider } from 'semantic-ui-react';
import './projectBase.css';

const ProjectBase = (props) => {
  const { ProjectBaseName, ProjectDescription, buttons, startTime, budget, isOneProject } = props;
  return (
    <Grid.Column className='project-list'>
      {isOneProject &&
      <Grid container>
        <Input label='Project Budget in £' value={budget} className='mini' />
        <Label>
          <Icon name='time' />{startTime}
        </Label>
        <Divider />
      </Grid>}
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
  isOneProject: PropTypes.bool,
  budget: PropTypes.number,
  startTime: PropTypes.number,
};
ProjectBase.defaultProps = {
  buttons: [],
  isOneProject: false,
  budget: 0,
  startTime: 0,
};
export default ProjectBase;
