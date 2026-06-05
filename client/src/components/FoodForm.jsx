import { useState, useEffect, useRef } from "react";

function FoodForm({ refreshDashboard, refreshLogs, refreshRecommendations }) {
  const [foods, setFoods] = useState([]);
  const [foodId, setFoodId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then((res) => res.json())
      .then(setFoods)
      .catch(console.error);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = searchQuery.trim()
    ? foods.filter((f) =>
        f.food_name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  const selectedFood = foods.find((f) => f.id === Number(foodId));
  const quantityUnit = selectedFood
    ? selectedFood.serving_unit?.toLowerCase().includes("piece")
      ? "pieces"
      : selectedFood.serving_unit?.toLowerCase().includes("100ml")
      ? "ml"
      : "grams"
    : "grams";

  const handleSelect = (food) => {
    setFoodId(String(food.id));
    setSearchQuery(food.food_name);
    setShowDropdown(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setFoodId("");
    setShowDropdown(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodId || !quantity || quantity <= 0) {
      alert("Please select a food and enter a valid quantity");
      return;
    }
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/food-logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        foodId: Number(foodId),
        quantity: Number(quantity),
        mealType,
      }),
    });
    setFoodId("");
    setSearchQuery("");
    setQuantity("");
    refreshDashboard();
    refreshLogs();
    if (refreshRecommendations) refreshRecommendations();
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-5">
      <p className="text-white font-bold text-lg mb-4">Quick Add Food</p>
      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Searchable food selector */}
        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search food... (e.g. paneer, chicken)"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery && setShowDropdown(true)}
            className="w-full bg-slate-800 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-cyan-500"
          />

          {/* Selected food indicator */}
          {foodId && (
            <span className="absolute right-3 top-3.5 text-cyan-400 text-xs">✓ selected</span>
          )}

          {/* Dropdown results */}
          {showDropdown && filtered.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-white/10 rounded-xl overflow-hidden shadow-xl">
              {filtered.map((food) => (
                <div
                  key={food.id}
                  onClick={() => handleSelect(food)}
                  className="px-4 py-2.5 text-white hover:bg-slate-700 cursor-pointer text-sm border-b border-white/5 last:border-0"
                >
                  {food.food_name}
                  {food.protein_per_100g && (
                    <span className="text-gray-400 text-xs ml-2">
                      {food.protein_per_100g}g protein/100g
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {showDropdown && searchQuery.trim() && filtered.length === 0 && (
            <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-gray-400 text-sm shadow-xl">
              No food found for "{searchQuery}"
            </div>
          )}
        </div>

        <input
          type="number"
          placeholder={`Quantity (${quantityUnit})`}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full bg-slate-800 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-cyan-500"
        />

        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="w-full bg-slate-800 text-white p-3 rounded-xl border border-white/10"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Save Food
        </button>
      </form>
    </div>
  );
}

export default FoodForm;