import React from "react";
import { isAuthenticated } from "../auth/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/fontawesome-free-solid";
import defaultpost from "../images/iss.jpg";
import { withRouter } from "react-router";
import { createastronaut } from "./apiService.js";
import Select from 'react-select';
import { deleteAllAstronauts } from './apiService'

const actionlist = [
    { label: 'Receive ISS coords', value: 1 },
    { label: 'Receive ISS solar coords', value: 2 },
    { label: 'Receive ISS altitude + velocity stats', value: 3 },
];
const reactionlist = [
    { label: 'Send action info to an email', value: 4 },
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

class CreateAstronaut extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            action_location: false,
            action_solar_location: false,
            action_other_stats: false,

            reaction_send_email: false,

            email_address_to_send: "",

            photo: "",
            user: {},
            error: "",
            fileSize: 0,
        };
    }

    /**
     * On the Component Mount we will save FormData on the astronautData variable
     * and set authenticated user to the state
     */
    componentDidMount() {
        //post Form Data Browser API
        this.astronautData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }
    deleteAstronautsOnClick() {
        const userId = isAuthenticated().user._id;
        const tokenkey = isAuthenticated().token;
        deleteAllAstronauts(userId, tokenkey).then((data) => {
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
        const { fileSize, action_location, action_solar_location, action_other_stats } = this.state;

        if (fileSize > 200000) {
            this.setState({ error: "Filesize should be less than 2000kb" });
            return false;
        }

        if (!(action_location || action_solar_location || action_other_stats)) {
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
                this.setState({ action_location: true });
                this.setState({ action_solar_location: false });
                this.setState({ action_other_stats: false });

                this.astronautData.set("action_location", true);
                this.astronautData.set("action_solar_location", false);
                this.astronautData.set("action_other_stats", false);
            }
            else if (obj.value === 2) {
                this.setState({ action_location: false });
                this.setState({ action_solar_location: true });
                this.setState({ action_other_stats: false });

                this.astronautData.set("action_location", false);
                this.astronautData.set("action_solar_location", true);
                this.astronautData.set("action_other_stats", false);
            }
            else if (obj.value === 3) {
                this.setState({ action_location: false });
                this.setState({ action_solar_location: false });
                this.setState({ action_other_stats: true });

                this.astronautData.set("action_location", false);
                this.astronautData.set("action_solar_location", false);
                this.astronautData.set("action_other_stats", true);
            }
            else if (obj.value === 4) {
                this.setState({ reaction_send_email: true });

                this.astronautData.set("reaction_send_email", true);
            }
        })
    }



    handleChange = (name) => (event) => {
        this.setState({ error: "" });

        //if the name is 'photo' take event.target.files the first []
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        //get the fileSize and save it to the state if the size is not defined get the default value of fileSize
        const fileSize = name === "photo" ? event.target.files[0].size : 0;

        //save the values on the astronautData
        this.astronautData.set(name, value);

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
            //this.astronautData --> send the astronautData to the backend
            //this.astronautData will return a json response
            createastronaut(userId, tokenkey, this.astronautData).then((data) => {
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
                        <FontAwesomeIcon icon={faPlusCircle} /> International Space Station Observer
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
                        onClick={() => this.deleteAstronautsOnClick()}
                    >
                        {" "}
                        Delete All Related Services{" "}
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateAstronaut);