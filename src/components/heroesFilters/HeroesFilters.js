import { useEffect } from "react";
import { fetchFilters } from "./filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { filtersChanged } from "./filtersSlice";

const HeroesFilters = () => {
  const { filters, activeFilter } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
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
              onClick={() => dispatch(filtersChanged(value))}
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
