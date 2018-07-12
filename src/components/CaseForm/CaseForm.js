import React from 'react';
import { Form } from 'semantic-ui-react';
import {ProjectBaseManager} from '../ApiClient';

class CaseForm extends React.Component {

    state = { projectBase : " " };

    handleSubmit = event => {

        event.preventDefault();
        ProjectBaseManager.AddProjectBase();
        this.setState({ projectBase: '' });

    };

    handleChange = event => {

        this.setState({ projectBase : event.target.value })
    };

    render() {
      const { projectBase } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                onChange={this.handleChange}
                label="Project base"
                value={projectBase}/>
              <Form.Button> Add </Form.Button>
            </Form>

        );
    }
}

export default CaseForm;
