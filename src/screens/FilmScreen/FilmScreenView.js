import filmPlaceHolder from "../../img/image-placeholder.jpg";
import { loadingFilm } from "../../components/loadingFilm";
import {
  Like,
  WatchLater,
  WatchVideo,
  Rating,
} from "../../components/statusButtons";

const loadingData = {
  filmInfo: {
    info: {
      ...loadingFilm,
    },
  },
};

function FilmScreenView({
  data = loadingData,
  dispatch,
  inFavourite,
  inWatchLater,
}) {
  const {
    title,
    overview,
    release_date,
    budget,
    runtime,
    poster_path,
    homepage,
  } = data.filmInfo.info;
  const imagePath = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : filmPlaceHolder;
  const haveBudget = Boolean(budget);
  return (
    <section className="FilmScreenSection">
      <h1 className="FilmScreenH1">{title}</h1>
      <div className="FilmScreenContent">
        <img
          src={imagePath}
          alt={`${title} poster`}
          className="FilmScreenImg"
        />
        <ul className="FilmScreenPropertiesList">
          <li>Release date: {release_date || "unknown"}</li>
          <li>Budget: {haveBudget ? `${budget} $` : "unknown"}</li>
          <li>Length: {runtime || "unknown"} min</li>
          <li>
            Site:{" "}
            {homepage ? (
              <a className="SiteLink" href={homepage}>
                {homepage}
              </a>
            ) : (
              "No site"
            )}
          </li>
          <li>Description: {overview}</li>
          <div className="StatusButtonsBlock StatusButtonBlockFilmScreen">
            <Like
              dispatch={dispatch}
              inFavourite={inFavourite}
              info={data?.filmInfo?.info}
              isFilmScreen="true"
            />
            <WatchLater
              dispatch={dispatch}
              inWatchLater={inWatchLater}
              info={data?.filmInfo?.info}
              isFilmScreen="true"
            />
            <WatchVideo
              VideoKey={data?.filmVideo?.video?.results[0]?.key}
              isFilmScreen="true"
            />
          </div>
          <Rating
            percentage={data?.filmInfo?.info?.vote_average * 10}
            isFilmScreen="true"
          />
        </ul>
      </div>
    </section>
  );
}

export { FilmScreenView };
