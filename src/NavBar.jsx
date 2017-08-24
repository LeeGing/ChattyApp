import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
    	<div>
				<nav className="navbar">
				  <a href="/" className="navbar-brand">Chatty</a>
				  <span className="user-count">Users Online: {this.props.usercount}</span>
				</nav>
  		</div>
  	)
  }
}
export default NavBar;
