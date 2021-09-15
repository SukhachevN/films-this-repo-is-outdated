import { useSelector } from "react-redux";
import { Film } from "./Film";

function WatchLaterScreen() {
  const films = useSelector((state) => state.watchLater.dataList);
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

export { WatchLaterScreen };
