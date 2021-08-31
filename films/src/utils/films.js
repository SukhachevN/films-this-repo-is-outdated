import { client } from "./api-client"

async function searchFilm(endpoint){
    const data = await client(encodeURI(endpoint))
    return data
}

export {searchFilm}