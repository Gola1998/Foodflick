import { useEffect, useState } from "react";
import { getDishById } from "./foodApi";

const useDish = (dishId) => {
  const [state, setState] = useState({ dish: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ dish: null, loading: true, error: null });

    getDishById(dishId, controller.signal)
      .then((dish) =>
        setState({ dish, loading: false, error: dish ? null : "Dish not found" })
      )
      .catch((err) => {
        if (err.name !== "AbortError") {
          setState({ dish: null, loading: false, error: err.message });
        }
      });

    return () => controller.abort();
  }, [dishId]);

  return state;
};

export default useDish;
