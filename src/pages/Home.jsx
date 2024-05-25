import React from 'react'
import Slider from '../Components/Slider'
import { Badge, Container, Row } from 'react-bootstrap'
import { server } from '../main'

import ProductCard from '../Components/ProductCard'

import { ProductData } from '../Context/ProductContext'
import Loader from '../Components/Loader'

const Home = () => {
  const { topProducts, loading } = ProductData();
  return (
    <div>
      <Slider />

      <Container className="mt-4">
        <h4>
          Our Products <Badge bg="secondary">Top Selling</Badge>
        </h4>

        {loading ? (
          <Loader />
        ) : (
          <Row className="d-flex justify-content-center" style={{ gap: "1rem" }}>
            {topProducts && topProducts.length > 0 ? (
              topProducts.map((e) => <ProductCard key={e._id} product={e} />)
            ) : (
              <p>No Products Yet.</p>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;