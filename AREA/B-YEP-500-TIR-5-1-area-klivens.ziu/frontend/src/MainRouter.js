import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from './home/HomePage';
import RegisterUser from './user/RegisterUser';
import LoginUser from './user/LoginUser';
import Navigation from './home/Navigation';
import UserProfile from './user/UserProfile';
import Users from './user/Users';
import EditUser from './user/EditUser';
import CreateDiscord from './service/CreateDiscord';
import CreateAstronaut from './service/createAstronaut';
import CreateJoke from './service/createJoke';
import CreateTrade from './service/createTrade';
import CreateNorris from './service/createNorris';
//import SinglePost from './service/SingleDiscord';
import Admin from './admin/Admin'
import ForgotPassword from "./user/ForgotPassword";
import PrivateRoute from './auth/PrivateRoute';
import ResetPassword from "./user/ResetPassword";
import Weather from "./weather/Weather"
import Reddit from './reddit/Reddit';
import currency from './currencyConverter/currency';






class MainRouter extends React.Component {

	render() {
		return (
			<div>
				<Navigation />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<PrivateRoute exact path="/admin" component={Admin} />
					<Route exact path="/forgot-password" component={ForgotPassword} />
					<Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
					<PrivateRoute exact path="/discord/add" component={CreateDiscord} />
					<PrivateRoute exact path="/astronaut/add" component={CreateAstronaut} />
					<PrivateRoute exact path="/joke/add" component={CreateJoke} />
					<PrivateRoute exact path="/trade/add" component={CreateTrade} />
					<PrivateRoute exact path="/norris/add" component={CreateNorris} />
					{/*<PrivateRoute Route exact path="/post/:postId" component={SinglePost} />*/}
					<Route exact path="/users" component={Users} />
					<Route exact path="/signup" component={RegisterUser} />
					<Route exact path="/signin" component={LoginUser} />
					<PrivateRoute exact path="/user/edit/:userId" component={EditUser} />
					<PrivateRoute exact path="/weather" component={Weather} />
					<PrivateRoute exact path="/reddit" component={Reddit} />
					<PrivateRoute exact path="/user/:userId" component={UserProfile} />
					<PrivateRoute exact path="/currency" component={currency} />


				</Switch>
			</div>
		)
	}


}

export default MainRouter;