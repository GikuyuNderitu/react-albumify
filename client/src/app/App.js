import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GridList from 'material-ui/GridList';


import { Header, Footer, Home, Landing, Login, Register, NotFound } from './components';


import styles from './App.sass';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<Router>
				<div className= {styles.container} >
					<Header />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route component={NotFound} />
					</Switch>
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App;