/** @jsxImportSource @emotion/react */
import { BsFillHeartFill,BsFillClockFill,BsDisplayFill } from "react-icons/bs";

function Like(props){
    return <BsFillHeartFill aria-label='add to favourite' {...props}/>
}

function WatchLater(props){
    return <BsFillClockFill aria-label='add to watch later list' {...props}/>
}

function WatchVideo(props){
    return <BsDisplayFill aria-label='watch movie trailer' {...props}/>
}

function StatusButton(props){
    return <button css={{
        border:'none',
        background:'transparent',
        cursor:'pointer',
    }} {...props}/>
}

export {Like,WatchLater,WatchVideo,StatusButton}