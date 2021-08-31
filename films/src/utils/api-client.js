function client(endpoint){
  const api_key = 'f96bc754e888b05f53dd6db062184947'
    return window.fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${endpoint}`).then(async response=>{
        const data = await response.json()
        if (response.ok) {
            return data
          } else {
            return Promise.reject(data)
          }
    })

}
export {client}