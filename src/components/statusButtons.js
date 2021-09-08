
import React from "react";
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

export {Like,WatchLater,WatchVideo}