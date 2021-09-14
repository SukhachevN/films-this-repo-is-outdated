import React from "react";
import { useSelector } from "react-redux";
import Film from "./Film";
function FavouriteScreen() {
  const state = useSelector((state) => state.favourite.dataList);
  return (
    <main>
      <div className='FilmContainer'>
        {state.length === 0
          ? "Here you will see films, which you add to favourute"
          : state.map((film) => {
              return <Film data={film} key={film.id} />;
            })}
      </div>
    </main>
  );
}

export { FavouriteScreen };
