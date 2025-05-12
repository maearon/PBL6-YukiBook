import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth.js";

import Banner from "../../components/viewcate/Banner";
import Loader from "../../components/viewcate/Loader";
import MobileFilters from "../../components/viewcate/MobileFilters";
import FilterSidebar from "../../components/viewcate/FilterSidebar";
import ProductsGrid from "../../components/viewcate/ProductsGrid";
import Pagination from "../../components/viewcate/Pagination";

export default function BooksByCategory() {
  const { user, isAuthLoading } = useAuth();
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories
  useEffect(() => {
    if (isAuthLoading || !user?.token) return;
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/api/v1/categories?page=1&limit=30",
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        const list = res.data.data ?? res.data;
        setCategories(list);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, [user, isAuthLoading]);

  // Fetch products & filter by category
  useEffect(() => {
    if (isAuthLoading || !user?.token) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8081/api/v1/products?page=${currentPage}&limit=30`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        const payload = res.data.data ?? res.data;
        let prods = Array.isArray(payload.product)
          ? payload.product
          : payload;

        console.log("🚀 Fetched products:", prods);
        console.log("Filtering by categoryId:", categoryId);

        if (categoryId !== null) {
          const catIdNum = Number(categoryId);
          prods = prods.filter(p => {
            // gom tất cả ID category mà product có, bao gồm category_id từ API
            const idsRaw = [
              p.category_id,
              p.categoryId,
              p.category?.id,
              ...(Array.isArray(p.categories) ? p.categories.map(c => c.id) : [])
            ];
            const ids = idsRaw
              .filter(v => v != null)
              .map(v => Number(v));
            console.log(`Product ${p.id} categories:`, ids);
            return ids.includes(catIdNum);
          });
        }

        setBooks(prods);
        setTotalPages(payload.totalPage ?? 1);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user, isAuthLoading, categoryId, currentPage]);

  // Apply price + sort
  useEffect(() => {
    let res = books.filter(
      b => b.price >= priceRange.min && b.price <= priceRange.max
    );
    if (sortOption === "price-asc")      res.sort((a, b) => a.price - b.price);
    else if (sortOption === "price-desc") res.sort((a, b) => b.price - a.price);
    else if (sortOption === "name-asc")   res.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === "name-desc")  res.sort((a, b) => b.name.localeCompare(a.name));
    setFilteredBooks(res);
  }, [books, sortOption, priceRange]);

  // Handlers
  const handleCategoryChange = (cat) => {
    const idNum = cat?.id != null ? Number(cat.id) : null;
    setSelectedCategory(cat);
    setCategoryId(idNum);
    setCurrentPage(0);
  };
  const handleSortChange  = opt => setSortOption(opt);
  const handlePriceChange = (type, val) =>
    setPriceRange(p => ({ ...p, [type]: parseInt(val) || 0 }));
  const toggleMobileFilters = () => setShowMobileFilters(v => !v);
  const handlePageChange = p => {
    if (p >= 0 && p < totalPages) {
      setCurrentPage(p);
      window.scrollTo(0, 0);
    }
  };
  const resetFilters = () => {
    setSelectedCategory(null);
    setCategoryId(null);
    setPriceRange({ min: 0, max: 1000000 });
    setSortOption("default");
  };

  if (loading && books.length === 0) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Banner
        title={selectedCategory?.name || "Tất cả sách"}
        count={filteredBooks.length}
      />

      <div className="container mx-auto px-4 pb-12 lg:grid lg:grid-cols-4 lg:gap-8">
        <MobileFilters
          show={showMobileFilters}
          toggle={toggleMobileFilters}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />

        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />

        <div className="col-span-3 mt-6 lg:mt-0">
          <ProductsGrid
            books={filteredBooks}
            loading={loading}
            resetFilters={resetFilters}
          />

          {filteredBooks.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
