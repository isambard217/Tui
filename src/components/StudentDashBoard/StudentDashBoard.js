import React, { Component } from 'react';
import { Grid, Header, Step, Segment, Button } from 'semantic-ui-react';
import "./StudentDashBoard.css";

class StudentDashBoard extends Component {

    render() {

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Segment clearing>
                            <Header floated='left'>
                                <button className="ui left aligned">
                                    Logout
                                </button>
                            </Header>
                            <Header floated='right'>
                                <Header as="h2" className="ui right aligned header">Tom Harding</Header>
                                <Header as="h4"> £1,500 credits remaining </Header>
                            </Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>

                    <Button>
                        Projects
                    </Button>
                    <Button>
                        Technique info
                    </Button>
                    <Button>
                        Request Analysis
                    </Button>
                </Grid.Row>
            </Grid>
        );

    }

}

export default StudentDashBoard;
