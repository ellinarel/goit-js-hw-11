import axios from 'axios';
const BASE_URL = `https://pixabay.com/api/`
const KEY = `34446168-3b6c7bd8508fcf4c0afecb303`

export async function fetchImages (searchQuery) {
    return await axios.get(`${BASE_URL}?key=${KEY}&q=${searchQuery}`), {
        params: {
            key: `KEY`,
            q: `searchQuery`,
            image_type: `photo`,
            orientation:`horizontal`,
            safesearch: `true`,
            per_page : `40`
        },
        headers: {
            "Content-Type": `aplication/JSON`,
            Authorization : KEY,
        },
    }
        .then((response) => { console.log(response.data) })
        .catch((error) => { console.log(error.name)})
}