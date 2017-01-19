import React, { Component } from 'react';
import './Header.css';


class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.onSignOut = this.onSignOut.bind(this);
	}

	onSignOut(e){
		// console.log('submit');
		e.preventDefault();
		this.props.onSignOut(this.props.appModule);	
	}

	render() {
		return (
			<div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
			  <div className="container">
		        <div className="navbar-header">
		          <a className="navbar-brand" href="/">{this.props.title}</a>
		        </div>
		        <div className="navbar navbar-right">
		        	<button type="button" className="btn btn-link" onClick={this.props.onListRecord} >
			        	<span className="glyphicon glyphicon-home"></span> Home
			        </button>
			        <button type="button" className="btn btn-link" onClick={this.onSignOut} >
			        	<span className="glyphicon glyphicon-log-out"></span> Logout
			        </button>
		        </div>
		      </div>
			</div>
		);
	};
}
export default Header;