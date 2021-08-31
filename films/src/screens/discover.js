/** @jsxImportSource @emotion/react */
import {Input} from '../components/lib'
import {FaSearch} from 'react-icons/fa'
import {searchFilm} from '../utils/films'
import {Film} from './Film'
import React from 'react'



function DiscoverScreen(){
    const [films,setFilms] = React.useState()
    async function handleSubmit(event){
        event.preventDefault()
        setFilms(await searchFilm(event.target.search.value))
    }
    return (
        <div>
          <div css={{margin:'0 auto'}}>
            <form onSubmit={handleSubmit} css={{display:'flex',width:'100%'}}>
            <Input
             placeholder='Search film...'
             id="search"
             type="search"
             />
                <label htmlFor="search"  css={{display:'flex'}}>
                <button
                    type="submit"
                    css={{
                    border: '0',
                    position: 'relative',
                    marginLeft: '-35px',
                    background: 'transparent',
                    }}
                >
                <FaSearch aria-label="search" />
                </button>
                </label>
        </form>
        </div>
          <div css={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
                {films ? films.results.map(film =>{
                    return <Film data={film} key={film.id}/>
                }):null }
          </div>  
        </div>
    )
}
export {DiscoverScreen}