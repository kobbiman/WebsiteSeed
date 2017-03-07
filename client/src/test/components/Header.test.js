import React from 'react';
import ReactDOM from 'react-dom';
import { SessionStorageMock } from 'src/test/mocks';
import Header from 'src/components/Header/Header';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import Auth from 'src/utils/Auth';

global.sessionStorage = new SessionStorageMock;

describe('Component :: Common :: Popover', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Header />, div);
    });

    it('renders the header navbar', () => {
        const component = mount(<Header />);

        expect(component.find('.navbar').length).toBe(1);
    })

    it('shows sign in button as default', () => {
        const component = shallow(<Header />);

        expect(component.find('#signInButton').length).toBe(1);
        expect(component.find('#signOutButton').length).toBe(0);
    })

    it('shows sign out button when user is logged in', () => {
        Auth.initialize('token', 1);

        const component = mount(<Header />);

        expect(component.find('#signInButton').length).toBe(0);
        expect(component.find('#signOutButton').length).toBe(1);
    })

});