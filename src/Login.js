import React, { Component } from 'react';
import './Login.css';


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {"email": "",
			"password":""
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	updateState(e) {
      this.setState({[e.target.id]: e.target.value});
   }

	onSubmit(e){
		// console.log('submit');
		e.preventDefault();
		this.props.onSignIn(this.props.appModule, this.state.email, this.state.password);	
	}


	render() {
		
		return (
			<div className="container">
			    <div className="row">
			        <div className="col-sm-6 col-md-4 col-md-offset-4">			        
			            <div className="account-wall">
			            	<img className="profile-image" src={"./imgs/passport.png"} alt="Passport" />
			            	<form className="form-signin" onSubmit={this.onSubmit}>
			                <input id="email" type="text" className="form-control" placeholder="Email" onChange={this.updateState} required autoFocus />
			                <input id="password" type="password" className="form-control" placeholder="Password" onChange={this.updateState} required />
			                <button className="btn btn-lg btn-primary btn-block" type="submit">
			                    Sign in</button>
			                </form>
			            </div>
			        </div>
			    </div>
			</div>
			);
	}
}


export default Login;