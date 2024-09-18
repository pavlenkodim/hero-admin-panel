export const fetchHeroes =
  (request, filter = "all") =>
  (dispatch) => {
    const url =
      filter === "all"
        ? "http://localhost:3001/heroes"
        : `http://localhost:3001/heroes?element=${filter}`;
    dispatch(heroesFetching());
    request(url)
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
  };

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request("http://localhost:3001/filters", "GET")
    .then((filters) => dispatch(filtersFetched(filters)))
    .catch((e) => dispatch(filtersFetchingError()));
};

export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};

export const filtersFetched = (heroes) => {
  return {
    type: "FILTERS_FETCHED",
    payload: heroes,
  };
};

export const filtersFetchingError = () => {
  return {
    type: "FILTERS_FETCHING_ERROR",
  };
};

export const filtersActive = (filter) => {
  return {
    type: "ACTIVE_FILTER_CHANGED",
    payload: filter,
  };
};
