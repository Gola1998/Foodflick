import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo == null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const regularCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const itemCards = regularCards
    .flatMap(card => card.card?.card?.itemCards || [])
    .filter(Boolean);

  return (
    <div className="px-4 py-8 bg-gray-50 min-h-screen">
      {/* Restaurant Info Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
        <p className="text-lg text-gray-600 my-2">{cuisines?.join(", ")} - {costForTwoMessage}</p>
      </div>

      {/* Menu Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu</h2>
        <ul className="space-y-4">
          {itemCards.length > 0 ? (
            itemCards.map((item, index) => (
              <li
                key={`${item.card.info.id}-${index}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">
                    {item.card.info.name}
                  </span>
                  <span className="text-lg text-gray-700">
                    ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500">Menu not available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
