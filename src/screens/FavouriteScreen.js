import React from "react";
import { useSelector } from "react-redux";
import { Film } from "./Film";

function FavouriteScreen() {
  const state = useSelector((state) => state.favourite.dataList);
  const isStateEmpty = state.length === 0;
  return (
    <main>
      <div className="FilmContainer">
        {isStateEmpty && (
          <div className="NoFilms">
            Here you will see films, which you add to favourute
          </div>
        )}
        {!isStateEmpty &&
          state.map((film) => {
            return <Film data={film} key={film.id} />;
          })}
      </div>
    </main>
  );
}

export { FavouriteScreen };
