const createArtworkForm =
    document.getElementById("create-artwork-form");

const artworkTitle =
    document.getElementById("artwork-title");

if (createArtworkForm) {
    createArtworkForm.addEventListener(
        "submit",
        handleCreateArtwork
    );
}

if (artworkTitle) {
    loadSingleArtwork();
}

async function loadSingleArtwork() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const artworkId = params.get("id");

    if (!artworkId) {
        console.error("No artwork ID was found in the URL.");
        return;
    }

    try {
        const artwork = await getArtwork(artworkId);

        document.getElementById("artwork-title").textContent =
            artwork.title;

        document.getElementById("artwork-artist").textContent =
            artwork.artist;

        document.getElementById("artwork-year").textContent =
            artwork.year;

        document.getElementById("artwork-medium").textContent =
            artwork.medium;

        document.getElementById("artwork-location").textContent =
            artwork.location;

        document.getElementById("artwork-description").textContent =
            artwork.description;

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

async function handleCreateArtwork(event) {
    event.preventDefault();

    const statusMessage =
        document.getElementById("create-status");

    statusMessage.textContent = "";

    const title =
        document.getElementById("create-title").value.trim();

    const artist =
        document.getElementById("create-artist").value.trim();

    const year =
        Number(document.getElementById("create-year").value);

    const medium =
        document.getElementById("create-medium").value.trim();

    const location =
        document.getElementById("create-location").value.trim();

    const imageUrl =
        document.getElementById("create-image").value.trim();

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
        statusMessage.textContent = error.message;
    }
}