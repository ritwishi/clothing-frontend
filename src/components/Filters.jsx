import React, { useState } from 'react';
import '../styles/Filters.css';

const Filters = ({ categories, filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...localFilters, [name]: value };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      search: '',
      category: 'All',
      size: '',
      minPrice: '',
      maxPrice: '',
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="filters-section">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Search</label>
        <input
          type="text"
          name="search"
          value={localFilters.search}
          onChange={handleChange}
          placeholder="Search products..."
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label>Category</label>
        <select
          name="category"
          value={localFilters.category}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Size</label>
        <select
          name="size"
          value={localFilters.size}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">All Sizes</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range</label>
        <input
          type="number"
          name="minPrice"
          value={localFilters.minPrice}
          onChange={handleChange}
          placeholder="Min Price"
          className="filter-input"
        />
        <input
          type="number"
          name="maxPrice"
          value={localFilters.maxPrice}
          onChange={handleChange}
          placeholder="Max Price"
          className="filter-input"
        />
      </div>

      <button onClick={resetFilters} className="reset-btn">
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
