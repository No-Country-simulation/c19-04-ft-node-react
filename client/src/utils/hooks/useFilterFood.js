import { useState } from "react";

const useFilterFood = (initialFilter = "Todo") => {
  const [filters, setFilter] = useState({ type: initialFilter });

  const filterFood = (data) => {
    return data.filter((item) => {
      return filters.type === "Todo" || item.type === filters.type;
    });
  };

  const changeFilters = (newFilter) => {
    setFilter(newFilter);
  };

  return { filters, filterFood, changeFilters };
};

export default useFilterFood;
