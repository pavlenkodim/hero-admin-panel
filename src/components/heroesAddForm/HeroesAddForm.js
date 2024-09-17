import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from "../../actions";

const HeroesAddForm = () => {
  const { heroes, filters } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      id: uuidv4(),
      name: event.currentTarget.elements.name.value,
      description: event.currentTarget.elements.text.value,
      element: event.currentTarget.elements.element.value,
    };
    if (data.element === "not_change") {
      return;
    }
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes", "POST", JSON.stringify(data))
      .then((data) => dispatch(heroesFetched([...heroes, data])))
      .catch((e) => dispatch(heroesFetchingError()));
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select required className="form-select" id="element" name="element">
          {filters.map(({ value, label }, index) => (
            <option key={index} value={value === "all" ? "not_change" : value}>
              {value === "all" ? "Я владею элементом..." : label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
