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
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105 duration-200 ease-in-out w-full h-full flex flex-col">
      {/* Restaurant Image */}
      <img
        className="w-full h-40 object-cover rounded-t-lg"
        alt={`${name} restaurant`}
        src={CDN_URL + cloudinaryImageId}
      />

      {/* Restaurant Info */}
      <div className="flex flex-col justify-between flex-grow p-4">
        <h3 className="text-base font-bold text-gray-800 truncate">{name}</h3>

        <div className="mt-2">
          <div className="text-xs text-gray-600 flex items-center gap-2 mb-1 font-bold">
            <span className="text-yellow-500">{avgRating} ⭐</span>
            <span className="text-gray-400">|</span>
            <span>{deliveryTime} min</span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 font-bold">
            {cuisines.join(", ")}
          </p>
        </div>

        <div className="mt-auto pt-2 text-xs font-bold text-gray-600">
          {costForTwo}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
