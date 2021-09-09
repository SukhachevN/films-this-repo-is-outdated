
import React from "react";
import * as colors from '../styles/colors'
import { addToFavourite, removeFromFavourite } from '../redux/favourite/faviuriteActions';
import { addToWatchLater, removeFromWatchLater } from '../redux/watchLater/watchLaterActions';
import { BsFillHeartFill,BsFillClockFill,BsDisplayFill } from "react-icons/bs";
import { CircularProgressbar } from 'react-circular-progressbar';

function Like(props){
    return <BsFillHeartFill aria-label='add to favourite' {...props}/>
}

function WatchLater(props){
    return <BsFillClockFill aria-label='add to watch later list' {...props}/>
}

function WatchVideo(props){
    return <BsDisplayFill aria-label='watch movie trailer' {...props}/>
}

function like(dispatch,inFavourite,info,isFilmScreen = false){
    return <button className='StatusButton' onClick={()=>info?.id ? (dispatch(inFavourite
        ?removeFromFavourite(info) 
        : addToFavourite(info))): null}>
            <Like size = {isFilmScreen ? '2.5rem' : '2rem' } color={inFavourite ? colors.red : colors.gray80}/>
    </button>
}

function watchLater(dispatch,inWatchLater,info,isFilmScreen = false){
    return <button className='StatusButton' onClick={()=>info?.id ? (dispatch(inWatchLater 
        ? removeFromWatchLater(info)
        : addToWatchLater(info) )):null}>
            <WatchLater size = {isFilmScreen ? '2.5rem' : '2rem' } color={inWatchLater ? colors.brightGreen : colors.gray80}/> 
    </button>
}

function watchVideo(key,isFilmScreen = false){
    if (!key){
        return null
    }
    return <button className='StatusButton'>
                    {key?<a href={`https://www.youtube.com/watch?v=${key}`}>{
                        <WatchVideo size={isFilmScreen ? '2.5rem' : '2rem' } color={colors.gray80}/>
                    }</a>:null}
    </button>
}

function rating(percentage = 0,isFilmScreen = false){
    return <div className={`ProgressBar ${isFilmScreen ? 'ProgressBarFilmScreen' : ''}`}>
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div> 
}

export {Like,WatchLater,WatchVideo,like,watchLater,watchVideo,rating}