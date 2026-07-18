const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const artworkId = params.get("id");

if (artworkId) {
    testSingleArtwork();
} else {
    console.error("No artwork ID was found in the URL.");
}

async function testSingleArtwork() {
    try {
        const artwork = await getArtwork(artworkId);

        console.log("Selected artwork:", artwork);

        document.getElementById("artwork-title").textContent =
            artwork.title;
        
        document.getElementById("artwork-artist").textContent =
                artwork.artist;

        document.getElementById("artwork-year").textContent =
            artwork.year

        document.getElementById("artwork-medium").textContent =
            artwork.medium

        document.getElementById("artwork-location").textContent =
            artwork.location

        document.getElementById("artwork-description").textContent =
            artwork.description

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
        console.error("Could not load selected artwork:", error);
    }
}