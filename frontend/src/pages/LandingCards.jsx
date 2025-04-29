import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext.jsx";
import Cards from "../components/Cards";
import ReactPaginate from "react-paginate";
import "./styles/pagination.css";

const LandingCards = ({ searchResults }) => {
  const { products, filters, fetchProducts, setProducts } = useContext(ProductContext);
  const [selected, setSelected] = useState({ category: "", brand: "", price: "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [pageRange, setPageRange] = useState(window.innerWidth < 768 ? 1 : 3);

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  const currentCards = (searchResults || products).slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil((searchResults || products).length / itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setPageRange(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clearFilters = () => {
    setSelected({ category: "", brand: "", price: "" });
    fetchProducts(); // Fetch all products without filters
    setCurrentPage(0);
  };

  const handleApplyFilters = () => {
    const query = [];

    if (selected.category) query.push(`category=${selected.category}`);
    if (selected.brand) query.push(`brand=${selected.brand}`);
    if (selected.price) {
      const [min, max] = selected.price.split("-");
      query.push(`minPrice=${min}&maxPrice=${max}`);
    }

    const fullQuery = query.length ? `?${query.join("&")}` : "";
    fetchProducts(fullQuery); // Fetch products with filters
    setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="landing-page-cards background">
      <div className="filters">
        <span className="filters-dropdowns">
          <select
            className="dropdown-select"
            onChange={(e) => setSelected({ ...selected, category: e.target.value })}
            value={selected.category}
          >
            <option value="">Category</option>
            {filters.categories?.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </span>

        <span className="filters-dropdowns">
          <select
            className="dropdown-select"
            onChange={(e) => setSelected({ ...selected, brand: e.target.value })}
            value={selected.brand}
          >
            <option value="">Brand</option>
            {filters.brands?.map((brand, i) => (
              <option key={i} value={brand}>{brand}</option>
            ))}
          </select>
        </span>

        <span className="filters-dropdowns">
          <select
            className="dropdown-select"
            onChange={(e) => setSelected({ ...selected, price: e.target.value })}
            value={selected.price}
          >
            <option value="">Price</option>
            {filters.priceRanges?.map((range, i) => (
              <option key={i} value={range.value}>{range.label}</option>
            ))}
          </select>
        </span>

        <span className="filters-dropdowns">
          <button className="apply-now" onClick={clearFilters}>Clear All</button>
        </span>

        <span className="filters-dropdowns dropdown-select" id="apply-filters">
          <button className="apply-now" onClick={handleApplyFilters}>Apply Filters</button>
        </span>
      </div>

      <div className="cards-wrapper">
        {/* Mobile: horizontal scroll rows */}
        <div className="d-md-none d-flex flex-column gap-4 mt-3">
          {currentCards.length > 0 ? (
            [0, 1, 2].map((rowIndex) => (
              <div
                key={rowIndex}
                className="cards-row d-flex flex-nowrap overflow-auto gap-3 px-2"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {currentCards
                  .filter((_, idx) => idx % 3 === rowIndex)
                  .map((item) => (
                    <Cards
                      key={item._id}
                      id={item._id}
                      image={item.image}
                      name={item.title}
                      price={item.price}
                      stockStatus={item.stock}
                    />
                  ))}
              </div>
            ))
          ) : (
            <div className="no-products-found">
              <p>No similar products found. Please try adjusting your filters or search query.</p>
            </div>
          )}
        </div>

        {/* Desktop: regular grid */}
        <div className="d-none d-md-flex cards-div flex-wrap gap-4">
          {currentCards.length === 0 ? (
            <div className="no-products-found">
              <p>No similar products found. Please try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="d-none d-md-flex  cards-div flex-wrap gap-4">
              {currentCards.map((item) => (
                <Cards
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.title}
                  price={item.price}
                  stockStatus={item.stock}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {currentCards.length > 0 && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"page-btn"}
          nextClassName={"page-btn"}
          disabledClassName={"disabled"}
          breakLabel={"..."}
          marginPagesDisplayed={1}
          pageRangeDisplayed={pageRange}
        />
      )}
    </div>
  );
};

export default LandingCards;