import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default function AccessDenied() {
  return (
    <Grid className='one column' container>
      <Grid.Column width={16}>
        <Grid.Row>
          <Header content='Access denied ...' className='large red error' />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}
