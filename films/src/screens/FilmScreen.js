/** @jsxImportSource @emotion/react */
import React from 'react'
import {useParams} from 'react-router-dom'
import { getFilmInfo,getFilmVideos } from '../utils/api-client'
import { CircularProgressbar } from 'react-circular-progressbar';
import filmPlaceHolder from '../img/image-placeholder.jpg'
import * as mq from '../styles/media-queries'
import { useAsync } from '../utils/hooks'
import {NotFoundScreen} from '../screens/NotFoundScreen'
import * as colors from '../styles/colors'
function FilmScreen(){
    const {filmId} = useParams()
    const {data,run,isLoading,isSuccess,error} = useAsync()
    React.useEffect(()=>{
        run( getFilmInfo(filmId))
    },[filmId, run])
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
    if(isLoading){
        return Film(loadingData)
    } else if(isSuccess){
        return Film(data)
    } else {
       return (<div css={{display:'flex',flexDirection:'column',alignItems:'center'}}>
       <p css={{color:colors.danger,paddingBottom:'40px'}}>{error?error.status_message:null}</p>
        <NotFoundScreen />
       </div>)
    }
       
}

function Film(data){
    const {title,overview,release_date,budget,vote_average,runtime,poster_path,homepage}= data
    const percentage = vote_average*10
    const imagePath = poster_path ?`https://image.tmdb.org/t/p/original/${poster_path}` : filmPlaceHolder
    return <section css={{display:'flex',justifyContent:'center'}}>
        <div css={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',paddingBottom:'50px',width:'100%'}}>
        <h1>{title}</h1>
        <div css={
            {display:'flex',
            justifyContent:'center',
            gap:'20px',
            width:"100%",
            padding: '0 50px',
            [mq.small]:{
                flexDirection:'column'
            },
            }}>
           <img src={imagePath} alt={`${title} poster`} 
           css={{
               width:'100%',
               height:"100%",
               maxHeight:'40rem',
               maxWidth:'30rem',
               flexBasis:'50%',
               margin:'0 auto',
                [mq.small]:{
                    maxHeight:'20rem',
                    maxWidth:'15rem',
                },
                [mq.medium]:{
                    maxHeight:'30rem',
                    maxWidth:'20rem',
                },
               }}/> 
           <ul css={{
               display:'flex',
               flexDirection:'column',
               gap:'50px',
               flexBasis:'50%',
               [mq.small]:{
                    gap:'20px',
                },
               }}>
           <li>Release date: {release_date ?? 'unknown'}</li>
            <li>Budget: {budget ?? 'unknown'} $</li>
            <li>Length: {runtime ?? 'unknown'} min</li>
            <li>Site: {homepage?<a css={{textDecoration:'underline'}} href={homepage}>{homepage}</a>:'No site'}</li>
            <li>Description: {overview}</li>
            <div css={{
                width:'100px',
                height:'100px',
                margin:'auto',
                [mq.small]:{
                    width:'75px',
                    height:'75px',
                },
                }}>
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>  
           </ul>
        </div>
        </div>

    </section>
}

export {FilmScreen}

