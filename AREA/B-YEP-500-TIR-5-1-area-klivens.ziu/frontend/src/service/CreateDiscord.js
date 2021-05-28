import React from "react";
import { isAuthenticated } from "../auth/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/fontawesome-free-solid";
import defaultpost from "../images/discord_default.jpg";
import { withRouter } from "react-router";
import { creatediscord } from "./apiService.js";
import Select from 'react-select';
import { deleteAllDiscords } from './apiService'

const actionlist = [
  { label: 'Receive new message', value: 1 },
  { label: 'Receive new user info', value: 2 },
  { label: 'Receive new channel info', value: 3 },
  { label: 'Receive banned user info', value: 8 },
  { label: 'Receive kicked user info', value: 9 },
];
const reactionlist = [
  { label: 'Create new text channel', value: 5 },
  { label: 'Send an email', value: 6 },
  { label: 'Create new voice channel', value: 7 },
];


const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
    backgroundColor: 'rgba(100, 100, 100, 0.6)',

  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
    color: 'white'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

class CreateDiscord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      action_new_message: false,
      action_user_joins: false,
      action_new_channel: false,
      action_user_banned: false,
      action_user_kicked: false,

      reaction_create_channel: false,
      reaction_create_voice_channel: false,
      reaction_send_email: false,

      name_of_channel: "",
      email_content_to_send: "",
      email_address_to_send: "",

      photo: "",
      user: {},
      error: "",
      fileSize: 0,
    };
  }

  /**
   * On the Component Mount we will save FormData on the discordData variable
   * and set authenticated user to the state
   */
  componentDidMount() {
    //post Form Data Browser API
    this.discordData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }
  deleteDiscordsOnClick() {
    const userId = isAuthenticated().user._id;
    const tokenkey = isAuthenticated().token;
    deleteAllDiscords(userId, tokenkey).then((data) => {
      if (data.error) this.setState({ error: data.error });
      //console.log("New Post:", data)
      else this.props.history.push(`/`);
    });;
  }
  /**
   * Validation of the create post page
   * validate photo, title, content(body)
   */
  validate() {
    const { fileSize, name_of_channel,
      reaction_create_channel, email_address_to_send, email_content_to_send,
      action_new_channel, action_new_message, action_user_joins, reaction_send_email,
      action_user_kicked, action_user_banned, reaction_create_voice_channel } = this.state;

    if (fileSize > 200000) {
      this.setState({ error: "Filesize should be less than 2000kb" });
      return false;
    }

    if (reaction_create_channel && name_of_channel.length === 0) {
      this.setState({ error: "Channel name field cannot be empty" });
      return false;
    }
    //if (reaction_send_email && (email_address_to_send.length === 0 || email_content_to_send === 0)) {
    // this.setState({ error: "Email address or email content field cannot be empty" });
    // return false;
    //}
    if (reaction_create_voice_channel && name_of_channel.length === 0) {
      this.setState({ error: "Channel name field cannot be empty" });
      return false;
    }
    if (!(action_new_channel || action_new_message || action_user_joins || action_user_kicked || action_user_banned)) {
      this.setState({ error: "Action list cannot be empty" });
      return false;
    }
    return true;
  }

  unhideBoxes(n) {
    if (n === 2 && this.state.reaction_create_channel) {
      return true;
    }
    else if (n === 3 && this.state.reaction_send_email) {
      return true;
    }
    else if (n === 4 && this.state.reaction_create_voice_channel) {
      return true;
    }
    return false;
  }


  set_list(array) {
    [array].map(obj => {
      if (obj.value === 1) {
        this.setState({ action_new_message: true });
        this.setState({ action_user_joins: false });
        this.setState({ action_new_channel: false });
        this.setState({ action_user_banned: false });
        this.setState({ action_user_kicked: false });

        this.discordData.set("action_new_message", true);
        this.discordData.set("action_user_joins", false);
        this.discordData.set("action_new_channel", false);
        this.discordData.set("action_user_banned", false);
        this.discordData.set("action_user_kicked", false);
      }
      else if (obj.value === 2) {
        this.setState({ action_user_joins: true });
        this.setState({ action_new_channel: false });
        this.setState({ action_new_message: false });
        this.setState({ action_user_banned: false });
        this.setState({ action_user_kicked: false });

        this.discordData.set("action_new_message", false);
        this.discordData.set("action_user_joins", true);
        this.discordData.set("action_new_channel", false);
        this.discordData.set("action_user_banned", false);
        this.discordData.set("action_user_kicked", false);
      }
      else if (obj.value === 3) {
        this.setState({ action_new_channel: true });
        this.setState({ action_new_message: false });
        this.setState({ action_user_joins: false });
        this.setState({ action_user_banned: false });
        this.setState({ action_user_kicked: false });

        this.discordData.set("action_new_message", false);
        this.discordData.set("action_user_joins", false);
        this.discordData.set("action_new_channel", true);
        this.discordData.set("action_user_banned", false);
        this.discordData.set("action_user_kicked", false);
      }
      else if (obj.value === 8) {
        this.setState({ action_new_channel: false });
        this.setState({ action_new_message: false });
        this.setState({ action_user_joins: false });
        this.setState({ action_user_banned: true });
        this.setState({ action_user_kicked: false });

        this.discordData.set("action_new_message", false);
        this.discordData.set("action_user_joins", false);
        this.discordData.set("action_new_channel", false);
        this.discordData.set("action_user_banned", true);
        this.discordData.set("action_user_kicked", false);
      }

      else if (obj.value === 9) {
        this.setState({ action_new_channel: false });
        this.setState({ action_new_message: false });
        this.setState({ action_user_joins: false });
        this.setState({ action_user_banned: false });
        this.setState({ action_user_kicked: true });

        this.discordData.set("action_new_message", false);
        this.discordData.set("action_user_joins", false);
        this.discordData.set("action_new_channel", false);
        this.discordData.set("action_user_banned", false);
        this.discordData.set("action_user_kicked", true);
      }

      else if (obj.value === 5) {
        this.setState({ reaction_create_channel: true });
        this.setState({ reaction_send_email: false });
        this.setState({ reaction_create_voice_channel: false });

        this.discordData.set("reaction_create_channel", true);
        this.discordData.set("reaction_send_email", false);
        this.discordData.set("reaction_create_voice_channel", false);
      }
      else if (obj.value === 6) {
        this.setState({ reaction_create_channel: false });
        this.setState({ reaction_send_email: true });
        this.setState({ reaction_create_voice_channel: false });

        this.discordData.set("reaction_create_channel", false);
        this.discordData.set("reaction_send_email", true);
        this.discordData.set("reaction_create_voice_channel", false);
      }
      else if (obj.value === 7) {
        this.setState({ reaction_create_channel: false });
        this.setState({ reaction_send_email: false });
        this.setState({ reaction_create_voice_channel: true });

        this.discordData.set("reaction_create_channel", false);
        this.discordData.set("reaction_send_email", false);
        this.discordData.set("reaction_create_voice_channel", true);
      }
    })
  }



  handleChange = (name) => (event) => {
    this.setState({ error: "" });

    //if the name is 'photo' take event.target.files the first []
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    //get the fileSize and save it to the state if the size is not defined get the default value of fileSize
    const fileSize = name === "photo" ? event.target.files[0].size : 0;

    //save the values on the discordData
    this.discordData.set(name, value);

    this.setState({ [name]: value, fileSize });
  };

  /**
   * validate title, body and photo if they are correct go ti next step
   * handle server response from create method and if there is an error set it to the state
   * if there is no error do the update and redirect to user profile page
   */
  createservice() {
    if (this.validate()) {
      //take the user id and token from the local storage
      const userId = isAuthenticated().user._id;
      const tokenkey = isAuthenticated().token;
      //this.discordData --> send the discordData to the backend
      //this.discordData will return a json response
      creatediscord(userId, tokenkey, this.discordData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        //console.log("New Post:", data)
        else this.props.history.push(`/`);
      });
    }
  }

  render() {
    const photoUrl = this.state.id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${this.state.id
      }?${new Date().getTime()}`
      : defaultpost;
    return (
      <div className="edit">
        <div className="container cont">
          <h2 className="mt-5 mb-5 text-center font1">
            <FontAwesomeIcon icon={faPlusCircle} /> Add a new Discord Service
          </h2>
          <h5 className="mt-5 mb-5 text-center font1"> <a className="frenci3" href="https://discordapp.com/api/oauth2/authorize?client_id=XXXXXXXXXXX&amp;permissions=XXXXXXXXXX&amp;scope=bot" target="_blank" rel="noopener noreferrer">First time Authorization</a></h5>
          <img
            src={photoUrl}
            alt={this.state.name}
            className="card-img-top mb-4"
            style={{ width: "20%" }}
            onError={(index) => (index.target.src = `${defaultpost}`)}
          />
          <div
            className="alert alert-danger"
            style={{ display: this.state.error ? "" : "none" }}
          >
            {this.state.error}
          </div>
          <div className="form-group">
            <label className="text-light font frenci2">Customise Service Picture: </label>
            <input
              type="file"
              onChange={this.handleChange("photo")}
              accept="image/*"
              className="form-control bg-light"
            />
          </div>

          <div className="form-group">

            <label className="text-light font frenci2">Pick from Actions: </label>
            <Select
              styles={customStyles}
              options={actionlist}

              onChange={opt => this.set_list(opt)}
            />
          </div>

          <div className="form-group">
            <label className="text-light font frenci2">Pick from Reactions: </label>
            <Select
              styles={customStyles}
              options={reactionlist}

              onChange={opti => this.set_list(opti)}
            />
          </div>

          {this.unhideBoxes(2) ? (
            <div className="form-group">
              <label className="text-light font frenci2">Channel Name: </label>
              <textarea
                type="text"
                onChange={this.handleChange("name_of_channel")}
                value={this.state.name_of_channel}
                className="form-control bg-light"
                name="channel name"
                maxLength="20"
              />
            </div>
          ) : (
            <div>
            </div>
          )}
          {this.unhideBoxes(3) ? (
            <div className="form-group">
              <label className="text-light font frenci2">Email Address: </label>
              <textarea
                type="text"
                onChange={this.handleChange("receiving_email_address")}
                className="form-control bg-light"
                name="email address"
                maxLength="100"
              />
              <label className="text-light font frenci2">Email content: </label>
              <textarea
                type="text"
                onChange={this.handleChange("email_to_send")}
                className="form-control bg-light"
                name="email content"
                maxLength="400"
              />
            </div>
          ) : (
            <div>
            </div>
          )}
          {this.unhideBoxes(4) ? (
            <div className="form-group">
              <label className="text-light font frenci2">Channel Name: </label>
              <textarea
                type="text"
                onChange={this.handleChange("name_of_channel")}
                value={this.state.name_of_channel}
                className="form-control bg-light"
                name="channel name"
                maxLength="20"
              />
            </div>
          ) : (
            <div>
            </div>
          )}
          <button
            className="btn btn-raised btn-primary"
            onClick={() => this.createservice()}
          >
            Add new Service
          </button>
          <button
            className="btn btn-raised btn-danger mr-5"
            onClick={() => this.deleteDiscordsOnClick()}
          >
            {" "}
            Delete All Related Services{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateDiscord);