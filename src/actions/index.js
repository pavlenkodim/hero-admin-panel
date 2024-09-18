import {
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
} from "../components/heroesFilters/filtersSlice";
import {
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
} from "../components/heroesList/heroesSlice";

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
