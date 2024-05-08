import React from "react";

class Header extends React.Component {
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<a href="#" className="brand-logo" style={{paddingLeft:"10px"}}>
						Emaily
					</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li>
							<a href="#">Login with Google</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header;
