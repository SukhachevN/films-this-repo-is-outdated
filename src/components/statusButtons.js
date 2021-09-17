import React, { memo } from "react";
import {
  BsFillHeartFill,
  BsFillClockFill,
  BsDisplayFill,
} from "react-icons/bs";
import { CircularProgressbar } from "react-circular-progressbar";
import { addToFavourite, removeFromFavourite } from "../redux/favourite";
import { addToWatchLater, removeFromWatchLater } from "../redux/watchLater";
import { comparator } from "../utils/comparator";
import * as colors from "../styles/colors";

function Heart(props) {
  return <BsFillHeartFill {...props} />;
}

function Clock(props) {
  return <BsFillClockFill {...props} />;
}

function TV(props) {
  return <BsDisplayFill {...props} />;
}

function Rate(props) {
  return <CircularProgressbar {...props} />;
}

Heart = memo(Heart, comparator);
Clock = memo(Clock, comparator);
TV = memo(TV, comparator);
Rate = memo(Rate, comparator);

function Like({ dispatch, inFavourite, info, isFilmScreen = false }) {
  return (
    <button
      className="StatusButton"
      onClick={() =>
        info.id
          ? dispatch(
              inFavourite ? removeFromFavourite(info) : addToFavourite(info)
            )
          : null
      }
    >
      <Heart
        aria-label="add to favourite"
        size={isFilmScreen ? "2.5rem" : "2rem"}
        color={inFavourite ? colors.red : colors.gray80}
      />
    </button>
  );
}

function WatchLater({ dispatch, inWatchLater, info, isFilmScreen = false }) {
  return (
    <button
      className="StatusButton"
      onClick={() =>
        info.id
          ? dispatch(
              inWatchLater ? removeFromWatchLater(info) : addToWatchLater(info)
            )
          : null
      }
    >
      <Clock
        aria-label="add to watch later list"
        size={isFilmScreen ? "2.5rem" : "2rem"}
        color={inWatchLater ? colors.brightGreen : colors.gray80}
      />
    </button>
  );
}

function WatchVideo({ VideoKey, isFilmScreen = false }) {
  if (!VideoKey) {
    return null;
  }
  return (
    <button className="StatusButton">
      {VideoKey ? (
        <a href={`https://www.youtube.com/watch?v=${VideoKey}`}>
          <TV size={isFilmScreen ? "2.5rem" : "2rem"} color={colors.gray80} />
        </a>
      ) : null}
    </button>
  );
}

function Rating({ percentage = 0, isFilmScreen = false }) {
  return (
    <div
      className={`ProgressBar ${isFilmScreen ? "ProgressBarFilmScreen" : ""}`}
    >
      <Rate value={percentage} text={`${percentage}%`} />
    </div>
  );
}

Like = memo(Like, comparator);
WatchLater = memo(WatchLater, comparator);
WatchVideo = memo(WatchVideo, comparator);
Rating = memo(Rating, comparator);

export { Like, WatchLater, WatchVideo, Rating };
