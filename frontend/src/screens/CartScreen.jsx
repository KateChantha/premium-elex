import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

/**
 * @props match - to get product id
 * @props location - to get anything after '?' in the query string
 * @props history - to redirect
 */
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  // from query string
  // get the value after '=' (2nd element after perform split())
  // convert it to number format
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  /** api from react-redux **/
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  /**
   * after CartScreen is loaded
   * if there is productId attached with params
   * then, add product to cartItems in redux store
   */
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log('remove item')
  }

  return (
    <Row>
      <Col md={8}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>) : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
              {/* --- same dropdown qty option as in ProductScreen --- */}
              {/* except onChange will dipatch addToCart instead of setState */}
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
            ))}
              </ListGroup>
        )}
      </Col>
      <Col md={4}></Col>
    </Row>
  )
}

export default CartScreen
