import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class caseForm extends Component() {

    state = { case : '' };

    handleChange = (event) => {

        this.setState({ case: event.target.value })
    };

    handleSubmit = event => {

        event.preventDefault();

        // Call an action creator
        // and save the comment

        // this.prop.saveComment(this.state.comment);

        this.setState({ comment: '' });

    };


    render() {
        return (
            <Form>
                <Form.Field>
                    <label> Enter a case: </label>
                    <input placeholder='Enter a case' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
}

export default caseForm