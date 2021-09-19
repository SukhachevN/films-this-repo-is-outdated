import { useFavourute } from "../redux";
import { Film } from "./Film";

function FavouriteScreen() {
  const { dataList: films } = useFavourute();
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
