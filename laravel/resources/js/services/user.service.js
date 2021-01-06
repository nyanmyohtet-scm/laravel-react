import axios from "axios";
import authHeader from "./auth-header.service";

const API_URL = "http://localhost:8080/api/users/";

class UserService {
    getAllUser() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    createUser(data) {
        return axios.post(API_URL, { headers: authHeader(), ...data });
    }

    // getPublicContent() {
    //     return axios.get(API_URL + "all");
    // }

    // getUserBoard() {
    //     return axios.get(API_URL + "user", { headers: authHeader() });
    // }

    // getModeratorBoard() {
    //     return axios.get(API_URL + "mod", { headers: authHeader() });
    // }

    // getAdminBoard() {
    //     return axios.get(API_URL + "admin", { headers: authHeader() });
    // }
}

export default new UserService();
