import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes, heroesSelector } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const { heroesLoadingStatus } = useSelector((state) => state.heroes);
  const heroes = useSelector(heroesSelector.selectAll);
  const { activeFilter } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes(activeFilter));
    // eslint-disable-next-line
  }, [activeFilter]);

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} id={id} {...props} />;
    });
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
