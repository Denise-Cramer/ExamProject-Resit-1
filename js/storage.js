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

    try {
        return JSON.parse(savedUser);
    } catch (error) {
        console.error("Could not find saved user:", error);
        localStorage.removeItem(USER_KEY);
        return null;
    }
}

function clearUser() {
    localStorage.removeItem(USER_KEY);
}

function isLoggedIn() {
    const user = getUser();

    return Boolean(user?.accessToken);
}

function getAccessToken() {
    const user = getUser();
    return user?.accessToken || null;
}