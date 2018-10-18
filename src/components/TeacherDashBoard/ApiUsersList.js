import Swagger from 'swagger-client';
import React from 'react';
import _ from 'lodash';
import { Grid } from 'semantic-ui-react';
import ApiUserView from './ApiUserView';

class ApiUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUsers: [],
    };
    this.reloadUsers = this.reloadUsers.bind(this);
  }
  componentDidMount() {
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis['api-users'].listUsingGET({ auth });
      })
      .then(({ body }) => this.setState({ apiUsers: body }))
      .catch(error => Promise.reject(error));
  }
  reloadUsers() {
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis['api-users'].listUsingGET({ auth });
      })
      .then(({ body }) => this.setState({ apiUsers: body }))
      .catch(error => Promise.reject(error));
  }
  render() {
    const { apiUsers } = this.state;
    return (<Grid.Column width={16}>
      {
        _.map(apiUsers, (apiUser) => {
          const { project } = apiUser;
          let templateName = 'waiting on user to select a project ... !';
          let fileName = 'noFile';
          let budget = -1;
          if (!_.isNull(project)) {
            const { template } = project;
            templateName = template.name;
            budget = project.budget;
            fileName = _.isNull(project.fileName) ? 'uploadFile' : project.fileName;
          }
          return (<ApiUserView
            userName={apiUser.userName}
            templateName={templateName}
            budget={budget}
            key={apiUser.id}
            apiUserId={apiUser.id}
            fileName={fileName}
            reloadUsers={this.reloadUsers}
          />);
        })
      }
    </Grid.Column>);
  }
}
export default ApiUsersList;
