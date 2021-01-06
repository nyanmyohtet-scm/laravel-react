// FIXME: specific input validations
// TODO: add Profile File Upload
import React, { Component, Fragment } from "react";
import API from "../../api/api";
import authHeader from "../../services/auth-header.service";
import { Button, Form } from "react-bootstrap";

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

    handleSubmit(event) {
        event.preventDefault();
        console.log("create user form submit...");

        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("c_password", this.state.cPassword);
        formData.append("type", this.state.type);
        formData.append("phone", this.state.phone);
        formData.append("birth_date", this.state.dateOfBirth);
        formData.append("address", this.state.address);
        formData.append("image", this.state.selectedFile);

        const form = event.currentTarget;
        console.log("form.checkValidity() : ", form.checkValidity());
        if (form.checkValidity() !== false) {
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
                        this.setState({ errors: error.response.data.errors });
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

        this.setState({ validated: true });
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
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleSubmit}
                    onReset={this.handleReset}
                >
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleAllInputs}
                            required
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid user name.
                        </Form.Control.Feedback>
                        {this.state.errors.name && (
                            <div className="invalid-feedback">
                                {this.state.errors.name}
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleAllInputs}
                            required
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleAllInputs}
                            required
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="cPassword"
                            value={cPassword}
                            onChange={this.handleAllInputs}
                            required
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid confirm password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="userType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="type"
                            value={type}
                            onChange={this.handleAllInputs}
                        >
                            <option value="0">Admin</option>
                            <option value="1">User</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={this.handleAllInputs}
                            required
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid phone number.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="dateOfBirth">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={this.handleAllInputs}
                            required
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please enter select a valid date of birth.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="address"
                            value={address}
                            onChange={this.handleAllInputs}
                            required
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid address.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Profile</Form.Label>
                        <input
                            type="file"
                            name="profile"
                            onChange={this.handleProfile}
                        />
                    </Form.Group>
                    <Button className="mr-2" variant="primary" type="submit">
                        Create
                    </Button>
                    <Button variant="secondary" type="reset">
                        Clear
                    </Button>
                </Form>
            </Fragment>
        );
    }
}
