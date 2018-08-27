import React from 'react';
import { Grid, Accordion, Icon } from 'semantic-ui-react';
import Swagger from 'swagger-client';
import _ from 'lodash';
import './techniquesList.css';

class TechniquesList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      techniques: [],
      activeIndex: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    const serverUrl = JSON.stringify(window.location).includes('localhost') ?
      'http://localhost:8080/v2/api-docs' : 'https://www227.lamp.le.ac.uk/v2/api-docs';
    Swagger(serverUrl)
      .then(client =>{
        return client.apis.techniques.listUsingGET();
      })
      .then(({ body }) => this.setState({ techniques: body }))
      .catch(error => console.log('could not get api client' + error.toString()));
  }
  
  handleClick(event, titleProps){
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    
    this.setState({ activeIndex: newIndex });
  }
  
  render(){
    const { techniques, activeIndex } = this.state;
    return (
      <Grid className='one column justified top aligned techniques'>
        <Grid.Column width={16}>
          <Accordion fluid styled>
            {
              _.map(techniques, technique => (
                <Grid.Row key={technique.id}>
                  <Accordion.Title active={activeIndex === technique.id} index={technique.id} onClick={this.handleClick}>
                    <Icon name='dropdown'/>
                    {technique.name}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === technique.id}>
                    <p>
                      {technique.briefDescription}
                    </p>
                  </Accordion.Content>
                </Grid.Row>
              ))
            }
          </Accordion>
        </Grid.Column>
      </Grid>
    );
  }
}

export default TechniquesList;
