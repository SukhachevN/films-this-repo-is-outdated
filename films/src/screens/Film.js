/** @jsxImportSource @emotion/react */
import * as mq from '../styles/media-queries'
function Film({data}){
    console.log(data)
    const imagePath = 'https://image.tmdb.org/t/p/w500/'
    return (
        <div css={{
            [mq.small]:{
                flexBasis:'50%',
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
            <h2>{data.title}</h2>
            <img
                src={`${imagePath}${data.poster_path}`}
                alt={`${data.title} book cover`}
                css={{width: '100%', maxWidth: '14rem'}}
            />
            <p>{data.overview}</p>
        </div>
    )
}
export {Film}