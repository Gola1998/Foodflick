import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo == null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const regularCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categories = regularCards.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="px-4 md:px-10 py-6 max-w-5xl mx-auto">
      {/* Restaurant Info Section */}
      <div className="text-center mb-8">
        <h1 className="font-extrabold text-3xl text-gray-800">{name}</h1>
        <p className="text-gray-600 mt-2 text-lg">
          {cuisines?.join(", ")} • {costForTwoMessage}
        </p>
      </div>

      {/* Category Accordions */}
      <div>
        {categories.map((category) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
