import React, { Component } from "react";
import API from "../../api/api";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from "../../actions/types";

class Login extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            email: "",
            password: "",
            validated: false
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(event) {
        this.setState({ email: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { dispatch } = this.props;

        const form = event.currentTarget;
        if (form.checkValidity() !== false) {
            const data = {
                email: this.state.email,
                password: this.state.password
            };
            API.post("auth/login", data)
                .then(res => {
                    console.log(res);
                    const { data } = res;
                    const { token } = data.success;
                    const { user } = data;

                    /** store logged in user's info to local storage */
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            accessToken: token,
                            ...user
                        })
                    );

                    /** store logged in user's info to App State */
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: {
                            user: {
                                accessToken: token,
                                ...user
                            }
                        }
                    });
                })
                .then(() => this.props.history.push("/"));
        }

        if (this._isMounted) {
            this.setState({ validated: true });
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { isLoggedIn, message } = this.props;

        if (isLoggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <h1>Login Form</h1>
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleSubmit}
                >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            onChange={this.handleEmail}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={this.handlePassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember Me" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);
