import React, { Component } from "react";
import Users from "../user/Users";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class Admin extends Component {
    state = {
        redirectToHome: false
    };

    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <div className="jumbotron cont1">
                    <h1 classname="font">Admin Dashboard</h1>
                    <p className="lead frenci2">Welcome to React Frontend</p>
                </div>
                <div className="container-fluid extra4">
                    <div className="extra4">
                        <div className="col-md-6">
                            <h2>Users</h2>
                            <Users />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
