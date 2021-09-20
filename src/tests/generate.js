import faker from "faker";

function generateFilmList() {
  const results = [
    {
      id: faker.datatype.number(),
      title: faker.lorem.words(),
      overview: faker.lorem.paragraph(),
      vote_average: faker.datatype.number({
        min: 0,
        max: 10,
      }),
      budget: faker.datatype.number({
        min: 1000,
        max: 100000000,
      }),
      release_date: faker.date
        .between("1900-01-01", "2021-01-01")
        .toLocaleString(),
      runtime: faker.datatype.number({
        min: 10,
        max: 400,
      }),
      homepage: faker.internet.url(),
    },
  ];
  return {
    results: results,
  };
}

function generateGlobalState() {
  const { results } = generateFilmList();
  return {
    favourite: {
      idList: [],
      dataList: [],
    },
    watchLater: {
      idList: [],
      dataList: [],
    },
    filmInfo: {
      error: null,
      info: results[0],
    },
    filmVideo: {
      video: {
        results: [],
      },
    },
  };
}

export { generateFilmList, generateGlobalState };
