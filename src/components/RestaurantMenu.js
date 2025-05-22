import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  
  const { resId } = useParams();
  console.log("resId",resId);

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
    <div className="menu">
      <h1>{name}</h1>
      <p>{cuisines?.join(", ")} - {costForTwoMessage}</p>
      <h2>Menu</h2>
      <ul>
        {itemCards.length > 0 ? (
          itemCards.map((items, index) => (
            <li key={`${items.card.info.id}-${index}`}>
              {items.card.info.name} - ₹
              {items.card.info.price / 100 || items.card.info.defaultPrice / 100}
            </li>
          ))
        ) : (
          <li>Menu not available</li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
