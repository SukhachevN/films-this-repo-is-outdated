/** @jsxImportSource @emotion/react */
import { loadingFilm } from '../components/loadingFilm'
import {Film} from './Film'
import {NotFoundScreen} from './NotFoundScreen'

function DiscoverScreen({films}){
    if(films?.results?.length===0){
        return <NotFoundScreen />
    }
    const loadingFilms = Array(20).fill(loadingFilm,0,19)
    return (
        <main>
          <div css={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>
                {films ? films.results.map(film =>{
                    return <Film data={film} key={film.id}/>
                }):loadingFilms.map((film,index) =>{
                    return <Film data={film} key={index}/>
                }) }
          </div>  
        </main>
    )
}
export {DiscoverScreen}