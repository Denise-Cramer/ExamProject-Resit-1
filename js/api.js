async function getArtworks(params) {
    const response = await fetch(ARTWORKS_URL);

    if(!response.ok) {
        throw new Error(
            `Could not fetch artowrks. Status: ${response.status}`
        );
    }

    const result = await response.json();

    return result.data;
    
}