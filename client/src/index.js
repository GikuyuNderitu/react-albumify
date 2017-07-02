import React from 'react';
import ReactDOM from 'react-dom';

// Redux things
import { Provider } from 'react-redux';

// Material Components
import MThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import tapEventPlugin from 'react-tap-event-plugin';

// Semantic UI styles
// import 'semantic-ui-css/semantic.min.css';

import { store } from './app/state';

const myTheme = getMuiTheme({
	palette: {
		primary1Color: '#008080'
	}
})

tapEventPlugin();

import App from './app/App';

import './index.sass';

const Root = () => (
	<Provider store={store}>
		<MThemeProvider muiTheme={myTheme}>
			<App />
		</MThemeProvider>
	</Provider>

)

ReactDOM.render(<Root />, document.querySelector("#root"));