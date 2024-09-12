import { useState } from "react";

function PlantFilter({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showInStock, setShowInStock] = useState(false);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleInStockChange = (e) => {
    setShowInStock(e.target.checked);
  };

  const applyFilters = () => {
    onFilterChange({
      category: selectedCategory,
      inStock: showInStock,
    });
  };

  return (
    <div className="filter-container p-4 bg-gray-100 rounded flex items-center min-w-max gap-8">
      <h2 className="text-xl font-bold">Filter Plants</h2>
      <div className="mb-4 flex items-center">
        <label htmlFor="category" className="block text-sm font-medium">
          Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Misc">Misc</option>
          <option value="Tree">Tree</option>
          <option value="Flower">Flower</option>
          <option value="Herb">Herb</option>
          <option value="Grass">Grass</option>
        </select>
      </div>
      <div>
        <label htmlFor="inStock" className="inline-flex items-center">
          <input
            id="inStock"
            type="checkbox"
            checked={showInStock}
            onChange={handleInStockChange}
            className="form-checkbox"
          />
          <span className="ml-2 text-sm">Show only in stock</span>
        </label>
      </div>
      <button
        onClick={applyFilters}
        className="text-white bg-green-500 hover:bg-blue-600 px-4 py-2 rounded mt-4"
      >
        Filter
      </button>
    </div>
  );
}

export default PlantFilter;
