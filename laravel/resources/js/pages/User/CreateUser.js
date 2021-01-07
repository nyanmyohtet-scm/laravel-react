import React, { Component, Fragment } from "react";
import API from "../../api/api";
import authHeader from "../../services/auth-header.service";
import UserCreateForm from "../../components/UserCreateForm";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            selectedFile: null,
            imagePreviewUrl: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
    }

    handleSubmit(values) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("c_password", values.cPassword);
        formData.append("type", values.type);
        formData.append("phone", values.phone);
        formData.append("birth_date", values.dateOfBirth);
        formData.append("address", values.address);
        formData.append("image", this.state.selectedFile);

        API.post("users", formData, {
            headers: {
                ...authHeader(),
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                this.props.history.push("/user");
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    this.setState({
                        errors: error.response.data.errors
                    });
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    }

    handleProfile(event) {
        this.setState(
            {
                selectedFile: event.target.files[0]
            },
            () => console.log(this.state.selectedFile)
        );
    }

    render() {
        return (
            <div className="form-container">
                <h2>Create User</h2>
                <UserCreateForm
                    handleSubmit={this.handleSubmit}
                    handleProfile={this.handleProfile}
                />
            </div>
        );
    }
}
