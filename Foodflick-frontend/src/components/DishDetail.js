import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Shimmer from "./Shimmer";
import useDish from "../utils/useDish";
import { additem } from "../utils/cartSlice";

const DishDetail = () => {
  const { dishId } = useParams();
  const { dish, loading, error } = useDish(dishId);
  const dispatch = useDispatch();

  if (loading) return <Shimmer />;

  if (error || !dish) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-semibold mb-4">{error || "Dish not found"}</p>
        <Link to="/" className="text-orange-500 underline">
          Back to home
        </Link>
      </div>
    );
  }

  const handleAdd = () =>
    dispatch(
      additem({
        id: dish.id,
        name: dish.name,
        image: dish.image,
        price: dish.price,
        description: [dish.category, dish.area].filter(Boolean).join(" • "),
      })
    );

  return (
    <div className="px-4 md:px-10 py-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full md:w-80 rounded-lg shadow object-cover"
        />
        <div className="flex-1">
          <h1 className="font-extrabold text-3xl text-gray-800">{dish.name}</h1>
          <p className="text-gray-600 mt-2 text-lg">
            {[dish.category, dish.area].filter(Boolean).join(" • ")}
          </p>
          <p className="text-2xl font-bold mt-4">₹{dish.price}</p>
          <button
            onClick={handleAdd}
            className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
          >
            Add to cart +
          </button>
          {dish.youtube && (
            <a
              href={dish.youtube}
              target="_blank"
              rel="noreferrer"
              className="block mt-4 text-orange-500 underline"
            >
              Watch how it's made
            </a>
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-3">Ingredients</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {dish.ingredients.map((ing, i) => (
          <li key={`${ing.name}-${i}`} className="bg-white rounded shadow-sm px-3 py-2 text-sm">
            <span className="font-semibold">{ing.name}</span>
            {ing.measure && <span className="text-gray-500"> — {ing.measure}</span>}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">Instructions</h2>
      <div className="space-y-3 text-gray-700">
        {dish.instructions
          .split(/\r?\n/)
          .filter((line) => line.trim())
          .map((line, i) => (
            <p key={i}>{line}</p>
          ))}
      </div>
    </div>
  );
};

export default DishDetail;
