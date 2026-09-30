import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DishCard from "./DishCard";
import Shimmer from "./Shimmer";
import Footer from "./Footer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { AREAS } from "../utils/constants";
import {
  getDishesByArea,
  getDishesByCategory,
  searchDishes,
} from "../utils/foodApi";

const Body = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [area, setArea] = useState("Indian");
  const onlineStatus = useOnlineStatus();

  const load = async (fetcher) => {
    setLoading(true);
    setError(null);
    try {
      setDishes(await fetcher());
    } catch (err) {
      console.error(err);
      setError("Could not load dishes. Please try again.");
      setDishes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(() => getDishesByArea(area));
  }, [area]);

  const handleSearch = () => {
    const query = searchText.trim();
    load(() => (query ? searchDishes(query) : getDishesByArea(area)));
  };

  if (!onlineStatus) {
    return (
      <h1 className="text-center text-red-500 font-semibold text-xl py-6">
        Looks like you're offline! Please check your internet connection.
      </h1>
    );
  }

  return (
    <div className="px-4 py-6 max-w-screen-xl mx-auto">
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search dishes (e.g. biryani)..."
          className="w-80 px-5 py-3 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-orange-400 focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-orange-500 text-white px-6 py-3 text-base rounded-md hover:bg-orange-600 transition"
          onClick={handleSearch}
        >
          Search
        </button>
        <select
          className="px-4 py-3 border border-gray-300 rounded-md text-base"
          value={area}
          onChange={(e) => {
            setSearchText("");
            setArea(e.target.value);
          }}
        >
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <button
          className="bg-green-600 text-white px-6 py-3 text-sm rounded-md hover:bg-green-700 transition"
          onClick={() => load(() => getDishesByCategory("Vegetarian"))}
        >
          🥦 Vegetarian
        </button>
      </div>

      {loading ? (
        <Shimmer />
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : dishes.length === 0 ? (
        <p className="text-center text-gray-500 font-semibold">No dishes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <Link key={dish.id} to={"/dish/" + dish.id}>
              <DishCard dish={dish} />
            </Link>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Body;
