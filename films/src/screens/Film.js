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
            margin: "0 20px",
            padding:'20px',
            [mq.small]:{
                flexBasis:'100%',
                padding:'30px'
            },
            [mq.medium]:{
                flexBasis:'40%',
            },
            [mq.large]:{
                flexBasis:'25%',
            },
            [mq.extraLarge]:{
                flexBasis:'20%',
            }
        }}>
            <div >
                <img
                    src={filmImg}
                    alt={`${data.title} book cover`}
                    css={{
                         width: '100%',
                         maxWidth: '20rem',
                         height:'100%',
                         maxHeight:'20rem',
                         paddingBottom:'30px',
                         margin:'0 auto',
                         display:'flex',
                         [mq.small]:{
                            maxHeight:'25rem',
                          },

                        }}
                />
                <h2 
                css={{
                    height:'60px',
                    display:'-webkit-box',
                    lineHeight:"1.2",
                    textOverflow:'ellipsis',
                    overflow:'hidden',
                    WebkitLineClamp:'2',
                    WebkitBoxOrient:'vertical'}}>
                    {data.title}</h2>
                <p css={{
                    paddingTop:'10px',
                    display:'-webkit-box',
                    textOverflow:'ellipsis',
                    overflow:'hidden',
                    WebkitLineClamp:'4',
                    WebkitBoxOrient:'vertical',
                    height:'85px'
                }}>{data.overview}</p>
                <div css={{
                    width:'60px',
                    height:'60px',
                    padding:'10px 0', 
                    margin:'30px auto',
                    [mq.small]:{
                        width:'80px',
                        height:'80px',
                    },
                    }}>
                    <CircularProgressbar value={percentage} text={`${percentage}%`} />
                </div>     
            </div>
        </Link>
    )
}
export {Film}