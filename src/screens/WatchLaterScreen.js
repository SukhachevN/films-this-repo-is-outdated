import { useWatchLater } from "../redux";
import { Film } from "./Film";

function WatchLaterScreen() {
  const { dataList: films } = useWatchLater();
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
