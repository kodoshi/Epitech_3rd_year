import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUserAstronaut, faLightbulb } from "@fortawesome/fontawesome-free-solid";
import { isAuthenticated } from "../auth/index.js";
import Logs from "../user/Logs.js";


class Homepage extends React.Component {
	render() {
		return (
			<div className="welcome">
				{!isAuthenticated() && (
					<div className=" cont1 text-center">
						<hr />
						<h2 className="logo">  Welcome to AREA </h2>
						<p className="logo2"> <FontAwesomeIcon icon={faUserAstronaut} />  Connect your apps and devices in new and remarkable ways</p>
						<p className="logo2"> <FontAwesomeIcon icon={faHeart} />  Make the things you love more powerful </p>
						<p className="logo2"> <FontAwesomeIcon icon={faLightbulb} />  Create services, make your apps and devices work together in new ways.  </p>
						<hr />
					</div>
				)}
				{isAuthenticated() && (
					<div className=" cont1 text-center">
						<hr />
						<h2 className="logo">  Welcome to AREA </h2>
						<hr />
						<Logs />
					</div>


				)}
			</div>
		);
	}
}

export default Homepage;