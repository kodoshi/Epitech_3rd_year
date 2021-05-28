import React from "react";
import { isAuthenticated } from "../auth/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { readuserdata } from "./apiUsers.js";
import profileimg from "../images/icon.jpg";
import DeleteUser from "./DeleteUser";
//import { listbyuser } from "../post/apiPost";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  /**
   * We take the postId from the props params
   * We take the Tokenkey from the authenticated user
   * we set those parameter to the readuserdata method that we extracted from apiUsers
   * Handle the response object from readuserdata method
   * if error make a redirection to the signin page -> it means you are not logged in
   * if no error set State with data and display user information in the right form
   */
  componentDidMount() {
    const userId = this.props.match.params.userId;
    const tokenkey = isAuthenticated().token;
    readuserdata(userId, tokenkey).then((data) => {
      if (data.error) {
        this.props.history.push("signin");
        console.log("here 1")
      } else {
        this.setState({ user: data });
      }
    });
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    const tokenkey = isAuthenticated().token;
    readuserdata(userId, tokenkey).then((data) => {
      if (data.error) {
        this.props.history.push("signin");
        //console.log(data.error) //fails here
      } else this.setState({ user: data });
    });
  }

  render() {
    const photoUrl = this.state.user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${this.state.user._id
      }?${new Date().getTime()}`
      : profileimg;

    return (
      <div className="welcome">
        <div className="container">
          <h2 className="control-group cont2 text-center  font1">
            <FontAwesomeIcon icon={faUser} /> User Profile:
          </h2>
          <div className="cont2 text-center">
            <div className="col md-12 font">
              <hr />
              <img
                className="mb-4"
                src={photoUrl}
                alt={this.state.name}
                style={{ width: "20%" }}
                onError={(index) => (index.target.src = `${profileimg}`)}
              />
              <p>
                <b>
                  <u> Username:</u>
                </b>{" "}
                {this.state.user.name}{" "}
              </p>
              <p>
                <b>
                  <u> Email:</u>
                </b>{" "}
                {this.state.user.email}{" "}
              </p>
              <p>
                <b>
                  <u> About me:</u>
                </b>{" "}
                {this.state.user.about}{" "}
              </p>
              <hr />
              <p className="text-success">
                {" "}
                <i>{`Account created at:  ${new Date(
                  this.state.user.created_at
                ).toDateString()}`}</i>
              </p>
              <hr />
            </div>

            {/* if the user is logged in and the authenticated user id matches with the user Id in the state display the information below*/}
            {isAuthenticated().user &&
              isAuthenticated().user.role !== "admin" &&
              isAuthenticated().user._id === this.state.user._id ? (
              <React.Fragment>
                <div className="row">
                  <div className="col md-12 ">
                    <hr />
                    <p className=" font text-warning">
                      {" "}
                      <i>{`Account updated at: ${new Date(
                        this.state.user.updated_at
                      ).toDateString()}`}</i>
                    </p>
                    <hr />
                  </div>
                </div>

                <div className="d-inline-block">
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/${this.state.user._id}`}
                  >
                    Edit Profile
                  </Link>
                </div>
                <div className="d-inline-block">
                  <DeleteUser userId={this.state.user._id} />
                </div>
                <hr />
              </React.Fragment>
            ) : (
              <p className=" font text-warning">
                {" "}
                <i>{``}</i>
              </p>
            )}

            {/* if the user is not logged in display FollowUnfollowUser Component with the following and onButtonClick props*/}

            <div>
              {/* if the user is logged in and has the admin role display there 2 Buttons*/}
              {isAuthenticated().user &&
                isAuthenticated().user.role === "admin" && (
                  <div class="card mt-5">
                    <div className="card-body ">
                      <h5 className="card-title text-dark"> Admin </h5>
                      <p className="mb-2 text-danger">
                        {" "}
                        Edit/Delete as an Admin{" "}
                      </p>
                      <Link
                        className="btn btn-raised btn-success mr-5"
                        to={`/user/edit/${this.state.user._id}`}
                      >
                        Edit Profile
                      </Link>
                      <DeleteUser userId={this.state.user._id} />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
