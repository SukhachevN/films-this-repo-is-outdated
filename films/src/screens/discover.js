/** @jsxImportSource @emotion/react */
import {Film} from './Film'

function DiscoverScreen({films}){
    console.log(films)
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