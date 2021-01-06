import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import User from "../pages/User/User";
import Profile from "../pages/User/Profile";
import CreateUser from "../pages/User/CreateUser";
import EditUser from "../pages/User/Edit";
import Post from "../pages/Post/Post";

const AppRouter = () => (
    <Router>
        <Switch>
            <PublicRoute path="/" component={HomePage} exact />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/post" component={Post} />
            {/* TODO: setup admin routes */}
            <PrivateRoute path="/user/create" component={CreateUser} />
            <PrivateRoute path="/user/edit/:id" component={EditUser} />
            <PrivateRoute path="/user/:id" component={Profile} />
            <PrivateRoute path="/user" component={User} />
        </Switch>
    </Router>
);

export default AppRouter;
