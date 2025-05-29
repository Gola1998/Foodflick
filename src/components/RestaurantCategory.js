import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data }) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className="w-full md:w-10/12 mx-auto my-4 bg-white shadow-md rounded-md">
        {/* When the element is clicked, toggle the showItems state (true becomes false, false becomes true) */}
      <div
        className="flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-t-md"
        onClick={() => setShowItems(!showItems)} 
      >
        <span className="font-semibold text-gray-800">
          {data.title} ({data.itemCards.length})
        </span>
        <span className="text-lg transform transition-transform duration-300">
          {showItems ? "⬆️" : "⬇️"}  {/* Display an up arrow if showItems is true, otherwise display a down arrow */} 
        </span>
      </div>
      {showItems && (
        <div className="px-4 py-2">
          <ItemList items={data.itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
