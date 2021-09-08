import React from 'react'
import {useParams} from 'react-router-dom'
import { getFilmInfo,getFilmVideos } from '../utils/api-client'
import { CircularProgressbar } from 'react-circular-progressbar';
import filmPlaceHolder from '../img/image-placeholder.jpg'
import { useAsync } from '../utils/hooks'
import {NotFoundScreen} from '../screens/NotFoundScreen'
import * as colors from '../styles/colors'
import {useSelector, useDispatch} from 'react-redux'
import { addToFavourite, removeFromFavourite } from '../redux/favourite/faviuriteActions';
import { addToWatchLater, removeFromWatchLater } from '../redux/watchLater/watchLaterActions';
import {Like,WatchLater,WatchVideo} from '../components/statusButtons'
import { loadingFilm } from '../components/loadingFilm';
function FilmScreen(){
    const {filmId} = useParams()
    const {data:info,run:fetchInfo,isLoading:isInfoLoading,isSuccess:isInfoSucces,error} = useAsync()
    const {data:video,run:fetchVideo,isLoading:isVideoLoading,isSuccess:isVideoSucces} = useAsync()
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const inFavourite = state?.favourite.idList.includes(info?.id)
    const inWatchLater = state?.watchLater.idList.includes(info?.id)
    const likeButton = React.useMemo(() => like(dispatch,inFavourite,info),[dispatch, inFavourite, info])
    const watchLaterButton = React.useMemo(()=>watchLater(dispatch,inWatchLater,info),[dispatch, inWatchLater, info]) 
    const watchVideoButton = React.useMemo(()=>watchVideo(video?.results[0]?.key),[video?.results])
    const rate = React.useMemo(()=>rating(info?.vote_average*10),[info?.vote_average])  
    React.useEffect(()=>{
        fetchInfo(getFilmInfo(filmId))
        fetchVideo(getFilmVideos(filmId))
    },[fetchInfo, fetchVideo, filmId])
    if(isInfoLoading||isVideoLoading){
        return Film(loadingFilm)
    } else if(isInfoSucces && isVideoSucces){
        return Film(info,{
            likeButton:likeButton,
            watchLaterButton:watchLaterButton,
            watchVideoButton:watchVideoButton,
            rate:rate
        })
    } else {
       return (<div className='ErrorBlockFilmScreen'>
       <p className='ErrorMessage ErrorMessageFilmScreen'>{error?error.status_message:null}</p>
        <NotFoundScreen />
       </div>)
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

export {FilmScreen}

