/** @jsxImportSource @emotion/react */
import {Film} from './Film'
import {NotFoundScreen} from './NotFoundScreen'

function DiscoverScreen({films}){
    if(films?.results?.length===0){
        return <NotFoundScreen />
    }
    return (
        <main>
          <div css={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>
                {films ? films.results.map(film =>{
                    return <Film data={film} key={film.id}/>
                }):null }
          </div>  
        </main>
    )
}
export {DiscoverScreen}