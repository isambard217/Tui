import React from 'react';
import { shallow, mount } from 'enzyme';

// Components
import CaseForm from 'components/CaseFormComponent/CaseForm';

let wrapped;

beforeEach(() => {

    wrapped = mount(<CaseForm />);

});


it('has a text box', () => {

    expect(wrapped.find('input').length).toEqual(1);

});