import React, { Component } from 'react';

class CaseForm extends Component {

    render() {
        return (
            <form>
                <h4> Add a Case </h4>
                <textarea />
                <div>
                    <button>Submit Comment</button>
                </div>
            </form>
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