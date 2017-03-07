import React from 'react';
import ReactDOM from 'react-dom';
import Login from 'src/components/Login/Login';

describe('Component :: Login', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login />, div);
    });

});