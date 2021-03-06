import React from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import { singlediscord, removediscord } from "./apiService.js";
import defaultpost from "../images/discord_default.jpg";
import { isAuthenticated } from "../auth/index.js";

class SingleDiscord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: "",
      like: false,
      likes: 0,
      comments: [],
    };
  }

  /**
   * Delete Post Method take care of the post deletion
   * We take the postId from the props params
   * We take the Tokenkey from the authenticated user
   * we set those parameter to the remove method that we extracted from apiPost
   * Handle the response object from remove method
   * if no error delete post and redirect to homepage
   * if error console log the err.
   */
  deletepost() {
    const postId = this.props.match.params.postId;
    const tokenkey = isAuthenticated().token;
    removediscord(postId, tokenkey).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else this.props.history.push("/");
    });
  }

  /**
   * DeleteConfirmation Method will display a confirmation Window on click of the delete button
   * when we click cancel the account will not be deleted
   * when we click Ok the account deleteaccount method will be executed
   */
  deleteConfirmation() {
    const answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) {
      this.deletepost();
    }
  }


  /**
   * We take the postId from the props params
   * we set postId parameter to the singlepost method that we extracted from apiPost
   * Handle the response object from singlepost method
   * if error console log the err.
   * if no error set State with post data
   * get likes number  and set it to likes State
   * check likes with the authenticated userId and set it to the like State
   * set the comments to the comments State
   */
  componentDidMount() {
    const postId = this.props.match.params.postId;
    singlediscord(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else
        this.setState({
          post: data,
        });
    });
  }

  render() {
    const postId = this.state.post.posted_by
      ? this.state.post.posted_by._id
      : "";
    const postName = this.state.post.posted_by
      ? this.state.post.posted_by.name
      : " Unknown";
    const { post } = this.state;
    return (
      <div className="welcome">
        <div className="container cont">
          <h2 className="cont2 text-center font1">
            <FontAwesomeIcon icon={faList} /> See Post{" "}
          </h2>
          <div className="cont4 text-dark col-md-12">
            <div className="card-body">
              <h4 className="card-title text-dark mb-4">
                <b>
                  <i>{this.state.post.title}</i>
                </b>{" "}
              </h4>
              <img
                src={`${process.env.REACT_APP_API_URL}/discord/photo/${this.props.match.params.postId
                  }?${new Date().getTime()}`}
                alt={post.title}
                className="img-thumbnail mb-3"
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                onError={(i) => (i.target.src = `${defaultpost}`)}
              />
              {/* if the like state is true it will be a request to post/like, and on click the clickLike method will be called, ThumbsUp*/}
              {/* else if the like state is false it will be a request to post/unlike, and on click the clickLike method will be called, ThumbsDown*/}

              <p className="card-text text-dark">
                <i>{post.body}</i>
              </p>
              <br />
              <p className="mark text-dark">
                {" "}
                Posted by <Link to={`/user/${postId}`}>
                  {" "}
                  {postName}{" "}
                </Link> on {new Date(post.created_at).toDateString()}
              </p>
              <div className="d-inline-block">
                <Link className="btn btn-raised btn-primary mr-5" to={`/`}>
                  Back to Home
                </Link>

                {/* if we have the authenticated user, and if authenticated userid matches with the posted_by._id */}
                {isAuthenticated().user &&
                  isAuthenticated().user._id === postId && (
                    <React.Fragment>
                      <button
                        onClick={() => this.deleteConfirmation()}
                        className="btn btn-raised btn-danger mr-5"
                      >
                        Delete Post
                      </button>
                    </React.Fragment>
                  )}

                {/* if the user is logged in and has the admin role display there 2 Buttons*/}
                <div>
                  {isAuthenticated().user &&
                    isAuthenticated().user.role === "admin" && (
                      <div className="card mt-5">
                        <div className="card-body">
                          <h5 className="card-title">Admin</h5>
                          <p className="mb-2 text-danger">
                            {" "}
                            Delete as an Admin{" "}
                          </p>
                          <button
                            onClick={() => this.deleteConfirmation()}
                            className="btn btn-raised btn-danger"
                          >
                            Delete Post
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SingleDiscord);
