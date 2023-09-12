// const baseURL = process.env.REACT_API_BASE_URL;
const baseURL = 'https://api.thecatapi.com/v1/';

const breeds = '/breeds';
const images = '/images';
const votes = '/votes';
const favourites = '/favourites';

const endPoints = {
    breeds: {
        base: breeds,
        byId: (id: string) => `${breeds}/${id}`,
    },
    images: {
        base: `${images}/search`,
        upload: `${images}/upload`,
        // getUploaded: images,
    },
    votes: {
        base: votes,
    },
    favourites: {
        base: favourites,
    }
}

export {
    baseURL,
    endPoints,
}

