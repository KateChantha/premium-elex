import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

/**
 * step 1. call listProducts function in useEffect
 * step 2. then, useSelecter grab the productList from state
 */
const HomeScreen = () => {
  const dispatch = useDispatch();
  
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts())
  },[dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      { loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>    
      )} 
    </>
  )
}

export default HomeScreen
