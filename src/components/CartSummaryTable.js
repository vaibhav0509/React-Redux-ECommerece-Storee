import React from 'react';
import { Button, Modal} from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {HiCurrencyRupee} from 'react-icons/hi';
import {BiReceipt} from 'react-icons/bi';
import "./CartSummaryTable.css";

// import "./CartSummaryTable.less";

const CartSummaryTable = (props) => {


    const {products,totalPrice,totalQuantities} = useSelector(state => state.cartReducer);

    return (
      <Modal {...props} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title >
            <span className="billHeaderText">
            Bill Details
            </span>
            <span className="billIcon">
            <BiReceipt/> 
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-flex" 
          style={{
            maxHeight: 'calc(100vh - 210px)',
            overflowY: 'auto'
           }}
        >
            <Row className="billHeader">
              <Col >
                Item
              </Col>
              <Col id="cart_header_space">
                Name
              </Col>
              <Col id="cart_header_space">
                Price
              </Col>
              <Col id="cart_header_space">
                Quantity
              </Col>
              <Col id="cart_header_space">
                TotalPrice
              </Col>
            </Row>
          
          {products.map(product => (
                <Row key ={product.id}>
                <Col>
                <span className="cartSummaryTableImage">
                <img src= {product.image} alt="" />
                </span>
                </Col>
                <Col className ="max-lines mt_3">
                {product.title}
                </Col>
                <Col className="mt_3">
                <HiCurrencyRupee/>

                {Math.round(product.price)}
                </Col>
                <Col className="mt_3">
                {product.quantity}
                </Col>
  
                <Col className="mt_3">
                <HiCurrencyRupee/>
                {Math.round(parseInt(product.price * product.quantity ))}
                </Col>
              </Row>
          ))}
        <Modal.Footer>
        <Row>
              
              <Col>
                TotalItems:
              </Col>
              <Col >
               <strong>{totalQuantities}</strong>
              </Col>
              <Col >
                TotalPrice:
              </Col>
              <Col >
              Rs.
              {Math.round(parseInt(totalPrice))}
              </Col>
             
        </Row>
            
        </Modal.Footer>

      
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
export default CartSummaryTable;