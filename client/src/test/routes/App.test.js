import React from 'react';
import ReactDOM from 'react-dom';
import { SessionStorageMock } from 'src/test/mocks';
import { App } from 'src/routes/App/App';

global.sessionStorage = new SessionStorageMock;

describe('Route :: App', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

});