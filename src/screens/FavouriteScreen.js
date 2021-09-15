import { useSelector } from "react-redux";
import { Film } from "./Film";

function FavouriteScreen() {
  const films = useSelector((state) => state.favourite.dataList);
  return (
    <main>
      <div className="FilmContainer">
        {films.map((film) => (
          <Film data={film} key={film.id} />
        ))}
      </div>
    </main>
  );
}

export { FavouriteScreen };
