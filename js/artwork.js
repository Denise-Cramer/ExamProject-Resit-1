const createArtworkForm =
    document.getElementById("create-artwork-form");

const editArtworkForm =
    document.getElementById("edit-artwork-form");

const editDeleteButton =
    document.getElementById("edit-delete-button");

const artworkTitle =
    document.getElementById("artwork-title");

if (
    (createArtworkForm || editArtworkForm) &&
    !isLoggedIn()
) {
    window.location.href =
        "../account/login.html";
}

if (createArtworkForm) {
    createArtworkForm.addEventListener(
        "submit",
        handleCreateArtwork
    );
}

if (editArtworkForm) {
    loadEditArtwork();

    editArtworkForm.addEventListener(
        "submit",
        handleEditArtwork
    );
}

if (editDeleteButton) {
    editDeleteButton.addEventListener(
        "click",
        handleDeleteArtwork
    );
}

if (artworkTitle) {
    loadSingleArtwork();
}

function getArtworkIdFromUrl() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    return params.get("id");
}

async function loadSingleArtwork() {
    const artworkId = getArtworkIdFromUrl();

    if (!artworkId) {
        console.error(
            "No artwork ID was found in the URL."
        );

        return;
    }

    try {
        const artwork = await getArtwork(artworkId);

        const loggedInUser = getUser();

        const isOwner =
            loggedInUser &&
            artwork.owner?.name === loggedInUser.name;

        const ownerActions = 
            document.getElementById("owner-actions");

        if (ownerActions) {
            ownerActions.style.display =
                isOwner ? "flex" : "none";
        }

        const editArtworkLink =
            document.getElementById("edit-artwork-link");

        if (editArtworkLink) {
            editArtworkLink.href =
                `./edit.html?id=${artwork.id}`;
        }

        document.getElementById(
            "artwork-title"
        ).textContent = artwork.title;

        document.getElementById(
            "artwork-artist"
        ).textContent = artwork.artist;

        document.getElementById(
            "artwork-year"
        ).textContent = artwork.year;

        document.getElementById(
            "artwork-medium"
        ).textContent = artwork.medium;

        document.getElementById(
            "artwork-location"
        ).textContent = artwork.location;

        document.getElementById(
            "artwork-description"
        ).textContent = artwork.description;

        const artworkImage =
            document.getElementById("artwork-image");

        artworkImage.src =
            artwork.image?.url ||
            "https://placehold.co/800x600";

        artworkImage.alt =
            artwork.image?.alt ||
            artwork.title ||
            "Artwork image";
    } catch (error) {
        console.error(
            "Could not load selected artwork:",
            error
        );
    }
}

async function loadEditArtwork() {
    const artworkId = getArtworkIdFromUrl();

    const statusMessage =
        document.getElementById("edit-status");

    if (!artworkId) {
        statusMessage.textContent =
            "No artwork ID was found in the URL.";

        return;
    }

    try {
        statusMessage.textContent =
            "Loading artwork...";

        const artwork = 
            await getArtwork(artworkId);

        const loggedInUser = getUser ();

        const isOwner = 
            loggedInUser &&
            artwork.owner?.name === loggedInUser.name;

        if (!isOwner) {
            statusMessage.textContent = 
                "You do not have persmission to edit this artwork";

            window.location.href =
                `./index.html?id=${artworkId}`;

            return;
        }

        document.getElementById("edit-title").value =
            artwork.title || "";

        document.getElementById("edit-artist").value =
            artwork.artist || "";

        document.getElementById("edit-year").value =
            artwork.year || "";

        document.getElementById("edit-medium").value =
            artwork.medium || "";

        document.getElementById("edit-location").value =
            artwork.location || "";

        document.getElementById("edit-image").value =
            artwork.image?.url || "";

        document.getElementById(
            "edit-description"
        ).value = artwork.description || "";

        statusMessage.textContent = "";
    } catch (error) {
        statusMessage.textContent = error.message;

        console.error(
            "Could not load artwork for editing:",
            error
        );
    }
}

async function handleCreateArtwork(event) {
    event.preventDefault();

    if (!isLoggedIn()) {
        window.location.href =
            "../account/login.html";

            return;
    }

    const statusMessage =
        document.getElementById("create-status");

    statusMessage.textContent = "";

    const title =
        document.getElementById(
            "create-title"
        ).value.trim();

    const artist =
        document.getElementById(
            "create-artist"
        ).value.trim();

    const year =
        Number(
            document.getElementById(
                "create-year"
            ).value
        );

    const medium =
        document.getElementById(
            "create-medium"
        ).value.trim();

    const location =
        document.getElementById(
            "create-location"
        ).value.trim();

    const imageUrl =
        document.getElementById(
            "create-image"
        ).value.trim();

    const description =
        document.getElementById(
            "create-description"
        ).value.trim();

    const artworkData = {
        title: title,
        artist: artist,
        year: year,
        medium: medium,
        location: location,
        description: description,
        image: {
            url: imageUrl,
            alt: `${title} by ${artist}`
        }
    };

    try {
        statusMessage.textContent =
            "Creating artwork...";

        const newArtwork =
            await createArtwork(artworkData);

        statusMessage.textContent =
            "Artwork created successfully!";

        window.location.href =
            `./index.html?id=${newArtwork.id}`;
    } catch (error) {
        statusMessage.textContent =
            error.message;

        console.error(
            "Could not create artwork:",
            error
        );
    }
}

async function handleEditArtwork(event) {
    event.preventDefault();

    if (!isLoggedIn()) {
        window.location.href =
            "../account/login.html";

        return;
    }

    const artworkId = getArtworkIdFromUrl();

    const statusMessage =
        document.getElementById("edit-status");

    statusMessage.textContent = "";

    if (!artworkId) {
        statusMessage.textContent =
            "No artwork ID was found in the URL.";

        return;
    }

    const title =
        document.getElementById(
            "edit-title"
        ).value.trim();

    const artist =
        document.getElementById(
            "edit-artist"
        ).value.trim();

    const year =
        Number(
            document.getElementById(
                "edit-year"
            ).value
        );

    const medium =
        document.getElementById(
            "edit-medium"
        ).value.trim();

    const location =
        document.getElementById(
            "edit-location"
        ).value.trim();

    const imageUrl =
        document.getElementById(
            "edit-image"
        ).value.trim();

    const description =
        document.getElementById(
            "edit-description"
        ).value.trim();

    const artworkData = {
        title: title,
        artist: artist,
        year: year,
        medium: medium,
        location: location,
        description: description,
        image: {
            url: imageUrl,
            alt: `${title} by ${artist}`
        }
    };

    try {
        statusMessage.textContent =
            "Saving changes...";

        const updatedArtwork =
            await updateArtwork(
                artworkId,
                artworkData
            );

        statusMessage.textContent =
            "Artwork updated successfully!";

        window.location.href =
            `./index.html?id=${updatedArtwork.id}`;
    } catch (error) {
        statusMessage.textContent =
            error.message;

        console.error(
            "Could not update artwork:",
            error
        );
    }
}

async function handleDeleteArtwork() {

    if (!isLoggedIn()) {
        window.location.href =
            "../account/login.html";

        return;
    }

    const artworkId = getArtworkIdFromUrl();

    const statusMessage =
        document.getElementById("edit-status");

        if (!artworkId) {
            statusMessage.textContent =
            "No artwork ID was found";

        return;
    }

    const shouldDelete = window.confirm(
        "Are you sure you want to delete this artwork?"
    );

    if (!shouldDelete) {
        return;
    }

    try {
        statusMessage.textContent =
            "Deleting artwork...";

        await deleteArtwork(artworkId);

        window.location.href =
            "../index.html#gallery";
    } catch (error) {
        statusMessage.textContent =
        error.message;

        console.error(
            "Could not delete artwork",
            error
        );
    }
    
}
