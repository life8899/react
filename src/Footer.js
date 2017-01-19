import React, { Component } from 'react';

class Footer extends Component {

	render() {

		var style = {
			textAlign: "center",
			marginTop: 70,
		};
	
		return (
			<footer>
			  <p style={style}>Copyright &copy; 2016 &middot; All Rights Reserved &middot; <a href="http://www.bethesdasofttech.com/" >Bethesda SoftTech LLC</a></p>
			</footer>
		);
	};
}
export default Footer;