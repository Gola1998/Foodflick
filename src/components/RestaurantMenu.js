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
  console.log("Regular cards - 1st", regularCards);

  const itemCards = regularCards
    .flatMap((card) => card.card?.card?.itemCards || [])
    .filter(Boolean);

  const categories = regularCards.filter(
    (c) =>
      c.card?.card?.["@type"] ==
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );
  console.log("categories-2nd", categories);

  return (
    <div>
      {/* Restaurant Info Section */}
      <div className="text-center">
        <h1 className="font-bold my-10 text-2xl">{name}</h1>
        <p className="font-bold text-lg">
          {cuisines?.join(", ")} - {costForTwoMessage}
        </p>
        {/* categories accordions*/}
        {categories.map((category) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}

            // showitems={false}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
