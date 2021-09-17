import { memo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import filmPlaceHolder from "../img/image-placeholder.jpg";
import "react-circular-progressbar/dist/styles.css";
import { Like, WatchLater, Rating } from "../components/statusButtons";
import { comparator } from "../utils/comparator";
import { useGlobalState } from "../redux";

const imagePath = "https://image.tmdb.org/t/p/w300/";

function Film({ data }) {
  const { favourite: favouriteList, watchLater: watchLaterList } =
    useGlobalState();
  const inFavourite = favouriteList?.idList.includes(data.id);
  const inWatchLater = watchLaterList?.idList.includes(data.id);
  const dispatch = useDispatch();
  const filmImg = data.poster_path
    ? `${imagePath}${data.poster_path}`
    : filmPlaceHolder;
  return (
    <div className="Film" aria-label={data.title} role="listitem">
      <Link to={`films/${data.id}`}>
        <img
          src={filmImg}
          alt={`${data.title} film poster`}
          className="FilmImg"
        />
        <h2 className="FilmH2 OverFlowText">{data.title}</h2>
        <p className="FilmOverwiew OverFlowText">{data.overview}</p>
      </Link>
      <div className="StatusButtonsBlock">
        <Like dispatch={dispatch} inFavourite={inFavourite} info={data} />
        <Rating percentage={data?.vote_average * 10} />
        <WatchLater
          dispatch={dispatch}
          inWatchLater={inWatchLater}
          info={data}
        />
      </div>
    </div>
  );
}

Film = memo(Film, comparator);

export { Film };
