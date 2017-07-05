import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GridList from 'material-ui/GridList';

import { connect } from 'react-redux';


import { Header, Footer, Home, Landing, Login, Register, NotFound, Authenticate, Profile } from './components';
import { ProtectedRoute } from './components/authenticate/authenticate';
import { attemptAuth } from './state/actions/authActions';
import { SIGNING_IN_ERROR, SIGNING_IN_SUCCESS } from './state/actions/types';


import styles from './App.sass';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentWillMount() {
		console.log(this.props,'from component will mount');
		if(this.props.isAuthenticated) {
			console.log('props is authenticated');
			if(this.props.match.path === '/') {
				return this.props.history.push('/home');
			}
			return
		}
		this.props.attemptAuth()
		.then( _ => {})
		.catch(_ => this.props.history.replace('/'));
		
	}

	render() {
		return (
			<Router>
				<div className= {styles.container} >
					<Header isAuthenticated={this.props.isAuthenticated} />
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Register} />
						<ProtectedRoute path="/home" isAuthenticated={this.props.isAuthenticated} component={Home} />
						<Landing auth={this.props.isAuthenticated} />
						<Route path="/user" component={Profile} />
						<Route component={NotFound} />
					</Switch>
					<Footer />
				</div>
			</Router>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.authenticationReducer.user,
		isAuthenticated: state.authenticationReducer.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch, otherprops) => {
	return {
		attemptAuth() {
			return new Promise((resolve, reject) => {
				attemptAuth()
				.then(({data}) => {
					console.log(data);
					dispatch({type: SIGNING_IN_SUCCESS, payload: data})
					
					resolve();
				})
				.catch( err => {
					console.log(`Not authenticated ${err}`);
					dispatch({type: SIGNING_IN_ERROR})
				})
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);