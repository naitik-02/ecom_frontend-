import React from "react";
import { Badge, Container, Row, Col, Form, Pagination } from "react-bootstrap";
import { ProductData } from "../Context/ProductContext";
import ProductCard from "../Components/ProductCard";
import Loader from "../Components/Loader";

const Products = () => {
  const {
    products,
    loading,
    categories,
    price,
    SetPrice,
    page,
    setPage,
    category,
    setCategory,
    search,
    setSearch,
    totalPages,
  } = ProductData();

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Explore Our Collection</h2>

      <Row className="justify-content-center mb-4">
        <Col md={6} lg={4}>
          <div className="filters">
            <h4>Filters</h4>
            <Form>
              <Form.Control
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Form.Select
                aria-label="Category"
                className="mt-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Category</option>
                {categories &&
                  categories.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
              </Form.Select>
              <Form.Range
                className="mt-3"
                min={0}
                max={7000}
                value={price}
                onChange={(e) => SetPrice(e.target.value)}
              />
              <p className="mt-2">Minimum Price: ₹ {price}</p>
            </Form>
          </div>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Col key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <p>No Products Found</p>
          )}
        </Row>
      )}

      {totalPages && totalPages > 1 && (
        <div className="pagination-container mt-4">
          <Pagination>
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === page}
                onClick={() => setPage(i + 1)}
                style={{ cursor: "pointer" }}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default Products;
