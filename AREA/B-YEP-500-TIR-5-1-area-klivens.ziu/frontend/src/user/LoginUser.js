import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import { isAuthenticated } from "../auth/index.js";
import { Link, Redirect } from "react-router-dom";
import SocialLogin from "./SocialLogin";

class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  /**
   * Authenticate method: if the token exists save it to the localStorage.
   * if User role is "subscriber" redirect to homepage
   * if User role is "admin" redirect to admin page
   *
   * @param {string} tokenkey token that is saved in localStorage.
   */
  authenticate(tokenkey, next) {
    if (typeof window !== "undefined") {
      localStorage.setItem("tokenkey", JSON.stringify(tokenkey));
      {
        isAuthenticated() && isAuthenticated().user.role === "subscriber"
          ? this.props.history.push("/")
          : this.props.history.push("/admin");
      }
    }
  }

  /**
   * Login method: make a http request to the server.
   * take the response object from the server
   * if there is an error change the error state
   * if no error make the authentication and the right redirection after login
   */
  loginuser() {
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };

    fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        if (data.error) this.setState({ error: data.error });
        else this.authenticate(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="body">
        <div className="cont">
          <h2 className="mt-5 mb-5 text-center logo ">
            <FontAwesomeIcon icon={faUser} /> Sign-in
          </h2>
          <hr />
          <SocialLogin />
          <hr />
          <div
            className="alert alert-danger"
            style={{ display: this.state.error ? "" : "none" }}
          >
            {this.state.error}
          </div>

          <div className="form-group">
            <label className="text-light frenci4">Email: </label>
            <input
              type="text"
              onChange={(event) => this.handleChange(event)}
              value={this.state.email}
              className="form-control bg-light"
              name="email"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-light frenci4">Password: </label>
            <input
              type="password"
              onChange={(event) => this.handleChange(event)}
              value={this.state.password}
              className="form-control bg-light"
              name="password"
              required
            />
          </div>

          <button
            className="btn btn-raised btn-primary"
            onClick={() => this.loginuser()}
          >
            Submit
          </button>
          <p>
            <Link to="/forgot-password" className="text-danger">
              {" "}
            Forgot Password
          </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default LoginUser;
