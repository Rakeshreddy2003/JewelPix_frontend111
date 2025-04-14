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

        <span className="filters-dropdowns dropdown-select">
          <button className="reset-button" onClick={handleApplyFilters}>Apply Filters</button>
        </span>
      </div>

      <div className="cards-div d-flex flex-wrap gap-4">
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

      <div className="pagination-wrapper">
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
        />
      </div>
    </div>
  );
};

export default LandingCards;
