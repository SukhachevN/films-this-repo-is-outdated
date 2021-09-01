import { client } from "./api-client"

async function searchFilm(endpoint,discover=false,getFilm=false){
    const data = await client(encodeURI(endpoint),discover,getFilm)
    return data
}

export {searchFilm}