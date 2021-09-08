import 'normalize.css';
import './styles/css/style.css'
import {DiscoverScreen} from './screens/discover'
import {NotFoundScreen} from './screens/NotFoundScreen'
import React from 'react'
import {getSearchFilms,getDiscoverFilms} from './utils/api-client'
import {FaSearch} from 'react-icons/fa'
import { useAsync } from './utils/hooks'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { FilmScreen } from './screens/FilmScreen'
import { FavouriteScreen } from './screens/favourite'
import { WatchLaterScreen } from './screens/watchLater'

function NavLink(props){
  const match = useRouteMatch(props.to)
  return <Link className={`NavLink ${match ? 'NavLinkMatch' : ''}`}
  {...props} />
}

function App() {
  const {data:films,run,isError,error} = useAsync()
    async function handleSubmit(event){
        event.preventDefault()
        if(event.target.search.value===''){
          run(getDiscoverFilms('&sort_by=popularity.desc'))
        }else{
          run(getSearchFilms(`&query=${encodeURI(event.target.search.value)}`))
        }
        
    }
    React.useEffect(()=>{
      run(getDiscoverFilms('&sort_by=popularity.desc'))
    },[run])
  return (
    <div className='container'>
        <Router>
        <header className='Header'>
          <nav className='HeaderNav'>
              <NavLink to="/discover">Discover</NavLink>
              <NavLink to="/favourite">Favourite</NavLink>
              <NavLink to="/watchLater">Watch later</NavLink>
          </nav>
            <form onSubmit={handleSubmit} className ='SearchForm'>
            <input className='SearchInput'
              placeholder='Search film...'
              id="search"
              type="search"
             />
                <label htmlFor="search"  className = 'SearchLabel'>
                  <button type="submit" className='SearchButton'>
                    <FaSearch aria-label="search" />
                  </button>
                </label>
        </form>
        </header>
          <Switch>
              <Route exact path="/discover">
              {isError 
              ? <div className = 'ErrorMessage'>{error.message}</div> : 
              <DiscoverScreen films={films}/>}
              </Route>
              <Route path="/favourite">
                <FavouriteScreen/>
              </Route>
              <Route path="/watchLater">
                <WatchLaterScreen/>
              </Route>
              <Route path="/films/:filmId">
                <FilmScreen/>
              </Route>
              <Route path="*">
                <NotFoundScreen />
              </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
