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

        console.log("Logged.in User", user);

        statusMessage.textContent = "Login successfull";
    } catch (error) {
        console.error("Login failed", error);

        statusMessage.textContent = error.message;
    }
    
}