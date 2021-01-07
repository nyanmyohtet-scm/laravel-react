import React, { Component, Fragment } from "react";
import API from "../../api/api";
import authHeader from "../../services/auth-header.service";
import UserCreateForm from "../../components/UserCreateForm";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            validated: false,
            errors: {},
            name: "user03",
            email: "user03@example.com",
            password: "user03",
            cPassword: "user03",
            type: 2,
            phone: "959700808022",
            dateOfBirth: "2021-01-06",
            address: "Yangon",
            selectedFile: null,
            imagePreviewUrl: null
        };

        this.handleAllInputs = this.handleAllInputs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
    }

    handleAllInputs(e) {
        let { name, value } = e.target;
        if (name === "type") {
            value = parseInt(value);
        }

        if (name === "phone") {
            const phoneNoPattern = /^\d{12}$/;
            if (value.match(phoneNoPattern)) {
                console.warn("valid phone no");
            } else {
                console.warn("invalid phone no format");
            }
        }
        console.log(name, " : ", value);
        this.setState({ [name]: value });
    }

    handleSubmit(values) {
        console.log("create user form submit...");

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

    handleReset(e) {
        e.preventDefault();
        this.setState({
            name: "",
            email: "",
            password: "",
            cPassword: "",
            type: "",
            phone: "",
            dateOfBirth: "",
            address: ""
        });
    }

    // handleProfile(event) {
    //     event.preventDefault();
    //     console.log(event);
    //     console.log(event.target.files);
    //     this.setState(
    //         {
    //             selectedFile: event.target.files[0]
    //         },
    //         () => console.log(this.state.selectedFile)
    //     );

    //     let reader = new FileReader();
    //     reader.onloadend = () => {
    //         this.setState(
    //             {
    //                 imagePreviewUrl: reader.result
    //             },
    //             console.log(this.state.imagePreviewUrl)
    //         );
    //     };
    //     reader.readAsDataURL(event.target.files[0]);
    // }

    handleProfile(event) {
        console.log(event);

        // const files = Array.from(event.target.files);
        // // this.setState({ uploading: true });

        // const formData = new FormData();
        // debugger;

        // files.forEach((file, i) => {
        //     formData.append(i, file);
        // });
        this.setState(
            {
                selectedFile: event.target.files[0]
            },
            () => console.log(this.state.selectedFile)
        );
    }

    render() {
        const {
            name,
            email,
            password,
            cPassword,
            type,
            phone,
            dateOfBirth,
            address
        } = this.state;
        return (
            <Fragment>
                <h2>Create User</h2>
                <UserCreateForm
                    handleSubmit={this.handleSubmit}
                    handleProfile={this.handleProfile}
                />
            </Fragment>
        );
    }
}
