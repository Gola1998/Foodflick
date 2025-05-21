import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, setResinfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7192604&lng=77.173582&restaurantId=" + resId
    );
    const json = await data.json();
    setResinfo(json.data);
  };

  if (!resInfo) return <Shimmer />;

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
