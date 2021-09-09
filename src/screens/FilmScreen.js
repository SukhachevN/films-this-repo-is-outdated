import React from 'react'
import {useParams} from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import filmPlaceHolder from '../img/image-placeholder.jpg'
import {NotFoundScreen} from '../screens/NotFoundScreen'
import * as colors from '../styles/colors'
import {useSelector, useDispatch} from 'react-redux'
import { addToFavourite, removeFromFavourite } from '../redux/favourite/faviuriteActions';
import { addToWatchLater, removeFromWatchLater } from '../redux/watchLater/watchLaterActions';
import {Like,WatchLater,WatchVideo} from '../components/statusButtons'
import { loadingFilm } from '../components/loadingFilm';
import {fetchFilmInfo} from '../redux/filmInfo/filmInfoActions'
import {fetchFilmVideo} from '../redux/filmVideo/filmVideoActions'
function FilmScreen(){
    const {filmId} = useParams()
    const data = useSelector(state => state)
    const dispatch = useDispatch()
    console.log(data)
    const inFavourite = data?.favourite.idList.includes(data.filmInfo.info?.id)
    const inWatchLater = data?.watchLater.idList.includes(data.filmInfo.info?.id)
    const likeButton = React.useMemo(() => like(dispatch,inFavourite,data.filmInfo.info),[dispatch, inFavourite, data.filmInfo.info])
    const watchLaterButton = React.useMemo(()=>watchLater(dispatch,inWatchLater,data.filmInfo.info),[dispatch, inWatchLater, data.filmInfo.info]) 
    const watchVideoButton = React.useMemo(()=>watchVideo(data.filmVideo.video?.results[0]?.key),[data.filmVideo.video?.results])
    const rate = React.useMemo(()=>rating(data.filmInfo.info?.vote_average*10),[data.filmInfo.info?.vote_average])  
    React.useEffect(()=>{
        dispatch(fetchFilmInfo(filmId))
        dispatch(fetchFilmVideo(filmId))
    },[dispatch, filmId])
    if(data.filmInfo.error){
        return (<div className='ErrorBlockFilmScreen'>
        <p className='ErrorMessage ErrorMessageFilmScreen'>{data.filmInfo.error?data.filmInfo.error.status_message:null}</p>
            <NotFoundScreen />
       </div>)
    } else if(data.filmInfo.info ===null || data.filmVideo?.video ===null){
        return Film(loadingFilm)
    } else {
       return Film(data.filmInfo.info,{
        likeButton:likeButton,
        watchLaterButton:watchLaterButton,
        watchVideoButton:watchVideoButton,
        rate:rate
    })
    }
       
}

function like(dispatch,inFavourite,info){
    if (!info){
        return null
    }
    return <button className='StatusButton' onClick={()=>dispatch(inFavourite
        ?removeFromFavourite(info) 
        : addToFavourite(info))}>
            <Like size = '2.5rem' color={inFavourite ? colors.red : colors.gray80}/>
    </button>
}

function watchLater(dispatch,inWatchLater,info){
    if (!info){
        return null
    }
    return <button className='StatusButton' onClick={()=>dispatch(inWatchLater 
        ? removeFromWatchLater(info)
        : addToWatchLater(info) )}>
            <WatchLater size = '2.5rem' color={inWatchLater ? colors.brightGreen : colors.gray80}/> 
    </button>
}

function watchVideo(key){
    if (!key){
        return null
    }
    return <button className='StatusButton'>
                    {key?<a href={`https://www.youtube.com/watch?v=${key}`}>{<WatchVideo size='2.5rem' color={colors.gray80}/>}</a>:null}
    </button>
}

function rating(percentage = 0){
    return <div className='ProgressBar ProgressBarFilmScreen'>
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div> 
}

function Film(data,ui){
    const {title,overview,release_date,budget,runtime,poster_path,homepage} = data
    const imagePath = poster_path ?`https://image.tmdb.org/t/p/original/${poster_path}` : filmPlaceHolder
    const {likeButton,watchLaterButton,watchVideoButton,rate} = ui ?? {
        likeButton:null,
        watchLaterButton:null,
        watchVideoButton:null,
        rate: rating()
    }
    return <section className='FilmScreenSection'>
        <h1 className='FilmScreenH1'>{title}</h1>
        <div className='FilmScreenContent'>
           <img src={imagePath} alt={`${title} poster`} 
           className='FilmScreenImg'/> 
           <ul className='FilmScreenPropertiesList'>
           <li>Release date: {release_date ?? 'unknown'}</li>
            <li>Budget: {budget !== null && budget!==0 ? `${budget} $`:'unknown'}</li>
            <li>Length: {runtime ?? 'unknown'} min</li>
            <li>Site: {homepage?<a className='SiteLink' href={homepage}>{homepage}</a>:'No site'}</li>
            <li>Description: {overview}</li>
            <div className='StatusButtonsBlock StatusButtonBlockFilmScreen'>
            {likeButton}
            {watchLaterButton}
            {watchVideoButton}
            </div>
            {rate} 
           </ul>
        </div>
    </section>
}

export default FilmScreen

