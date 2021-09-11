import {screen } from '@testing-library/react';
import { DiscoverScreen } from '../screens/discover';
import {render} from './render'
import faker from 'faker'
import { Film } from '../screens/FilmScreen';

const fakeFilmInfo = {
  results: [{
    id: faker.datatype.number(),
    title: faker.lorem.words(),
    overview: faker.lorem.paragraph(),
    vote_average: faker.datatype.number({
      'min': 0,
      'max': 10
    }),
    budget: faker.datatype.number({
      'min': 1000,
      'max': 100000000
    }),
    release_date: faker.date.between('1900-01-01', '2021-01-01').toLocaleString(),
    runtime: faker.datatype.number({
      'min': 10,
      'max': 400
    }),
    homepage:faker.internet.url()
 }]
}

test('film list', () => {
  const film = fakeFilmInfo.results[0]
  render(<DiscoverScreen films={fakeFilmInfo}/>);
  expect(screen.getByRole('listitem', { name: film.title})).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: film.title })).toBeInTheDocument()
  expect(screen.getByRole('img',{name:`${film.title} film poster`})).toBeInTheDocument()
  expect(screen.getByText(film.overview)).toBeInTheDocument()
  expect(screen.queryAllByText(`${film.vote_average*10}%`)).toHaveLength(1)
});

test('film info', () => {
  const film = fakeFilmInfo.results[0]
  render(<Film {...fakeFilmInfo.results[0]}/>);
  expect(screen.getByRole('img',{name:`${film.title} poster`})).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: film.title })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: film.homepage })).toBeInTheDocument()
  expect(screen.getByText(`Description: ${film.overview}`)).toBeInTheDocument()
  expect(screen.getByText(`Length: ${film.runtime} min`)).toBeInTheDocument()
  expect(screen.getByText(`Budget: ${film.budget} $`)).toBeInTheDocument()
});




