const artworkGrid = document.querySelector("#artwork-grid");

if (artworkGrid) {
    displayArtworks();
}

async function displayArtworks() {
    try {
        const artworks = await getArtworks();

        console.log(artworks);

        const firstTwelve = artworks.slice(0, 12);

        artworkGrid.innerHTML = "";

        for (const artwork of firstTwelve) {
            artworkGrid.innerHTML += `
                <article class="artwork-card">
                    <img
                        src="${artwork.image?.url || "https://placehold.co/400x300"}"
                        alt="${artwork.image?.alt || artwork.title}"
                    >

                    <h2>${artwork.title}</h2>

                    <p>${artwork.artist}</p>

                    <p class="artwork-year">${artwork.year}</p>

                    <a
                        href="./artwork/index.html?id=${artwork.id}"
                        class="card-button"
                    >
                        MORE INFO
                    </a>
                </article>
            `;
        }

    } catch (error) {
        console.error(error);
    }
}