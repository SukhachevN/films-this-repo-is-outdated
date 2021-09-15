import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDiscover, GET_DISCOVER, GET_SEARCH_FILMS } from "../../redux";
import { loadApp } from "../../redux/app";
import { initializeFavourite } from "../../redux/favourite";
import { initializeWatchLater } from "../../redux/watchLater";
import { AppView } from "./AppView";

function AppContainer() {
  const data = useSelector((state) => state);
  const { initialized } = data.app;
  const dispatch = useDispatch();
  function handleSubmit(event) {
    event.preventDefault();
    if (event.target.search.value === "") {
      dispatch(fetchDiscover("&sort_by=popularity.desc", GET_DISCOVER));
    } else {
      dispatch(
        fetchDiscover(
          `&query=${encodeURI(event.target.search.value)}`,
          GET_SEARCH_FILMS
        )
      );
    }
  }
  useEffect(() => {
    dispatch(loadApp());
  }, []);
  useEffect(() => {
    console.log(initialized && data.app.favourite);
    if (initialized) {
      dispatch(initializeFavourite(data.app.favourite));
      dispatch(initializeWatchLater(data.app.watchLater));
    }
  }, [initialized]);
  useEffect(() => {
    dispatch(fetchDiscover("&sort_by=popularity.desc", GET_DISCOVER));
  }, [dispatch]);
  if (data.app.loading) {
    return <div>loading</div>;
  }
  return <AppView handleSubmit={handleSubmit} data={data.discover} />;
}

export { AppContainer };
