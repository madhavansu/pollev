import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { bool, any, object } from 'prop-types';

const UnProtectedRouteHoc = ({ component: Component, isLoggedIn, ...rest }) => {
	console.log(isLoggedIn);
	if (!isLoggedIn || rest.public) {
		console.log('reports')
		return (
			<Route
				{...rest}
				render={props => {
					return <Component {...props}></Component>;
				}}
			/>
		);
	}
	return <Redirect to={{ pathname: '/' }} />;
};

UnProtectedRouteHoc.propTypes = {
	component: any,
	isLoggedIn: bool,
	rest: object,
	props: object,
};

export default withRouter(UnProtectedRouteHoc);