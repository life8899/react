import React, { Component } from 'react';



class Logout extends Component {

	componentWillMount() {
      this.props.onSignOut(this.props.appModule);
   }
	

	render() {
		
		return (
			<div className="logout">
				<p>You are logged out</p>
			</div>
		);
	};
}
export default Logout;