import React from 'react';
import ReactDOM from 'react-dom';
import { SessionStorageMock } from 'src/test/mocks';
import Header from 'src/components/Header/Header';

global.sessionStorage = new SessionStorageMock;

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
});