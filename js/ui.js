const menuButton = document.querySelector("#menu-button");
const mainMenu = document.querySelector("#main-menu");
const menuList = document.querySelector("#menu-list");
const accountLink = document.querySelector("#account-link");

function getPathPrefix() {
    const isInsideSubfolder =
        window.location.pathname.includes("/account/") ||
        window.location.pathname.includes("/artwork/");

    return isInsideSubfolder ? "../" : "./";
}

function createMenu() {
    if (!menuList) {
        return;
    }

    const pathPrefix = getPathPrefix();
    const user = getUser();

    menuList.innerHTML = "";

    if (isLoggedIn()) {
        menuList.innerHTML = `
            <li class="menu-user">
                Logged in as ${user.name}
            </li>

            <li>
                <a href="${pathPrefix}index.html">
                    Home
                </a>
            </li>

            <li>
                <a href="${pathPrefix}index.html#gallery">
                    Gallery
                </a>
            </li>

            <li>
                <a href="${pathPrefix}artwork/create.html">
                    Create Artwork
                </a>
            </li>

            <li>
                <button
                    type="button"
                    id="logout-button"
                >
                    Logout
                </button>
            </li>
        `;

        const logoutButton =
            document.querySelector("#logout-button");

        logoutButton.addEventListener(
            "click",
            handleLogout
        );
    } else {
        menuList.innerHTML = `
            <li>
                <a href="${pathPrefix}index.html">
                    Home
                </a>
            </li>

            <li>
                <a href="${pathPrefix}index.html#gallery">
                    Gallery
                </a>
            </li>

            <li>
                <a href="${pathPrefix}account/login.html">
                    Login
                </a>
            </li>

            <li>
                <a href="${pathPrefix}account/register.html">
                    Register
                </a>
            </li>
        `;
    }
}

function updateAccountLink() {
    if (!accountLink) {
        return;
    }

    const pathPrefix = getPathPrefix();

    if (isLoggedIn()) {
        accountLink.href = "#";
        accountLink.setAttribute(
            "aria-label",
            "Open user menu"
        );
        accountLink.title = "User menu";
    } else {
        accountLink.href =
            `${pathPrefix}account/login.html`;

        accountLink.setAttribute(
            "aria-label",
            "Login"
        );

        accountLink.title = "Login";
    }
}

function toggleMenu() {
    if (!mainMenu || !menuButton) {
        return;
    }

    const menuIsHidden =
        mainMenu.classList.contains("hidden");

    mainMenu.classList.toggle("hidden");

    menuButton.setAttribute(
        "aria-expanded",
        String(menuIsHidden)
    );

    menuButton.setAttribute(
        "aria-label",
        menuIsHidden
            ? "Close navigation menu"
            : "Open navigation menu"
    );
}

function closeMenu() {
    if (!mainMenu || !menuButton) {
        return;
    }

    mainMenu.classList.add("hidden");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}

function handleLogout() {
    clearUser();

    const pathPrefix = getPathPrefix();

    window.location.href =
        `${pathPrefix}index.html`;
}

if (menuButton) {
    menuButton.addEventListener(
        "click",
        toggleMenu
    );
}

if (accountLink) {
    accountLink.addEventListener(
        "click",
        function (event) {
            if (!isLoggedIn()) {
                return;
            }

            event.preventDefault();
            toggleMenu();
        }
    );
}

document.addEventListener(
    "click",
    function (event) {
        if (!mainMenu || !menuButton) {
            return;
        }

        const clickedInsideMenu =
            mainMenu.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);

        const clickedAccountLink =
            accountLink?.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedMenuButton &&
            !clickedAccountLink
        ) {
            closeMenu();
        }
    }
);

document.addEventListener(
    "keydown",
    function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    }
);

createMenu();
updateAccountLink();
