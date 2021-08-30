import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {HiCurrencyRupee, HiPlus} from 'react-icons/hi';
import {BsDash} from 'react-icons/bs';
import {GiCrossMark} from 'react-icons/gi';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import Nav from './Nav';
import { increment_by_one } from '../store/actions/cartAction';
import { decrement_by_one } from '../store/actions/cartAction';
import { removeProduct } from '../store/actions/cartAction';
import { Button, Modal} from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton'
import CartSummaryTable from './CartSummaryTable';

const Cart = () => {

    const {products,totalPrice,totalQuantities} = useSelector(state => state.cartReducer);
    console.log("pro", products)

     const dispatch = useDispatch();

    const incrementByOneHandler = (productId) => {
        let productToIncId;
        let Incquantity;
        let Incprice;

        const checkForProduct = products.find(product => product.id === productId);
        productToIncId = checkForProduct.id;
        products.map(item => {
            if(item.id === productToIncId){
                item.quantity+=1
            }
        })
        Incprice  = totalPrice + checkForProduct.price;
        Incquantity = totalQuantities + 1;       
        dispatch(increment_by_one({Incprice, Incquantity}));
    };

    const decrementByOneHandler = (productId) => {
        let Decprice;
        let Decquantity;
        let findProduct = products.find(product => product.id === productId);
        let productToDecId = findProduct.id;

            if(findProduct.quantity > 1)
            {
                products.map(item =>{
                    if(item.id === productToDecId && item.quantity > 1)
                    {
                        item.quantity--
                    }
                    else{
                        item.quantity = item.quantity;
                    }
                })   
                    Decprice = totalPrice - findProduct.price;
                    Decquantity =  totalQuantities -1;
            }
            else{
                Decprice = totalPrice;
                Decquantity = totalQuantities;
            }
            dispatch(decrement_by_one({Decprice, Decquantity}));
    };



    const removeProductHandler = (productId) => {
        let priceAfterRemoval;
        let quantityAfterRemoval;
        const checkForProduct = products.find(product => product.id === productId);
        const filteredList = products.filter(product => product.id !== productId);

        priceAfterRemoval = totalPrice - checkForProduct.price * checkForProduct.quantity;
        quantityAfterRemoval = totalQuantities - checkForProduct.quantity;
        dispatch(removeProduct({filteredList, priceAfterRemoval, quantityAfterRemoval}));
     };


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const [modalShow, setModalShow] = useState(false);
        
    return (
        <>
        <Nav/>
        <div className="cart"> 
        <div className="container">
            <div className="cart_header_text">
                <h3>Your Cart</h3>
                    <span className="cart_header_icon"> 
                        <AiOutlineShoppingCart/>
                    </span>
            </div>
            {products.length > 0 ? 
            <>
                <div className="row ">
                        <div className="col_9">
                            <div className="cart_heading">
                                <div className="row">
                                    <div className="col_2">Items </div>
                                    <div className="col_2">Name</div>
                                    <div className="col_2">Price</div>
                                    <div className="col_2">Inc/Dec</div>
                                    <div className="col_2">TotalPrice</div>
                                    <div className="col_2">Remove</div>
                                </div>
                            </div>



                            {products.map(product => (
                                <div className="row verticalAlign" key = {product.id}>
                                    <div className="col_2">
                                        <div className="cart__image">
                                            <img src= {product.image} alt="" />
                                        </div>
                                    </div>
                                    <div className="col_2">
                                        <div className="cart__name">
                                            {product.title}
                                        </div>
                                    </div>
                                    <div className="col_2 cart_price">
                                        <HiCurrencyRupee/>
                                        {Math.round(product.price)}
                                    </div>
                                    <div className="col_2" id="IncDecblock">
                                        <div className="decInc">
                                            <span className="dec" onClick ={()=> decrementByOneHandler(product.id)} ><BsDash/></span>
                                            <span className="quantity" >{product.quantity}</span>
                                            <span className="inc" onClick = { () => incrementByOneHandler(product.id)}><HiPlus/></span>
                                            
                                        </div>
                               
                                    </div>

                                    <div className="col_2">
                                        <div className="cart__total text-center">
                                            <HiCurrencyRupee/>
                                            {Math.round(parseInt(product.price * product.quantity ))}
                                        </div>
                                    </div>
                                    <div className="col_2" id="cartRmvBtn">
                                        <div className="cart__remove" onClick = {()=> removeProductHandler(product.id)}>
                                            <GiCrossMark/>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    <div className="cart_col-3">
                        <div className="summary">
                            <div className="summary__heading">
                            summary
                            </div>
                            <div className="summary__details">
                                <div className="row mb-10">
                                    <div className="col-6">
                                        Total Items: 
                                    </div>
                                    <div className="col-6">
                                        {totalQuantities}
                                    </div>
                                </div>
                                <div className="row mb-10">
                                    <div className="col-6">
                                        Total Price:
                                    </div>
                                    <div className="col-6">
                                        <HiCurrencyRupee/>
                                        {Math.round(parseInt(totalPrice))}
                                    </div>
                                </div>
                                     
                                        <button type="button" className="checkout" onClick={()=>{handleShow()}}>Checkout</button>
                                    
                                        <div>
                                            <Modal show={show} onHide={handleClose}>
                                            <Modal.Header>
                                            <Modal.Title><strong>Congratulations</strong></Modal.Title>
                                            <CloseButton />
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p>Thank you purchasing. Payment Done</p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="primary" onClick={() => setModalShow(true)}>
                                                View Summary
                                            </Button>
                                                <CartSummaryTable show={modalShow} onHide={() => setModalShow(false)} />
                                            <Button variant="primary" onClick={handleClose}>
                                            Close
                                            </Button>
                                            </Modal.Footer>
                                            </Modal>
                                        </div>
                            </div>  
                        </div>
                        
                    </div>
                </div>
            </> : "Cart is Empty"}
        </div>
        </div>
        </>
    )
}

export default Cart
