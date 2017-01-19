import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Template extends Component {


	render() {
		return (
			<div>
			<Header title="Trave Document Administration System" />
			<div className="content">
			{this.props.children}
			</div>
			<Footer />
			</div>
		);
	};
}
export default Template;