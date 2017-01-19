import React, { Component } from 'react';
import { browserHistory } from 'react-router';




class Clients extends Component {
	
	redirectToLogin() {
		  if (this.props.user==null) {
		    browserHistory.push('/login');
		  } 
	}

	componentWillMount() {
      this.redirectToLogin();
   }

  render() {
  	
    return (
    	<div>
	        <p className="Clients-intro">
	          Clients page.
	        </p>
	    </div>
    );
  }
}

export default Clients;