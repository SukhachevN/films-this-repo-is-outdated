/** @jsxImportSource @emotion/react */
import * as mq from '../styles/media-queries'
import * as colors from '../styles/colors'
import filmPlaceHolder from '../img/image-placeholder.jpg'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function Film({data}){
    console.log(data)
    const imagePath = 'https://image.tmdb.org/t/p/original/'
    const filmImg = data.poster_path?`${imagePath}${data.poster_path}`:filmPlaceHolder
    const percentage = data.vote_average*10
    return (
        <div css={{
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
            <img
                src={filmImg}
                alt={`${data.title} book cover`}
                css={{
                    width: '100%', maxWidth: '20rem',height:'300px',
                    }}
            />
            <h2 css={{height:'100px',padding:'25px 0'}}>{data.title}</h2>
            <p css={{
                display:'-webkit-box',
                textOverflow:'ellipsis',
                overflow:'hidden',
                WebkitLineClamp:'4',
                WebkitBoxOrient:'vertical',
            }}>{data.overview}</p>
            <div css={{width:'60px',height:'60px',padding:'10px 0'}}>
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>  
            
            
        </div>
    )
}
export {Film}