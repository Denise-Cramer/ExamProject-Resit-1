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
    } catch (error) {
        console.error("Could not load selected artwork:", error);
    }
}