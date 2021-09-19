import "normalize.css";
import "../../styles/css/style.css";
import { memo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DiscoverScreen } from "../DiscoverScreen";
import { NavLink } from "../../components/NavLink";
import { FavouriteScreen } from "../FavouriteScreen";
import { WatchLaterScreen } from "../WatchLaterScreen";
import { FilmScreen } from "../FilmScreen";
import { NotFoundScreen } from "../NotFoundScreen";
import { comparator } from "../../utils/comparator";
import { SearchForm } from "../../components/SearchForm";

function AppView({ handleSubmit, data }) {
  return (
    <div className="container">
      <Router>
        <header className="Header">
          <nav className="HeaderNav">
            <NavLink to="/discover">Discover</NavLink>
            <NavLink to="/favourite">Favourite</NavLink>
            <NavLink to="/watchLater">Watch later</NavLink>
          </nav>
        </header>
        <Switch>
          <Route exact path="/discover">
            {data.error ? (
              <div className="ErrorMessage">{data.error.message}</div>
            ) : (
              <div className="PageContent">
                <SearchForm handleSubmit={handleSubmit} />
                <DiscoverScreen />
              </div>
            )}
          </Route>
          <Route path="/favourite">
            <div className="PageContent">
              <div className="PageDescription">
                Here you will see films, which you add to favourite
              </div>
              <FavouriteScreen />
            </div>
          </Route>
          <Route path="/watchLater">
            <div className="PageContent">
              <div className="PageDescription">
                Here you will see films, which you add to watch later list
              </div>
              <WatchLaterScreen />
            </div>
          </Route>
          <Route path="/films/:filmId">
            <FilmScreen />
          </Route>
          <Route path="*">
            <div className="PageContent">
              <NotFoundScreen />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

AppView = memo(AppView, comparator);

export { AppView };
