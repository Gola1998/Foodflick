import { thumb } from "../utils/foodApi";

const DishCard = ({ dish }) => {
  const { name, image, price } = dish;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105 duration-200 ease-in-out w-full h-full flex flex-col">
      <img
        className="w-full h-40 object-cover rounded-t-lg"
        alt={name}
        src={thumb(image)}
        loading="lazy"
      />
      <div className="flex flex-col justify-between flex-grow p-4">
        <h3 className="text-base font-bold text-gray-800 line-clamp-2">{name}</h3>
        <div className="mt-auto pt-2 text-sm font-bold text-gray-600">₹{price}</div>
      </div>
    </div>
  );
};

export default DishCard;
