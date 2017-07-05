import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { attemptAuth } from '../../state/actions/authActions';
import { SIGNING_IN_ERROR, SIGNING_IN_SUCCESS } from '../../state/actions/types';

const ProtectedRoute = ({component: ComposedComponent, isAuthenticated, ...rest}) => {
	console.log('from protected route',isAuthenticated);
	return (
	<Route {...rest} render={ props => (
		isAuthenticated ?
			<ComposedComponent auth={isAuthenticated} {...props} /> :
			<Redirect to='/' />
	)} />
)}

class Authenticated extends Component {
	componentWillMount() {
		console.log(this.props,'from component will mount');
		if(this.props.isAuthenticated) {
			console.log('props is authenticated');
			if(this.props.match.path === '/') {
				return this.props.history.push('/home');
			}
			return
		}
		console.log('about to attempt auth');
		this.props.attemptAuth()
		.then( _ => {})
		.catch(_ => this.props.history.replace('/'));
		
	}

	render() {
		return (
			<Route {...this.props} render={ props => (
				props.isAuthenticated ?
					<this.props.Component {...props}/> :
					<Redirect to="/" />
			)}/>
		)
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

export { ProtectedRoute };

export default connect(null, mapDispatchToProps)(Authenticated);