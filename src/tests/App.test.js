/* eslint-disable no-global-assign */
import {
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { render } from "./render";
import { App } from "../screens/App";
import { generateGlobalState } from "./generate";

const discover = /https:\/\/api\.themoviedb\.org\/3\/discover.*/;
const info = /https:\/\/api\.themoviedb\.org\/3\/movie\/\d*\?api_key.*$/;
const video =
  /https:\/\/api\.themoviedb\.org\/3\/movie\/\d*\/videos\?api_key.*$/;
const globalState = generateGlobalState();
const film = globalState.filmInfo.info;
const favouriteKey = "favourite";
const watchLaterKey = "watchLater";
const originalFetch = window.fetch;
const emptyLocalStorage = { idList: [], dataList: [] };
const updatedLocalStorage = {
  idList: [film.id],
  dataList: [film],
};

const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

async function waitLoading() {
  const loading = screen.queryAllByText(/loading/i);
  if (loading.length > 0) {
    await waitForElementToBeRemoved(() => screen.getAllByText(/loading/i));
  }
}

function testFilmShortInfoInDocument() {
  expect(
    screen.getByRole("listitem", { name: film.title })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: film.title })).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: `${film.title} film poster` })
  ).toBeInTheDocument();
  expect(screen.getByText(film.overview)).toBeInTheDocument();
  expect(screen.queryAllByText(`${film.vote_average * 10}%`)).toHaveLength(1);
}

function testFilmShortInfoNotInDocument() {
  expect(
    screen.queryByRole("img", { name: `${film.title} poster` })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: film.title })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(`Description: ${film.overview}`)
  ).not.toBeInTheDocument();
  expect(screen.queryAllByText(`${film.vote_average * 10}%`)).not.toHaveLength(
    1
  );
}

async function testLocalStorage(key) {
  const route = "discover";
  window.history.pushState({}, "Test page", route);
  render(<App />);
  await waitLoading();
  const listName = key === "favourite" ? key : "watch later";
  let storage = getFromLocalStorage(key);
  expect(storage).toStrictEqual(emptyLocalStorage);
  fireEvent.click(screen.getByLabelText(`add to ${listName} list`));
  storage = getFromLocalStorage(key);
  expect(storage).toStrictEqual(updatedLocalStorage);
  fireEvent.click(screen.getByLabelText(`remove from ${listName} list`));
  storage = getFromLocalStorage(key);
  expect(storage).toStrictEqual(emptyLocalStorage);
}

async function testAddRemoveList(key) {
  const listName = key === "favourite" ? key : "watch later";
  const linkName = key === "favourite" ? /favourite/i : /watch later/i;
  window.history.pushState({}, "Test page", key);
  render(<App />);
  await waitLoading();
  testFilmShortInfoNotInDocument();
  fireEvent.click(screen.getByRole("link", { name: /discover/i }));
  await waitLoading();
  fireEvent.click(screen.getByLabelText(`add to ${listName} list`));
  fireEvent.click(screen.getByRole("link", { name: linkName }));
  await waitLoading();
  testFilmShortInfoInDocument();
  fireEvent.click(screen.getByLabelText(`remove from ${listName} list`));
  testFilmShortInfoNotInDocument();
}

beforeEach(() => {
  localStorage.clear();
});

fetch = async (link) => {
  if (link.match(discover)) {
    return {
      ok: true,
      json: () => globalState.discover.films,
    };
  }
  if (link.match(info)) {
    return {
      ok: true,
      json: () => globalState.filmInfo.info,
    };
  }
  if (link.match(video)) {
    return {
      ok: true,
      json: () => globalState.filmVideo.video,
    };
  }
  return originalFetch(link);
};

test("test that favourite films can be added/removed to/from localStorage", async () =>
  testLocalStorage(favouriteKey));

test("test that watchLater films can be added/removed to/from localStorage", async () =>
  testLocalStorage(watchLaterKey));

test("test that film can be added/removed to/from favourite list", async () =>
  testAddRemoveList(favouriteKey));

test("test that film can be added/removed to/from watchLater list", async () =>
  testAddRemoveList(watchLaterKey));

test("test that App display film info", async () => {
  const route = `discover`;
  window.history.pushState({}, "Test page", route);
  render(<App />);
  await waitLoading();
  fireEvent.click(screen.getByRole("heading", { name: film.title }));
  await waitLoading();
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
