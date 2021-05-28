import React, { Component } from 'react';
import { withRouter } from "react-router";
import { listlogs } from "./apiUsers.js";
import { isAuthenticated } from "../auth/index";

class Logs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logs: [],
        };
    }

    /**
     * Handle the response object from listlogs method
     * if no error set State with data and display post information in the right form
     * if error console log the err.
     */
    componentDidMount() {
        const userId = isAuthenticated().user._id;

        listlogs(userId).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else this.setState({ logs: data });
        });
        this._interval = setInterval(() => {
            listlogs(userId).then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else this.setState({ logs: data });
            });
        }, 10000);
    }
    componentWillUnmount() {
        clearInterval(this._interval);
    }
    render() {
        return (
            <div className="">
                <div className="container">

                    <div className="frenci">
                        <div className="card-body">
                            <div>
                                <h3 className="pb-20"> Notification Logs:</h3>
                                {this.state.logs.map(txt => <p>{txt}</p>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Logs);