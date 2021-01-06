import React from "react";
import { Link } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";

const NavBar = ({ isLoggedIn, user, handleLogout, history }) => {
    let isAdmin = false;

    if (isLoggedIn) {
        isAdmin = user.type == 0;
    }

    const handleBrand = () => history.push("/");

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand onClick={handleBrand}>
                SCM Bulletin Board
            </Navbar.Brand>
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    {isAdmin && (
                        <Nav.Item>
                            <Link to="/user" className="nav-link">
                                Users
                            </Link>
                        </Nav.Item>
                    )}
                    <Nav.Item>
                        <Link to="/post" className="nav-link">
                            Posts
                        </Link>
                    </Nav.Item>
                </Nav>
                {isLoggedIn && <div className="mr-3">{user.name}</div>}
                {isLoggedIn ? (
                    <Button onClick={e => handleLogout(e)}>Logout</Button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
