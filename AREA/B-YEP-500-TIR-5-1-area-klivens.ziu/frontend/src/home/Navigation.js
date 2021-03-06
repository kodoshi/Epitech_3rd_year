import React from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index.js';


class Navigation extends React.Component {

	render() {

		return (

			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<p className="navbar-brand logo text-primary logo" >AREA</p>
					</div>
					<ul className="nav navbar-tabs">
						<li className="nav-item">
							<Link className="nav-link" to="/"> Home </Link>
						</li>

						{!isAuthenticated() && (
							<React.Fragment>
								<li className="nav-item">
									<Link className="nav-link" to="/signup"> Signup </Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/signin"> Signin </Link>
								</li>
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === "subscriber" && (
							<React.Fragment>
								<li className="nav-item">
									<Link
										className="nav-link text-primary"
										to={'/discord/add'}> Discord
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-primary"
										to={'/astronaut/add'}> ISS
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-primary"
										to={'/joke/add'}> Jokes
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-primary"
										to={'/trade/add'}> Trade Info
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-primary"
										to={'/reddit/'}> Reddit
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-primary"
										to={'/weather/'}> Weather
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-primary"
										to={'/norris/add'}> Norris
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-primary"
										to={'/currency/'}> Forex
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-primary"
										to={'/user/' + isAuthenticated().user._id}> {isAuthenticated().user.name}
									</Link>
								</li>
							</React.Fragment>
						)}

						{isAuthenticated() && (
							<li className="nav-item">
								<span
									className="nav-link text-primary" style={{ cursor: "pointer" }}
									onClick={() => signout(() => this.props.history.push('/'))}>
									Signout
			</span>
							</li>
						)}

						{isAuthenticated() && isAuthenticated().user.role === "admin" && (
							<li className="nav-item">
								<Link to={`/admin`} className="nav-link">
									Admin
	        </Link>
							</li>
						)}
					</ul>
				</div>
			</nav>
		)
	}
}

export default withRouter(Navigation);