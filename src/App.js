import 'normalize.css';
import './styles/css/style.css'
import {DiscoverScreen} from './screens/discover'
import {NotFoundScreen} from './screens/NotFoundScreen'
import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { fetchDiscover } from './redux/discover/discoverAcions';
import { connect } from 'react-redux'
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
import { GET_DISCOVER, GET_SEARCH_FILMS } from './redux/discover/discoverSearchTypes';

function NavLink(props){
  const match = useRouteMatch(props.to)
  return <Link className={`NavLink ${match ? 'NavLinkMatch' : ''}`}
  {...props} />
}

function App({data,fetchDiscover}) {
    function handleSubmit(event){
        event.preventDefault()
        if(event.target.search.value===''){
          fetchDiscover('&sort_by=popularity.desc',GET_DISCOVER)
        }else{
          fetchDiscover(`&query=${encodeURI(event.target.search.value)}`,GET_SEARCH_FILMS)
        }
        
    }
    React.useEffect(()=>{
      fetchDiscover('&sort_by=popularity.desc',GET_DISCOVER)
    },[fetchDiscover])
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
              <DiscoverScreen films={data.discover.data ?? null}/>}
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

const mapStateToProps = state => {
  return{
      data: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDiscover: (endpoint,type)=> dispatch(fetchDiscover(endpoint,type))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
