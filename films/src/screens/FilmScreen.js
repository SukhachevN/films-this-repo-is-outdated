import React from 'react'
import {useParams} from 'react-router-dom'
import { searchFilm } from '../utils/films'
function FilmScreen(){
    const {filmId} = useParams()
    const [isLoading,setIsLoading] = React.useState(true)
    const [film, setFilm] = React.useState()
    searchFilm(filmId,false,true).then((data) => {setIsLoading(false);setFilm(data)})
    console.log(isLoading)
    console.log(film)
    return (
        <div>{isLoading?"loading":film.adult}</div>
    )
}
export {FilmScreen}