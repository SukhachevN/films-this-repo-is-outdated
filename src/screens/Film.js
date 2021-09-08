import filmPlaceHolder from '../img/image-placeholder.jpg'
import {Link} from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
import {useSelector, useDispatch} from 'react-redux'
import React from 'react';
import {like,watchLater,rating} from '../components/statusButtons'
function Film({data}){
    const {favourite:favouriteList,watchLater:watchLaterList} = useSelector(state => state)
    const inFavourite = favouriteList?.idList.includes(data.id)
    const inWatchLater = watchLaterList?.idList.includes(data.id)
    const dispatch = useDispatch()
    const likeButton = React.useMemo(() => like(dispatch,inFavourite,data),[data, dispatch, inFavourite])
    const watchLaterButton = React.useMemo(()=>watchLater(dispatch,inWatchLater,data),[data, dispatch, inWatchLater]) 
    const rate = React.useMemo(()=>rating(data?.vote_average*10),[data?.vote_average])
    const film = React.useMemo(()=>FilmBody(data,{
        likeButton:likeButton??null,
        watchLaterButton:watchLaterButton??null,
        rate: rate ?? rating()
    }),[data, likeButton, rate, watchLaterButton])
    return film
}

function FilmBody(data,ui){
    const imagePath = 'https://image.tmdb.org/t/p/original/'
    const filmImg = data.poster_path?`${imagePath}${data.poster_path}`:filmPlaceHolder
    const {likeButton,watchLaterButton,rate} = ui
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
                    {likeButton}
                    {rate}
                    {watchLaterButton}
                </div>
        </div>
    )
}
export default React.memo(Film)