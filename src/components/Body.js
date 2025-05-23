import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import Footer from "./Footer";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7192604&lng=77.173582&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const restaurants =
      json?.data?.cards?.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    setListOfRestaurant(restaurants);
    setAllRestaurants(restaurants);
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return (
      <h1 className="text-center text-red-500 font-semibold text-xl py-6">
        Looks like you're offline! Please check your internet connection.
      </h1>
    );
  }

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="px-4 py-6 max-w-screen-xl mx-auto">
      {/* Search and Filter - Larger and centered */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-80 px-5 py-3 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-orange-400 focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="bg-orange-500 text-white px-6 py-3 text-base rounded-md hover:bg-orange-600 transition"
          onClick={() => {
            const filteredRes = allRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setListOfRestaurant(filteredRes);
          }}
        >
          Search
        </button>
        <button
          className="bg-orange-500 text-white px-6 py-3 text-sm rounded-md hover:bg-orange-600 transition"
          onClick={() => {
            const filteredList = allRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            setListOfRestaurant(filteredList);
          }}
        >
          ⭐ Top Rated Restaurants
        </button>
      </div>

      {/* Restaurant Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {listOfRestaurant.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Body;
