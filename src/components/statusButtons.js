import React, { memo } from "react";
import {
  BsFillHeartFill,
  BsFillClockFill,
  BsDisplayFill,
} from "react-icons/bs";
import classNames from "classnames";
import { CircularProgressbar } from "react-circular-progressbar";
import { addToFavourite, removeFromFavourite } from "../redux/favourite";
import { addToWatchLater, removeFromWatchLater } from "../redux/watchLater";
import { comparator } from "../utils/comparator";
import * as colors from "../styles/colors";

const Heart = memo((props) => <BsFillHeartFill {...props} />, comparator);
const Clock = memo((props) => <BsFillClockFill {...props} />, comparator);
const TV = memo((props) => <BsDisplayFill {...props} />, comparator);
const Rate = memo((props) => <CircularProgressbar {...props} />, comparator);

const Like = memo(({ dispatch, inFavourite, info, isFilmScreen = false }) => {
  const dispatchFun = inFavourite
    ? removeFromFavourite(info)
    : addToFavourite(info);
  const onClick = () => (info.id ? dispatch(dispatchFun) : null);
  const ariaLabel = classNames(
    { "remove from": inFavourite },
    { "add to": !inFavourite },
    "favourite list"
  );

  return (
    <button className="StatusButton" onClick={onClick} aria-label={ariaLabel}>
      <Heart
        size={isFilmScreen ? "2.5rem" : "2rem"}
        color={inFavourite ? colors.red : colors.gray80}
      />
    </button>
  );
}, comparator);

const WatchLater = memo(
  ({ dispatch, inWatchLater, info, isFilmScreen = false }) => {
    const dispatchFun = inWatchLater
      ? removeFromWatchLater(info)
      : addToWatchLater(info);
    const onClick = () => (info.id ? dispatch(dispatchFun) : null);
    const ariaLabel = classNames(
      { "remove from": inWatchLater },
      { "add to": !inWatchLater },
      "watch later list"
    );

    return (
      <button className="StatusButton" onClick={onClick} aria-label={ariaLabel}>
        <Clock
          size={isFilmScreen ? "2.5rem" : "2rem"}
          color={inWatchLater ? colors.brightGreen : colors.gray80}
        />
      </button>
    );
  },
  comparator
);

const WatchVideo = memo(
  ({ videoKey, isFilmScreen = false }) =>
    Boolean(videoKey) && (
      <button className="StatusButton">
        <a href={`https://www.youtube.com/watch?v=${videoKey}`}>
          <TV size={isFilmScreen ? "2.5rem" : "2rem"} color={colors.gray80} />
        </a>
      </button>
    ),
  comparator
);

const Rating = memo(
  ({ percentage = 0, isFilmScreen = false }) => (
    <div
      className={classNames("ProgressBar", {
        ProgressBarFilmScreen: isFilmScreen,
      })}
    >
      <Rate value={percentage} text={`${percentage}%`} />
    </div>
  ),
  comparator
);

export { Like, WatchLater, WatchVideo, Rating };
