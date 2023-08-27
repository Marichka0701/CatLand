// const baseURL = process.env.REACT_API_BASE_URL;
const baseURL = 'https://api.thecatapi.com/v1/';

const breeds = '/breeds';
const images = '/images/search';

const endPoints = {
    breeds: {
        base: breeds,
        byId: (id: string) => `${breeds}/${id}`,
    },
    images: {
        base: images,
    }
}

export {
    baseURL,
    endPoints,
}

