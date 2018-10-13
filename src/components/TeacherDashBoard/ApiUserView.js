import Swagger from 'swagger-client';
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import _ from 'lodash';

class ApiUserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      templateName: '',
      budget: '',
      prevRequestsCount: 0,
      currentRequest: '',
      projectFileName: '',
      apiUserId: -1,
    };
    this.onDrop = this.onDrop.bind(this);
  }
  componentDidMount() {
    const {
      apiUserId,
      userName,
      templateName,
      budget,
      fileName }
    = this.props;
    this.setState({ apiUserId,
      templateName,
      userName,
      budget,
      fileName });
  }
  onDrop(acceptedFiles) {
    const { apiUserId } = this.state;
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then((client) => {
        const auth = window.localStorage.getItem('auth');
        return client.apis['file-upload-controller']
          .handleFileUploadUsingPOST({ file: acceptedFiles[0], auth, apiUserId });
      })
      .then(({ body }) => console.log(body))
      .catch(error => console.log(error));
  }
  render() {
    const { templateName, userName, budget, fileName } = this.state;
    const fileViewTorender = _.isNull(fileName) ? <Dropzone onDrop={this.onDrop} /> :
    fileName;
    return (<Card className={(fileName === 'noFile') ? 'red' : 'green'}>
      <Card.Content>
        <Card.Header>{templateName}</Card.Header>
        <Card.Meta>{`User is Identified by university accout: ${userName}`}</Card.Meta>
        <Card.Description>{`£${budget}`}</Card.Description>
        {fileViewTorender}
      </Card.Content>
    </Card>);
  }
}
ApiUserView.propTypes = {
  templateName: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  apiUserId: PropTypes.number.isRequired,
};
export default ApiUserView;
