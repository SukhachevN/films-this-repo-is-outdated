import { FilmScreenView } from "./FilmScreenView";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NotFoundScreen } from "../NotFoundScreen";
import { fetchFilmInfo } from "../../redux/filmInfo/filmInfoActions";
import { fetchFilmVideo } from "../../redux/filmVideo/filmVideoActions";

function FilmScreenContainer() {
  const { filmId } = useParams();
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const inFavourite = data?.favourite.idList.includes(data.filmInfo.info?.id);
  const inWatchLater = data?.watchLater.idList.includes(data.filmInfo.info?.id);

  useEffect(() => {
    dispatch(fetchFilmInfo(filmId));
    dispatch(fetchFilmVideo(filmId));
  }, [dispatch, filmId]);
  if (data.filmInfo.error) {
    return (
      <div className='ErrorBlockFilmScreen'>
        <p className='ErrorMessage ErrorMessageFilmScreen'>
          {data.filmInfo.error ? data.filmInfo.error.status_message : null}
        </p>
        <NotFoundScreen />
      </div>
    );
  }
  if (data.filmInfo.info === null || data.filmVideo?.video === null) {
    return <FilmScreenView />;
  }
  return (
    <FilmScreenView
      data={data}
      inFavourite={inFavourite}
      inWatchLater={inWatchLater}
      dispatch={dispatch}
    />
  );
}

export { FilmScreenContainer };
