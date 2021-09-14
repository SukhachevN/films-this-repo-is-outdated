import "normalize.css";
import "../../styles/css/style.css";
import { DiscoverScreen } from "../DiscoverScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLink } from "../../components/NavLink";
import { FaSearch } from "react-icons/fa";
import { FavouriteScreen } from "../FavouriteScreen";
import { WatchLaterScreen } from "../WatchLaterScreen";
import { FilmScreen } from "../FilmScreen";
import { NotFoundScreen } from "../NotFoundScreen";

function AppView({ handleSubmit, data }) {
  return (
    <div className='container'>
      <Router>
        <header className='Header'>
          <nav className='HeaderNav'>
            <NavLink to='/discover'>Discover</NavLink>
            <NavLink to='/favourite'>Favourite</NavLink>
            <NavLink to='/watchLater'>Watch later</NavLink>
          </nav>
          <form onSubmit={handleSubmit} className='SearchForm'>
            <input
              className='SearchInput'
              placeholder='Search film...'
              id='search'
              type='search'
            />
            <label htmlFor='search' className='SearchLabel'>
              <button type='submit' className='SearchButton'>
                <FaSearch aria-label='search' />
              </button>
            </label>
          </form>
        </header>
        <Switch>
          <Route exact path='/discover'>
            {data.error ? (
              <div className='ErrorMessage'>{data.error.message}</div>
            ) : (
              <DiscoverScreen />
            )}
          </Route>
          <Route path='/favourite'>
            <FavouriteScreen />
          </Route>
          <Route path='/watchLater'>
            <WatchLaterScreen />
          </Route>
          <Route path='/films/:filmId'>
            <FilmScreen />
          </Route>
          <Route path='*'>
            <NotFoundScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export { AppView };
