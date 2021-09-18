function fetchFilmsRequest(
  dispatch,
  fetchRequest,
  link,
  fetchSuccess,
  fetchError
) {
  dispatch(fetchRequest());
  return fetch(link)
    .then((response) => {
      response.json().then((films) => dispatch(fetchSuccess(films)));
    })
    .catch((error) => {
      const errorMsg = Promise.reject(error);
      dispatch(fetchError(errorMsg));
    });
}

export { fetchFilmsRequest };
