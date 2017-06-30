import React from 'react';
import ReactDOM from 'react-dom';
import MThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import tapEventPlugin from 'react-tap-event-plugin';

const myTheme = getMuiTheme({
	palette: {
		primary1Color: '#008080'
	}
})

tapEventPlugin();

import App from './app/App';

import './index.sass';

const Renderer = () => (
	<MThemeProvider muiTheme={myTheme}>
		<App />
	</MThemeProvider>
)

ReactDOM.render(<Renderer />, document.querySelector("#root"));