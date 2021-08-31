/** @jsxImportSource @emotion/react */
import {Container,Input} from './components/lib'
import {DiscoverScreen} from './screens/discover'
import React from 'react'
import {searchFilm} from './utils/films'
import * as colors from './styles/colors'
import {FaSearch} from 'react-icons/fa'

function App() {
  const [films,setFilms] = React.useState()
    async function handleSubmit(event){
        event.preventDefault()
        setFilms(await searchFilm(event.target.search.value))
    }
  return (
    <Container>
        <header css={{margin:'0 auto 50px 0',width:'100%'}}>
          <div css={{display:'flex',justifyContent:'center',gap:'20px',padding:'40px 0'}}>
            <div>Discover</div>
            <div>Favourite</div>
            <div>Watch later</div>
          </div>
            <form onSubmit={handleSubmit} css={{
                display:'flex',width:'100%',justifyContent:'center'
                }}>
            <Input
             placeholder='Search film...'
             id="search"
             type="search"
             />
                <label htmlFor="search"  css={{display:'flex'}}>
                <button
                    type="submit"
                    css={{
                    border: `1px solid ${colors.gray10}`,
                    borderRadius:'0 3px 3px 0',
                    position: 'relative',
                    background: colors.gray,
                    width:'40px',
                    cursor:'pointer'
                    }}
                >
                <FaSearch aria-label="search" />
                </button>
                </label>
        </form>
        </header>
        <DiscoverScreen films={films}/>
    </Container>
  );
}

export default App;
