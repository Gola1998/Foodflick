import { FOOD_API } from "./constants";

// TheMealDB has no prices, so we generate a stable one from the dish id
// (same dish always gets the same price: ₹150 to ₹330).
export const getPrice = (id) => 150 + (Number(id) % 10) * 20;

// TheMealDB serves resized images by adding /small, /medium or /large
export const thumb = (url, size = "medium") => (url ? `${url}/${size}` : "");

const request = async (path, signal) => {
  const res = await fetch(`${FOOD_API}/${path}`, { signal });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  // Read as text first so an empty body doesn't crash with "Unexpected end of JSON input"
  const text = await res.text();
  return text ? JSON.parse(text) : { meals: null };
};

const toSummary = (m) => ({
  id: m.idMeal,
  name: m.strMeal,
  image: m.strMealThumb,
  category: m.strCategory ?? null,
  area: m.strArea ?? null,
  price: getPrice(m.idMeal),
});

export const toDetail = (m) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = m[`strIngredient${i}`]?.trim();
    if (name) {
      ingredients.push({ name, measure: m[`strMeasure${i}`]?.trim() || "" });
    }
  }
  return {
    ...toSummary(m),
    instructions: m.strInstructions || "",
    youtube: m.strYoutube || "",
    ingredients,
  };
};

export const getDishesByArea = async (area, signal) => {
  const json = await request(`filter.php?a=${encodeURIComponent(area)}`, signal);
  return (json.meals || []).map(toSummary);
};

export const getDishesByCategory = async (category, signal) => {
  const json = await request(`filter.php?c=${encodeURIComponent(category)}`, signal);
  return (json.meals || []).map(toSummary);
};

export const searchDishes = async (query, signal) => {
  const json = await request(`search.php?s=${encodeURIComponent(query)}`, signal);
  return (json.meals || []).map(toSummary);
};

export const getDishById = async (id, signal) => {
  const json = await request(`lookup.php?i=${encodeURIComponent(id)}`, signal);
  return json.meals?.[0] ? toDetail(json.meals[0]) : null;
};
