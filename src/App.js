import 'normalize.css';
import './styles/css/style.css'
import {DiscoverScreen} from './screens/discover'
import {NotFoundScreen} from './screens/NotFoundScreen'
import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { fetchDiscover } from './redux/discover/discoverAcions';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import FilmScreen from './screens/FilmScreen'
import { FavouriteScreen } from './screens/favourite'
import { WatchLaterScreen } from './screens/watchLater'
import { GET_DISCOVER, GET_SEARCH_FILMS } from './redux/discover/discoverTypes';
import {useSelector, useDispatch} from 'react-redux'

function NavLink(props){
  const match = useRouteMatch(props.to)
  return <Link className={`NavLink ${match ? 'NavLinkMatch' : ''}`}
  {...props} />
}

function App() {
  const data = useSelector(state => state)
  const dispatch = useDispatch()
    function handleSubmit(event){
        event.preventDefault()
        if(event.target.search.value===''){
          dispatch(fetchDiscover('&sort_by=popularity.desc',GET_DISCOVER))
        }else{
          dispatch(fetchDiscover(`&query=${encodeURI(event.target.search.value)}`,GET_SEARCH_FILMS))
        }
        
    }
    React.useEffect(()=>{
      dispatch(fetchDiscover('&sort_by=popularity.desc',GET_DISCOVER))
    },[dispatch])
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
              {data.discover.error 
              ? <div className = 'ErrorMessage'>{data.discover.error.message}</div> : 
              <DiscoverScreen films={data.discover.films ?? null}/>}
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
