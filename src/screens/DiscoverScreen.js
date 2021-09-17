import { loadingFilm } from "../components/loadingFilm";
import { useDiscover } from "../redux";
import { Film } from "./Film";
import { NotFoundScreen } from "./NotFoundScreen";

function DiscoverScreen() {
  const { films, loading } = useDiscover();
  if (films?.results?.length === 0) {
    return <NotFoundScreen />;
  }
  const loadingFilms = Array(20).fill(loadingFilm);
  return (
    <main>
      <div className="FilmContainer">
        {loading &&
          loadingFilms.map((film, index) => <Film data={film} key={index} />)}
        {!loading &&
          films &&
          films.results.map((film) => <Film data={film} key={film.id} />)}
      </div>
    </main>
  );
}
export { DiscoverScreen };
