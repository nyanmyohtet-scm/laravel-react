import React, { Component, Fragment } from "react";
import { Button, Col, Form, Modal, Pagination, Table } from "react-bootstrap";
import PaginationBar from "./PaginationBar";
import API from "../api/api";
import authHeader from "../services/auth-header.service";

class PostList extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            loading: false,
            showModal: false,
            postList: [],
            postDetailModal: {
                title: "",
                description: ""
            },
            pagination: {
                current_page: 1,
                first_page_url: "",
                last_page: 0,
                last_page_url: "",
                prev_page_url: "",
                next_page_url: ""
            }
        };
        this.handlePostTitle = this.handlePostTitle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fetchPostList = this.fetchPostList.bind(this);
        this.handleDownloadCSV = this.handleDownloadCSV.bind(this);
    }

    handlePostTitle(title, description, event) {
        event.preventDefault();
        const postDetailModal = { title, description };
        this.setState({ showModal: true, postDetailModal });
    }

    handleClose(event) {
        const postDetailModal = { title: "", description: "" };
        this.setState({ showModal: false, postDetailModal });
    }

    fetchPostList(url = "posts") {
        this.setState({ loading: true });
        API.get(url, { headers: authHeader() }).then(res => {
            console.log(res);
            if (this._isMounted) {
                this.setState(
                    {
                        postList: res.data.data,
                        pagination: {
                            current_page: res.data.current_page,
                            first_page_url: res.data.first_page_url,
                            last_page: res.data.last_page,
                            last_page_url: res.data.last_page_url,
                            prev_page_url: res.data.prev_page_url,
                            next_page_url: res.data.next_page_url
                        }
                    },
                    () => {
                        this.setState({ loading: false });
                        console.log(this.state.postList);
                    }
                );
            }
        });
    }

    handleDownloadCSV(event) {
        event.preventDefault();
        window.location.href = "http://localhost:8000/api/posts/export-csv";
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchPostList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const TABLE_HEADER_LIST = [
            "Title",
            "Post Description",
            "Posted User",
            "Posted Date",
            "Action",
            "Action"
        ];

        const { loading, pagination } = this.state;

        return (
            <Fragment>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <Form>
                            <Form.Row>
                                <Col md="8">
                                    <Form.Control placeholder="Search Post" />
                                </Col>
                                <Button type="submit" className="col-md-4">
                                    Search
                                </Button>
                            </Form.Row>
                        </Form>
                    </div>
                    <Button className="col-md-2">Add</Button>
                    <Button className="col-md-2">Upload</Button>
                    <Button
                        className="col-md-2"
                        onClick={this.handleDownloadCSV}
                    >
                        Download
                    </Button>
                </div>
                <div>
                    <Modal
                        show={this.state.showModal}
                        onHide={this.handleClose}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {this.state.postDetailModal.title}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.postDetailModal.description}
                        </Modal.Body>
                    </Modal>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {TABLE_HEADER_LIST.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : this.state.postList.length == 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    Empty
                                </td>
                            </tr>
                        ) : (
                            this.state.postList.map(
                                (
                                    {
                                        title,
                                        description,
                                        created_user_id,
                                        created_at
                                    },
                                    index
                                ) => (
                                    <tr key={index}>
                                        <td>
                                            <a
                                                href="#"
                                                onClick={event =>
                                                    this.handlePostTitle(
                                                        title,
                                                        description,
                                                        event
                                                    )
                                                }
                                            >
                                                {title}
                                            </a>
                                        </td>
                                        <td>{description}</td>
                                        <td>{created_user_id}</td>
                                        <td>{created_at}</td>
                                        <td>Edit</td>
                                        <td>Delete</td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                    <PaginationBar
                        BASE_API_ROUTE={"posts"}
                        pagination={pagination}
                        fetchUserList={this.fetchPostList}
                    />
                </div>
            </Fragment>
        );
    }
}

export default PostList;
