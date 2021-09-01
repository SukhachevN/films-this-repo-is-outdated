/** @jsxImportSource @emotion/react */
import * as mq from '../styles/media-queries'
import * as colors from '../styles/colors'
import filmPlaceHolder from '../img/image-placeholder.jpg'
import { CircularProgressbar } from 'react-circular-progressbar';
import {
    Link
  } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
function Film({data}){
    console.log(data)
    const imagePath = 'https://image.tmdb.org/t/p/original/'
    const filmImg = data.poster_path?`${imagePath}${data.poster_path}`:filmPlaceHolder
    const percentage = data.vote_average*10
    return (
        <Link to={`films/${data.id}`} 
        css={{
            border:`1px solid ${colors.gray}`,
            borderRadius:'20px',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            padding:'20px',
            [mq.small]:{
                flexBasis:'40%',
            },
            [mq.medium]:{
                flexBasis:'33%',
            },
            [mq.large]:{
                flexBasis:'25%',
            },
            [mq.extraLarge]:{
                flexBasis:'20%',
            }
        }}>
            <div>
                <img
                    src={filmImg}
                    alt={`${data.title} book cover`}
                    css={{
                        width: '100%', maxWidth: '20rem',height:'300px',
                        }}
                />
                <h2 
                css={{height:'50px',display:'-webkit-box',
                    textOverflow:'ellipsis',
                    overflow:'hidden',
                    WebkitLineClamp:'2',
                    WebkitBoxOrient:'vertical'}}>
                    {data.title}</h2>
                <p css={{
                    paddingTop:'25px',
                    display:'-webkit-box',
                    textOverflow:'ellipsis',
                    overflow:'hidden',
                    WebkitLineClamp:'4',
                    WebkitBoxOrient:'vertical',
                }}>{data.overview}</p>
                <div css={{width:'60px',height:'60px',padding:'10px 0', margin:'auto'}}>
                    <CircularProgressbar value={percentage} text={`${percentage}%`} />
                </div>     
            </div>
        </Link>
    )
}
export {Film}