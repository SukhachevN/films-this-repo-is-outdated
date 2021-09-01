/** @jsxImportSource @emotion/react */
import {Container,Input} from './components/lib'
import {DiscoverScreen} from './screens/discover'
import {NotFoundScreen} from './screens/NotFoundScreen'
import React, { useEffect } from 'react'
import {searchFilm} from './utils/films'
import * as colors from './styles/colors'
import {FaSearch} from 'react-icons/fa'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { FilmScreen } from './screens/FilmScreen'

//const preloadFilms = searchFilm('&sort_by=popularity.desc',true)

function App() {
  const [films,setFilms] = React.useState()
    async function handleSubmit(event){
        event.preventDefault()
        setFilms(await searchFilm(`&query=${event.target.search.value}`))
    }
  return (
    <Container>
        <Router>
        <header css={{margin:'0 auto 50px 0',width:'100%'}}>
          <nav css={{display:'flex',justifyContent:'center',gap:'20px',padding:'40px 0'}}>
              <Link to="/discover">Discover</Link>
              <Link to="/favourite">Favourite</Link>
              <Link to="/watchLater">Watch later</Link>
          </nav>
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
                    background: colors.blue,
                    width:'40px',
                    cursor:'pointer'
                    }}
                >
                <FaSearch aria-label="search" />
                </button>
                </label>
        </form>
        </header>
          <Switch>
              <Route exact path="/discover">
                <DiscoverScreen films={films}/>
              </Route>
              <Route path="/favourite">
                <div>Favourite</div>
              </Route>
              <Route path="/watchLater">
                <div>Watch later</div>
              </Route>
              <Route path="/films/:filmId">
                <FilmScreen/>
              </Route>
              <Route path="*">
                <NotFoundScreen />
              </Route>
          </Switch>
        </Router>
    </Container>
  );
}

export default App;
