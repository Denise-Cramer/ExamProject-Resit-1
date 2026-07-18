const loginForm = document.querySelector("#login-form");

if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
}

async function handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value;
    const statusMessage = document.querySelector("#login-status");

    statusMessage.textContent = "Logging in"

    try {
        const user = await loginUser(email,password);

        saveUser(user);

        statusMessage.textContent = "Login successful. Redirecting..";

        setTimeout (() => {
            window.location.href = "../index.html";
        }, 1000);
        
    } catch (error) {
        console.error("Login failed", error);

        statusMessage.textContent = error.message;
    }
    
}

const registerForm = document.querySelector("#register-form");

if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
}

async function handleRegister(event) {
    event.preventDefault();

    const name = document
        .querySelector("#register-name")
        .value
        .trim();

    const email = document
        .querySelector("#register-email")
        .value
        .trim();

    const password = document
        .querySelector("#register-password")
        .value;

    const avatarUrl = document
        .querySelector("#register-avatar")
        .value
        .trim();

    const statusMessage =
        document.querySelector("#register-status");

    statusMessage.textContent = "Creating account...";

    try {
        const registeredUser = await registerUser(
            name,
            email,
            password,
            avatarUrl
        );

        console.log(
            "Registered user:",
            registeredUser
        );

        statusMessage.textContent =
            "Account created successfully. Redirecting to login...";

        setTimeout(() => {
            window.location.href = "./login.html";
        }, 1500);
    } catch (error) {
        console.error(
            "Registration failed:",
            error
        );

        statusMessage.textContent =
            error.message;
    }
}