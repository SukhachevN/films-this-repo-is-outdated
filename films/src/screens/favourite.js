/** @jsxImportSource @emotion/react */
import {useSelector, useDispatch} from 'react-redux'
import {Film} from './Film'
function FavouriteScreen(){
    const state = useSelector(state=>state.favourite.dataList)
    return(
        <main>
          <div css={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>
            {state.length === 0 
            ? 'Here you will see films, which you add to favourute' 
            : state.map(film =>{
                    return <Film data={film} key={film.id}/>
                }) }     
          </div>  
        </main>
    )
}

export {FavouriteScreen}