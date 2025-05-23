import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    name,
    cuisines,
    avgRating,
    sla: { deliveryTime },
    costForTwo,
    cloudinaryImageId,
  } = resData.info;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out h-80 w-72 flex flex-col">
      {/* Restaurant Image */}
      <img
        className="w-full h-36 object-cover"
        alt="restaurant-logo"
        src={CDN_URL + cloudinaryImageId}
      />

      {/* Restaurant Info */}
      <div className="flex flex-col justify-between flex-grow p-4">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>

        {/* Rating & Cuisines */}
        <div className="mt-2">
          <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
            <span className="text-yellow-500 font-semibold">{avgRating} ⭐</span>
            <span className="text-gray-400">|</span>
            <span>{deliveryTime} min</span>
          </div>
          <div className="text-sm text-gray-500 line-clamp-2">
            {cuisines.join(", ")}
          </div>
        </div>

        {/* Cost */}
        <div className="mt-auto text-sm text-gray-600 pt-2">
          {costForTwo}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
