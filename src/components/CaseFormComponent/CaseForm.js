import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

class CaseForm extends Component {

    state = { case : " " };

    handleSubmit = event => {

        event.preventDefault();

        // Call an action creator
        // And save the comment

        this.setState({ case: '' });

    };

    handleChange = event => {

        this.setState({ case : event.target.value })
    };

    render() {

        return (

            <Form onSubmit={this.handleSubmit}>
                <h4> Add a Case </h4>

                <Form.Field>
                    <label>Add a case: </label>
                    <input onChange={ this.handleChange } value = { this.state.case } placeholder='Add a case ' />
                </Form.Field>

                <Button>Submit A case </Button>

            </Form>

        );
    }
}

export default CaseForm;

/*


 <form onSubmit={this.handleSubmit}>
                <h4>Add a Comment </h4>
                <textarea onChange={this.handleChange} value={this.state.comment}/>
                <div>
                    <button>Submit Comment</button>
                </div>
            </form>




*/