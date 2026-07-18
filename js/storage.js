const USER_KEY = "user";

function saveUser(user) {
    localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    );
}

function getUser() {
    const savedUser =
        localStorage.getItem(USER_KEY);

    if (!savedUser) {
        return null;
    }

    return JSON.parse(savedUser);
}

function clearUser() {
    localStorage.removeItem(USER_KEY);
}

function isLoggedIn() {
    const user = getUser();

    return Boolean(user?.accessToken);
}