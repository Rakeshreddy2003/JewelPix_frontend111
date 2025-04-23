import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Cards from "../components/Cards";
import ReactPaginate from "react-paginate";
import "./pagination.css"; // Optional CSS for pagination styling

const LandingCards = ({ searchResults }) => {
  const [filters, setFilters] = useState({ categories: [], brands: [], priceRanges: [] });
  const [selected, setSelected] = useState({ category: "", brand: "", price: "" });
  const [cards, setCards] = useState([]);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageRange, setPageRange] = useState(window.innerWidth < 768 ? 1 : 3);

  useEffect(() => {
    const handleResize = () => {
      setPageRange(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  const currentCards = cards.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(cards.length / itemsPerPage);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products/filters`)
      .then((res) => setFilters(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("query");

    const fetchProducts = async () => {
      if (searchResults) {
        setCards(searchResults);
        return;
      }

      try {
        let res;
        if (searchQuery) {
          res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/search?query=${searchQuery}`);
        } else {
          res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        }
        setCards(res.data);
        setCurrentPage(0); // reset to page 0 when data changes
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [searchParams, searchResults]);

  const clearFilters = () => {
    setSelected({ category: "", brand: "", price: "" });

    const searchQuery = searchParams.get("query");
    const url = searchQuery
      ? `${import.meta.env.VITE_API_URL}/api/products/search?query=${searchQuery}`
      : `${import.meta.env.VITE_API_URL}/api/products`;

    axios.get(url)
      .then((res) => {
        setCards(res.data);
        setCurrentPage(0);
      })
      .catch((err) => console.error(err));
  };

  const handleApplyFilters = () => {
    const query = [];

    if (selected.category) query.push(`category=${selected.category}`);
    if (selected.brand) query.push(`brand=${selected.brand}`);
    if (selected.price) {
      const [min, max] = selected.price.split("-");
      query.push(`minPrice=${min}&maxPrice=${max}`);
    }

    const searchQuery = searchParams.get("query");
    if (searchQuery) query.push(`query=${searchQuery}`);

    const fullQuery = query.length ? `?${query.join("&")}` : "";

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products${fullQuery}`)
      .then((res) => {
        setCards(res.data);
        setCurrentPage(0);
      })
      .catch((err) => console.error(err));
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

        <span className="filters-dropdowns dropdown-select">
          <button className="reset-button" onClick={clearFilters}>Clear All</button>
        </span>

        <span className="filters-dropdowns dropdown-select" id="apply-filters">
          <button className="apply-now" onClick={handleApplyFilters}>Apply Filters</button>
        </span>
      </div>

      <div className="cards-wrapper">
        {/* Mobile: horizontal scroll rows */}
        <div className="d-md-none d-flex flex-column gap-4 mt-3">
          {[0, 1, 2].map((rowIndex) => (
            <div
              key={rowIndex}
              className="cards-row d-flex flex-nowrap overflow-auto gap-3 px-2"
              style={{ scrollSnapType: 'x mandatory' }}
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
          ))}
        </div>

        {/* Desktop: regular grid */}
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
      </div>


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

    </div>
  );
};

export default LandingCards;
