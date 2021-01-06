// FIXME: redirect to user list
// FIXME: specific input validations
// TODO: add Profile File Upload
import React, { Component, Fragment } from "react";
import API from "../../api/api";
import authHeader from "../../services/auth-header.service";
import { Button, Form } from "react-bootstrap";

export default class Edit extends Component {
    constructor(props) {
        super(props);

        this.id = this.props.match.params.id;

        this.state = {
            loading: false,
            validated: false,
            name: "",
            email: "",
            type: 1,
            phone: "",
            dateOfBirth: "",
            address: ""
        };

        this.handleAllInputs = this.handleAllInputs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleReset = this.handleReset.bind(this);

        this.fetchUser = this.fetchUser.bind(this);

        this.fetchUser();
    }

    fetchUser() {
        API.get("users/" + this.id, {
            headers: authHeader()
        }).then(res => {
            console.log(res);
            const {
                name,
                email,
                type,
                phone,
                birth_date: dateOfBirth,
                address
            } = res.data.user;
            this.setState(
                {
                    name,
                    email,
                    type,
                    phone,
                    dateOfBirth,
                    address
                },
                () => console.log(this.state)
            );
        });
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
        const data = {
            id: this.id,
            name: this.state.name,
            email: this.state.email,
            type: this.state.type,
            phone: this.state.phone,
            birth_date: this.state.dateOfBirth,
            address: this.state.address
        };

        const form = event.currentTarget;
        console.log("form.checkValidity() : ", form.checkValidity());
        if (form.checkValidity() !== false) {
            API.put("users", data, { headers: authHeader() })
                .then(res => {
                    console.log(res);
                })
                .then(() => {
                    console.log("redired to user list");
                    this.props.history.push("/user");
                });
        }

        this.setState({ validated: true });
    }

    // handleReset(e) {
    //     e.preventDefault();
    //     this.setState({
    //         name: "",
    //         email: "",
    //         password: "",
    //         cPassword: "",
    //         type: "",
    //         phone: "",
    //         dateOfBirth: "",
    //         address: ""
    //     });
    // }

    render() {
        const { name, email, type, phone, dateOfBirth, address } = this.state;
        return (
            <Fragment>
                <h2>Edit User</h2>
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleSubmit}
                    // onReset={this.handleReset}
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
                    <Form.Group controlId="userType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="type"
                            value={type}
                            onChange={this.handleAllInputs}
                        >
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                            <option value="3">Visitor</option>
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
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                    {/* <Button variant="secondary" type="reset">
                        Clear
                    </Button> */}
                </Form>
            </Fragment>
        );
    }
}
