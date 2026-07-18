async function getArtworks() {
    const response = await fetch(ARTWORKS_URL);

    if(!response.ok) {
        throw new Error(
            `Could not fetch artowrks. Status: ${response.status}`
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