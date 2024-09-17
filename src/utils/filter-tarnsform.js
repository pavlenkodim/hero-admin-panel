const filterTransform = (filter) => {
  switch (filter) {
    case "fire":
      return { label: "Огонь", value: filter };
    case "water":
      return { label: "Вода", value: filter };
    case "wind":
      return { label: "Ветер", value: filter };
    case "earth":
      return { label: "Земля", value: filter };
    default:
      return { label: "Я владею элементом...", value: "not_change" };
  }
};

export default filterTransform;
