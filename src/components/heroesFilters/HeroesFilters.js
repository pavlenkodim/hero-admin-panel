import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import {
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
  filtersActive,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filters, activeFilter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters", "GET")
      .then((filters) => dispatch(filtersFetched(filters)))
      .catch((e) => dispatch(filtersFetchingError()));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map(({ label, value, className }) => (
            <button
              key={value}
              className={classNames("btn", className, {
                active: value === activeFilter,
              })}
              onClick={() => dispatch(filtersActive(value))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
