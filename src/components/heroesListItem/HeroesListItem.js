import { useHttp } from "../../hooks/http.hook";
import {
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const HeroesListItem = ({ id, name, description, element }) => {
  const { heroes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();
  let elementClassName;

  switch (element) {
    case "fire":
      elementClassName = "bg-danger bg-gradient";
      break;
    case "water":
      elementClassName = "bg-primary bg-gradient";
      break;
    case "wind":
      elementClassName = "bg-success bg-gradient";
      break;
    case "earth":
      elementClassName = "bg-secondary bg-gradient";
      break;
    default:
      elementClassName = "bg-warning bg-gradient";
  }

  const onDelete = (id) => {
    dispatch(heroesFetching());
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then(() => {
        dispatch(heroesFetched(heroes.filter((hero) => hero.id !== id)));
      })
      .catch(dispatch(heroesFetchingError()));
  };

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button
          type="button"
          className="btn-close btn-close"
          onClick={() => onDelete(id)}
          aria-label="Close"
        ></button>
      </span>
    </li>
  );
};

export default HeroesListItem;
