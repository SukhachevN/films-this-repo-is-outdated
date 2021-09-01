function client(endpoint,discover,getFilm){
  const api_key = 'f96bc754e888b05f53dd6db062184947'
  const search = discover ? 'discover' : 'search'
  const link = getFilm? `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${api_key}` :`https://api.themoviedb.org/3/${search}/movie?api_key=${api_key}${endpoint}`
    return window.fetch(link).then(async response=>{
        const data = await response.json()
        if (response.ok) {
            return data
          } else {
            return Promise.reject(data)
          }
    })

}
export {client}