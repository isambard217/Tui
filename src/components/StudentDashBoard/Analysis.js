import React from 'react';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import { Grid, Form, Select, Input, Card } from 'semantic-ui-react';
import Swagger from 'swagger-client';
import ProjectEntity from '../domain/ProjectEntity';

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      techniqueRequests: [],
      projects: [],
      samples: [],
      techniques: [],
      isOneProject: false,
      techniquesOptions: [],
      technique: -1,
      sample: -1,
      specieName: '',
    };
    this.getSamplesOption = this.getSamplesOption.bind(this);
    this.requestAnalysis = this.requestAnalysis.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const authString = window.localStorage.getItem('auth');
    const authTokenToDecode = _.trimStart(authString, 'ApiUser');
    const { apiUserId } = jwtDecode(authTokenToDecode);
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    const auth = window.localStorage.getItem('auth');
    Swagger(serverUrl)
      .then(client => client.apis.projects.getProjectsUsingGET({ auth, apiUserId }))
      .then(({ body }) => {
        const projects = [];
        let projectId;
        if (body.length === 1) {
          const project = body[0];
          projectId = project.id;
          projects.push(new ProjectEntity(project.id, project.template.name,
            project.template.description, project.budget, project.startTime));
          this.setState({ projects, isOneProject: true });
          Swagger(serverUrl)
            .then(client => client.apis.samples.getUsingGET({ auth, projectId }))
            .then(res => this.setState({ samples: res.body }));
        }
        this.setState({ projects: body, isOneProject: false });
        return Swagger(serverUrl)
          .then(client => client.apis.techniques.listUsingGET_1({ auth }))
          .then((response) => {
            const techniquesOptions = [];
            _.forEach(response.body, technique => techniquesOptions.push({
              key: technique.id, text: technique.name, value: technique.id }));
            return this.setState({ techniquesOptions, techniques: response.body });
          });
      })
      .catch(error => console.log(error));
  }
  onChange(event, { name, value }) {
    event.preventDefault();
    this.setState({ [name]: value });
  }
  getSamplesOption() {
    const { samples } = this.state;
    const samplesOptions = [];
    _.forEach(samples, sample => samplesOptions.push({
      key: sample.id, text: sample.name, value: sample.id }));
    return samplesOptions;
  }
  requestAnalysis(evnet) {
    evnet.preventDefault();
    const { technique, sample, samples, techniques, specieName } = this.state;
    const sampleSelcted = _.filter(samples, sam => sam.id === sample)[0];
    const techSelected = _.filter(techniques, tech => tech.id === technique)[0];
    const techniqueRequest = {
      project: sampleSelcted.project,
      sample: sampleSelcted,
      technique: techSelected,
    };
    techniqueRequest.specieName = specieName;
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    const auth = window.localStorage.getItem('auth');
    Swagger(serverUrl)
      .then(client => client.apis['technique-requests']
        .requestTechniqueUsingPOST({ auth, techniqueRequest }))
      .then(({ body }) => {
        const { techniqueRequests } = this.state;
        techniqueRequests.push(body);
        return this.setState({ techniqueRequests });
      })
      .catch(error => console.log(error));
  }
  render() {
    const samplesOptions = this.getSamplesOption();
    const { techniquesOptions } = this.state;
    return (
      <Grid>
        <Form>
          <Form.Field
            search
            control={Select}
            name='sample'
            options={samplesOptions}
            placeholder='Please select sample'
            onChange={this.onChange}
          />
          <Form.Field
            search
            control={Select}
            name='technique'
            options={techniquesOptions}
            placeholder='select a technique'
            onChange={this.onChange}
          />
          <Form.Field
            control={Input}
            fluid
            label='Specie name'
            placeholder='Specie name'
            onChange={this.onChange}
            name='specieName'
          />
          <Form.Button className='basic' color='green' onClick={this.requestAnalysis}>
            Request Tech Analysis</Form.Button>
        </Form>
        {
          _.map(this.state.techniqueRequests, techR => (<Grid.Row key={_.uniqueId()}>
            <Card.Content header={techR.id} />
          </Grid.Row>))
        }
      </Grid>);
  }
}
export default Analysis;
