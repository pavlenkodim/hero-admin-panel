import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { filtersActive, fetchFilters } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

const HeroesFilters = () => {
  const { filters, activeFilter } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchFilters(request));
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
