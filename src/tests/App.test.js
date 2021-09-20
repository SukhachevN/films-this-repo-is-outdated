import { screen, cleanup } from "@testing-library/react";
import * as reactRedux from "react-redux";
import * as fetchFilmInfo from "../redux/filmInfo/filmInfoActions";
import * as fetchFilmVideo from "../redux/filmVideo/filmVideoActions";
import { DiscoverScreen } from "../screens/DiscoverScreen";
import { FilmScreen } from "../screens/FilmScreen";
import { render } from "./render";
import * as selectors from "../redux/selectors";
import { generateFilmList, generateGlobalState } from "./generate";

afterEach(() => {
  cleanup();
});

test("test that DiscoverScreen display films", () => {
  const fakeFilms = generateFilmList();
  const film = fakeFilms.results[0];
  jest.spyOn(selectors, "useDiscover").mockImplementation(() => ({
    loading: false,
    films: fakeFilms,
  }));
  render(<DiscoverScreen />);
  expect(
    screen.getByRole("listitem", { name: film.title })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: film.title })).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: `${film.title} film poster` })
  ).toBeInTheDocument();
  expect(screen.getByText(film.overview)).toBeInTheDocument();
  expect(screen.queryAllByText(`${film.vote_average * 10}%`)).toHaveLength(1);
});

test("test that FilmScreen display film info", () => {
  const globalState = generateGlobalState();
  const film = globalState.filmInfo.info;
  jest.spyOn(selectors, "useGlobalState").mockImplementation(() => globalState);
  jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => () => {});
  jest.spyOn(fetchFilmInfo, "fetchFilmInfo").mockImplementation(() => () => {});
  jest
    .spyOn(fetchFilmVideo, "fetchFilmVideo")
    .mockImplementation(() => () => {});
  render(<FilmScreen />);
  expect(
    screen.getByRole("img", { name: `${film.title} poster` })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: film.title })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: film.homepage })).toBeInTheDocument();
  expect(screen.getByText(`Description: ${film.overview}`)).toBeInTheDocument();
  expect(screen.getByText(`Length: ${film.runtime} min`)).toBeInTheDocument();
  expect(screen.getByText(`Budget: ${film.budget} $`)).toBeInTheDocument();
  expect(screen.queryAllByText(`${film.vote_average * 10}%`)).toHaveLength(1);
});
