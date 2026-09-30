import { useDispatch } from "react-redux";
import { removeItem } from "../utils/cartSlice";
import { thumb } from "../utils/foodApi";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className="flex flex-col md:flex-row justify-between gap-4 py-4 border-b border-gray-200"
        >
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            {item.description && (
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            )}
            <p className="text-md font-medium mt-2">₹{item.price}</p>
          </div>

          <div className="relative md:w-40 w-full">
            {item.image && (
              <img
                src={thumb(item.image, "small")}
                alt={item.name}
                className="rounded-lg w-full h-24 object-cover"
              />
            )}
            <button
              className="absolute bottom-2 right-2 bg-white border border-gray-300 px-3 py-1 rounded text-sm shadow-md hover:bg-gray-50"
              onClick={() => dispatch(removeItem(index))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
