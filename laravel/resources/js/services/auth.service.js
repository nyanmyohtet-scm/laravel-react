import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "login", { email, password })
            .then(response => {
                if (response.data.success.token) {
                    const accessToken = response.data.success.token;
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            accessToken
                        })
                    );
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }
}

export default new AuthService();
