import React from "react";
import { isAuthenticated } from "../auth/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/fontawesome-free-solid";
import defaultpost from "../images/joke_default.png";
import { withRouter } from "react-router";
import { deleteAllJokes, createjoke } from "./apiService.js";
import Select from 'react-select';

const actionlist = [
    { label: 'Receive a french joke', value: 1 },
    { label: 'Receive an english joke', value: 2 },
    { label: 'Receive a programming joke', value: 3 },
    { label: 'Receive a christmas joke', value: 4 },
];
const reactionlist = [
    { label: 'Send action info to an email', value: 5 },
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

class CreateJoke extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            action_french_joke: false,
            action_english_joke: false,
            action_programming_joke: false,
            action_christmas_joke: false,

            reaction_send_email: false,

            email_address_to_send: "",

            photo: "",
            user: {},
            error: "",
            fileSize: 0,
        };
    }

    /**
     * On the Component Mount we will save FormData on the jokeData variable
     * and set authenticated user to the state
     */
    componentDidMount() {
        //post Form Data Browser API
        this.jokeData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }
    deleteJokesOnClick() {
        const userId = isAuthenticated().user._id;
        const tokenkey = isAuthenticated().token;
        deleteAllJokes(userId, tokenkey).then((data) => {
            if (data.error) this.setState({ error: data.error });
            //console.log("New Post:", data)
            else this.props.history.push(`/`);
        });
    }
    /**
     * Validation of the create post page
     * validate photo, title, content(body)
     */
    validate() {
        const { fileSize, action_french_joke, action_christmas_joke,
            action_english_joke, action_programming_joke } = this.state;

        if (fileSize > 200000) {
            this.setState({ error: "Filesize should be less than 2000kb" });
            return false;
        }

        if (!(action_french_joke || action_christmas_joke || action_programming_joke || action_english_joke)) {
            this.setState({ error: "Action list cannot be empty" });
            return false;
        }
        return true;
    }

    unhideBoxes() {
        if (this.state.reaction_send_email) {
            return true;
        }
        return false;
    }


    set_list(array) {
        [array].map(obj => {
            if (obj.value === 1) {
                this.setState({ action_french_joke: true });
                this.setState({ action_english_joke: false });
                this.setState({ action_programming_joke: false });
                this.setState({ action_christmas_joke: false });

                this.jokeData.set("action_french_joke", true);
                this.jokeData.set("action_english_joke", false);
                this.jokeData.set("action_programming_joke", false);
                this.jokeData.set("action_christmas_joke", false);
            }
            else if (obj.value === 2) {
                this.setState({ action_french_joke: false });
                this.setState({ action_english_joke: true });
                this.setState({ action_programming_joke: false });
                this.setState({ action_christmas_joke: false });

                this.jokeData.set("action_french_joke", false);
                this.jokeData.set("action_english_joke", true);
                this.jokeData.set("action_programming_joke", false);
                this.jokeData.set("action_christmas_joke", false);
            }
            else if (obj.value === 3) {
                this.setState({ action_french_joke: false });
                this.setState({ action_english_joke: false });
                this.setState({ action_programming_joke: true });
                this.setState({ action_christmas_joke: false });

                this.jokeData.set("action_french_joke", false);
                this.jokeData.set("action_english_joke", false);
                this.jokeData.set("action_programming_joke", true);
                this.jokeData.set("action_christmas_joke", false);
            }
            else if (obj.value === 4) {
                this.setState({ action_french_joke: false });
                this.setState({ action_english_joke: false });
                this.setState({ action_programming_joke: false });
                this.setState({ action_christmas_joke: true });

                this.jokeData.set("action_french_joke", false);
                this.jokeData.set("action_english_joke", false);
                this.jokeData.set("action_programming_joke", false);
                this.jokeData.set("action_christmas_joke", true);
            }

            else if (obj.value === 5) {
                this.setState({ reaction_send_email: true });

                this.jokeData.set("reaction_send_email", true);
            }
        })
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" });

        //if the name is 'photo' take event.target.files the first []
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        //get the fileSize and save it to the state if the size is not defined get the default value of fileSize
        const fileSize = name === "photo" ? event.target.files[0].size : 0;

        //save the values on the jokeData
        this.jokeData.set(name, value);

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
            //this.jokeData --> send the jokeData to the backend
            //this.jokeData will return a json response
            createjoke(userId, tokenkey, this.jokeData).then((data) => {
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
                        <FontAwesomeIcon icon={faPlusCircle} /> Joke Dispensary
          </h2>
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
                    {this.unhideBoxes() ? (
                        <div className="form-group">
                            <label className="text-light font frenci2">Email Address: </label>
                            <textarea
                                type="text"
                                onChange={this.handleChange("receiving_email_address")}
                                className="form-control bg-light"
                                name="email address"
                                maxLength="100"
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
                        onClick={() => this.deleteJokesOnClick()}
                    >
                        {" "}
                        Delete All Related Services{" "}
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateJoke);