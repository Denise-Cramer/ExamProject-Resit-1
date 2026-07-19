async function getArtworks() {
    const response = await fetch(ARTWORKS_URL);

    if(!response.ok) {
        throw new Error(
            `Could not fetch artworks. Status: ${response.status}`
        );
    }

    const result = await response.json();

    return result.data;
    
}

async function getArtwork(id) {
    const response = await fetch(`${ARTWORKS_URL}/${id}`);

    if (!response.ok) {
        throw new Error(
            `Could not fetch artwork. Status: ${response.status}`
        );
    }

    const result = await response.json();

    return result.data;
    
}

async function loginUser(email, password) {
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    
    const result = await response.json();

    if (!response.ok) {
        const message =
            result.errors?.[0]?.message ||
            "Failed to log in. Please check your e-mail and password"

            throw new Error(message);
    }

    return result.data;
}
async function registerUser(name, email, password, avatarUrl) {
    const userData = {
        name: name,
        email: email,
        password: password
    };

    if (avatarUrl) {
        userData.avatar = {
            url: avatarUrl,
            alt: `${name}'s profile image`
        };
    }

    const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (!response.ok) {
        const message =
            result.errors?.[0]?.message ||
            "Could not register the account.";

        throw new Error(message);
    }

    return result.data;
}

async function createArtwork(artworkData) {
    const accessToken = getAccessToken();

    if (!accessToken) {
        throw new Error(
            "You must be logged in to create an artwork"
        );
    }

    const response = await fetch(ARTWORKS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY
        },
        body: JSON.stringify(artworkData)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || "Could not create artwork.");
    }

    return result.data;
}

async function updateArtwork(id, artworkData) {
    const accessToken = getAccessToken();

        if (!accessToken) {
        throw new Error(
            "You must be logged in to edit an artwork"
        );
    }

    const response = await fetch(`${ARTWORKS_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY
        },
        body: JSON.stringify(artworkData)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.errors?.[0]?.message ||
            "Could not update artwork."
        );
    }

    return result.data;
}

async function deleteArtwork(id) {
    const accessToken = getAccessToken();

        if (!accessToken) {
        throw new Error(
            "You must be logged in to delete an artwork"
        );
    }

    const response = await fetch(`${ARTWORKS_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY
        }
    });

    if (!response.ok) {
        const result = await response.json();

        throw new Error(
            result.errors?.[0]?.message ||
            "Could not delete artwork"
        );
    }
}