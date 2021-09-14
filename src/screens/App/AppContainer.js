import { useEffect } from "react";
import { fetchDiscover } from "../../redux/discover/discoverAcions";
import {
  GET_DISCOVER,
  GET_SEARCH_FILMS,
} from "../../redux/discover/discoverTypes";
import { useSelector, useDispatch } from "react-redux";
import { AppView } from "./AppView";

function AppContainer() {
  const data = useSelector((state) => state.discover);
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
    dispatch(fetchDiscover("&sort_by=popularity.desc", GET_DISCOVER));
  }, [dispatch]);
  return <AppView handleSubmit={handleSubmit} data={data} />;
}

export { AppContainer };
