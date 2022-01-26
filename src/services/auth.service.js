const API_URL = "http://localhost:8087/";

export async function login(login, password) {
    let response = await fetch(API_URL + "login", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
    });
    if (
        response.status < 200 ||
        (response.status >= 300 && response.status !== 401)
    ) {
        throw new Error(response.statusText);
    }
    if (response.status === 200) {
        let data = await response.json();
        const role = data.role;
        const token = data.token;
        const username = data.login;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        return Promise.resolve({ username: username, role: role });
    }
    if (response.status === 401) {
        let data = await response.json();
        return Promise.reject(data.errorMessage);
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("persist:certificatesMetadata");
};

export const checkAuth = (response) => {
    if (response.status === 401) {
        logout();
        return false;
    }
    return true;
};