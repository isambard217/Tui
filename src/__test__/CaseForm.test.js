import React from 'react';
import { shallow, mount } from 'enzyme';

// Components
import CaseForm from 'components/CaseForm/CaseForm';

let wrapped;

beforeEach(() => {
    wrapped = mount(<CaseForm />);
});

afterEach(() => {
    wrapped.unmount();  
});


it('has an input field and has a button', () => {

    expect(wrapped.find('input').length).toEqual(1);
    expect(wrapped.find('Button').length).toEqual(1);

});

