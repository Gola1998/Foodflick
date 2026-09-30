import { getPrice, getDishesByArea, getDishById, searchDishes } from "../foodApi";

const mockFetch = (body, ok = true, status = 200) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    text: async () => body,
  });
};

test("getPrice is stable and in range", () => {
  expect(getPrice("52772")).toBe(getPrice("52772"));
  expect(getPrice("52772")).toBeGreaterThanOrEqual(150);
  expect(getPrice("52772")).toBeLessThanOrEqual(330);
});

test("getDishesByArea maps the API response", async () => {
  mockFetch(JSON.stringify({ meals: [{ idMeal: "1", strMeal: "Biryani", strMealThumb: "http://x/img.jpg" }] }));
  const dishes = await getDishesByArea("Indian");
  expect(dishes).toHaveLength(1);
  expect(dishes[0]).toMatchObject({ id: "1", name: "Biryani", image: "http://x/img.jpg" });
});

test("empty response body does not throw", async () => {
  mockFetch("");
  expect(await getDishesByArea("Indian")).toEqual([]);
});

test("search with no results returns empty list", async () => {
  mockFetch(JSON.stringify({ meals: null }));
  expect(await searchDishes("zzzz")).toEqual([]);
});

test("getDishById collects ingredients and skips empty ones", async () => {
  mockFetch(JSON.stringify({ meals: [{
    idMeal: "9", strMeal: "Dal", strMealThumb: "t", strInstructions: "Cook.",
    strIngredient1: "Lentils", strMeasure1: "1 cup",
    strIngredient2: "Salt", strMeasure2: "",
    strIngredient3: "", strMeasure3: " ",
  }] }));
  const dish = await getDishById("9");
  expect(dish.ingredients).toEqual([
    { name: "Lentils", measure: "1 cup" },
    { name: "Salt", measure: "" },
  ]);
});

test("HTTP errors are thrown", async () => {
  mockFetch("", false, 500);
  await expect(getDishesByArea("Indian")).rejects.toThrow("500");
});
