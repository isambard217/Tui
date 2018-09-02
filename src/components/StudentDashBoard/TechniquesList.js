import React from 'react';
import { Grid, Accordion, Icon } from 'semantic-ui-react';
import Swagger from 'swagger-client';
import _ from 'lodash';
import getServerBaseUrl from '../Api/ApiBaseUrl';
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
    const serverUrl = getServerBaseUrl();
    const swggerApiSpecsUrl = `${serverUrl}/v2/api-docs`;
    Swagger(swggerApiSpecsUrl)
      .then(client =>{
        const auth = window.localStorage.getItem('auth');
        return client.apis.techniques.listUsingGET({ auth });
      })
      .then(({ body }) => this.setState({ techniques: body }))
      .catch(error => console.log('could not get Api client' + error.toString()));
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
      <Grid className='one column justified top aligned' container>
        <Grid.Column width={16}>
          <Accordion fluid styled>
            {
              _.map(techniques, technique => (
                <Grid.Row className='techniques' key={technique.id}>
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
