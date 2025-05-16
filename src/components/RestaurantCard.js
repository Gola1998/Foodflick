import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  // console.log(props);
  const { resData } = props;
  const {
    name,
    cuisines,
    avgRating,
    deliveryTime,
    costForTwo,
    cloudinaryImageId,
  } = resData.data;
  return (
    <div className="res-card" style={{ background: "#f0f0f0" }}>
      <img
        className="res-logo"
        alt="restaurant-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <h4>{avgRating} stars</h4>
      <h4>{cuisines.join(", ")}</h4>
      <h4>₹{costForTwo / 100} for two</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
