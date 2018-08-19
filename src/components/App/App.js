import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import StudentDashBoard from "../StudentDashBoard/StudentDashBoard";
import { Grid } from 'semantic-ui-react';
import AppNavigationHeader from '../common/AppNavigationHeader';

export default () => {
    return (
      <Grid className='one column'>
            <AppNavigationHeader />
            <StudentDashBoard />
        </Grid>
    );
};
