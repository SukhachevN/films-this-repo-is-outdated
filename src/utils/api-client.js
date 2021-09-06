const api_key = 'f96bc754e888b05f53dd6db062184947'
function client(endpoint){
    return window.fetch(endpoint).then(async response=>{
        const data = await response.json()
        if (response.ok) {
            return data
          } else {
            return Promise.reject(data)
          }
    })

}
function getSearchFilms(endpoint){
  const link = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}${endpoint}`
  return client(link)
}
function getDiscoverFilms(endpoint){
  const link = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}${endpoint}`
  return client(link)
}
function getFilmInfo(endpoint){
  const link = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${api_key}`
  return client(link)
}
function getFilmVideos(endpoint){
  const link = `https://api.themoviedb.org/3/movie/${endpoint}/videos?api_key=${api_key}`
  return client(link)
}
export {getSearchFilms,getDiscoverFilms,getFilmInfo,getFilmVideos}