import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from '../Header/Header';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
    render() {
        return (
            <section className="app">
                <MuiThemeProvider>
                    <Header />
                </MuiThemeProvider>
            </section>
        );
    }
}

export default App;
