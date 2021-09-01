/** @jsxImportSource @emotion/react */
import React from 'react'
import {useParams} from 'react-router-dom'
import { getFilmInfo,getFilmVideos } from '../utils/api-client'
import { CircularProgressbar } from 'react-circular-progressbar';
import filmPlaceHolder from '../img/image-placeholder.jpg'
function FilmScreen(){
    const {filmId} = useParams()
    const [film,setFilm] = React.useState(null)
    React.useEffect(()=>{
        getFilmInfo(filmId).then(data=>setFilm(data))
    },[filmId])
    const loadingData = {
        title:'loading ...',
        overview:'loading...',
        release_date:'loading...',
        budget:'loading...',
        vote_average:'0',
        poster_path:null,
        homepage:'loading...',
        runtime:'loading...'
    }
    console.log(film)
    return film===null?Film(loadingData):Film(film)
}

function Film(data){
    const {title,overview,release_date,budget,vote_average,runtime,poster_path,homepage}= data
    const percentage = vote_average*10
    const imagePath = poster_path ?`https://image.tmdb.org/t/p/original/${poster_path}` : filmPlaceHolder
    return <section css={{display:'flex',justifyContent:'center'}}>
        <div css={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',paddingBottom:'50px'}}>
        <h1>{title}</h1>
        <div css={{display:'flex',justifyContent:'center',gap:'50px'}}>
           <img src={imagePath} alt={`${title} poster`} css={{width:'100%',height:"100%",maxHeight:'40rem',maxWidth:'30rem'}}/> 
           <ul css={{display:'flex',flexDirection:'column',gap:'40px'}}>
           <li>Release date: {release_date ?? 'unknown'}</li>
            <li>Budget: {budget ?? 'unknown'} $</li>
            <li>Length: {runtime ?? 'unknown'} min</li>
            <li>Site: <a css={{textDecoration:'underline'}} href={homepage??null}>{homepage==="" ?'No site' : homepage}</a></li>
            <li>Description: {overview}</li>
            <div css={{width:'100px',height:'100px',margin:'auto'}}>
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>  
           </ul>
        </div>
        </div>

    </section>
}

export {FilmScreen}

