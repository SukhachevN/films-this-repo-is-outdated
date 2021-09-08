import * as colors from '../styles/colors'
import filmPlaceHolder from '../img/image-placeholder.jpg'
import { CircularProgressbar } from 'react-circular-progressbar';
import {Link} from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
import {useSelector, useDispatch} from 'react-redux'
import { addToFavourite, removeFromFavourite } from '../redux/favourite/faviuriteActions';
import { addToWatchLater, removeFromWatchLater } from '../redux/watchLater/watchLaterActions';
import {Like,WatchLater} from '../components/statusButtons'
import React from 'react';
function Film({data}){
    const {favourite,watchLater} = useSelector(state => state)
    const inFavourite = favourite.idList.includes(data.id)
    const inWatchLater = watchLater.idList.includes(data.id)
    const dispatch = useDispatch()
    const film = React.useMemo(()=>FilmBody(data,inFavourite,inWatchLater,dispatch),[data, dispatch, inFavourite, inWatchLater])
    return film
}

function FilmBody(data,inFavourite,inWatchLater,dispatch){
    const imagePath = 'https://image.tmdb.org/t/p/original/'
    const filmImg = data.poster_path?`${imagePath}${data.poster_path}`:filmPlaceHolder
    const percentage = data.vote_average*10
    return (
            <div className='Film'>
            <Link to={`films/${data.id}`}>
                <img
                    src={filmImg}
                    alt={`${data.title} book cover`}
                    className = 'FilmImg'/>
                <h2 className='FilmH2 OverFlowText'>{data.title}</h2>
                <p className = 'FilmOverwiew OverFlowText'>{data.overview}</p>
            </Link>
                <div className='StatusButtonsBlock'>
                    <button className='StatusButton' onClick={()=>dispatch(inFavourite
                    ?removeFromFavourite(data) 
                    : addToFavourite(data))}>
                        <Like size = '2rem' color={inFavourite ? colors.red : colors.gray80}/>
                    </button>
                    <div className='ProgressBar'>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} />
                    </div>
                    <button className='StatusButton' onClick={()=>dispatch(inWatchLater 
                    ? removeFromWatchLater(data)
                    : addToWatchLater(data) )}>
                        <WatchLater size = '2rem' color={inWatchLater ? colors.brightGreen : colors.gray80}/>
                    </button>
                </div>
        </div>
    )
}
export default React.memo(Film)