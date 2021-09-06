/** @jsxImportSource @emotion/react */
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Film} from './Film'
function WatchLaterScreen(){
    const state = useSelector(state=>state.watchLater.dataList)
    return(
        <main>
          <div css={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>
            {state.length === 0 
            ? 'Here you will see films, which you add to watch later list' 
            : state.map(film =>{
                    return <Film data={film} key={film.id}/>
                }) }     
          </div>  
        </main>
    )
}

export {WatchLaterScreen}