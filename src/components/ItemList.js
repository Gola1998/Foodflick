import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { additem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // dispatch action
    dispatch(additem(item));
  };

  return (
    <div>
      {items.map((item, index) => {
        const { id, name, description, price, imageId } = item.card.info;
        return (
          <div
            key={`${id}-${index}`} //  Unique key: combines id with index
            className="flex flex-col md:flex-row justify-between gap-4 py-4 border-b border-gray-200"
          >
            {/* Left Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-gray-600 text-sm mt-1">{description}</p>
              <p className="text-md font-medium mt-2">₹{price / 100}</p>
            </div>

            {/* Right Image + Button */}
            <div className="relative md:w-40 w-full">
              {imageId && (
                <img
                  src={CDN_URL + imageId}
                  alt={name}
                  className="rounded-lg w-full h-24 object-cover"
                />
              )}
              <button
                className="absolute bottom-2 right-2 bg-white border border-gray-300 px-3 py-1 rounded text-sm shadow-md hover:bg-gray-50"
                onClick={() => handleAddItem(item)}
              >
                Add +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
