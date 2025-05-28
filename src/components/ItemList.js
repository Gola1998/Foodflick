import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
  console.log("items-4th", items);
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="m-2 p-2 border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name} - </span>
              <span>₹{item.card.info.price / 100}</span>
            </div>
            <p className="text-sm">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              <button className="p-1 bg-white shadow-sm">Add +</button>
            </div>
            <img src={CDN_URL + item.card.info.imageId} className="w-28 h-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
