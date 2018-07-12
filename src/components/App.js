import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import SettingsHeader from './common/SettingsHeader';

import CaseForm from 'components/CaseForm/CaseForm';

export default () => {
    return (
        <div>
          <SettingsHeader/>
          <CaseForm/>
        </div>

    );
};