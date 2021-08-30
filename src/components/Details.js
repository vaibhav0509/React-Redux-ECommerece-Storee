import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {HiCurrencyRupee, HiPlus} from 'react-icons/hi'
import {BsDash} from 'react-icons/bs'
import Nav from './Nav'
import { selectedProduct } from '../store/actions/productAction'
import { addToCart } from '../store/actions/cartAction'
import { detailIncDecAddToCart } from '../store/actions/cartAction'
import { Toast, Row, Col } from 'react-bootstrap'



const Details = () => {
    const id = useParams();

    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const {productArray, productSelected} = useSelector(state => state.productsReducer);
    const {products, totalPrice,totalQuantities} = useSelector(state=> state.cartReducer);
    

    const selectedProductHandler = (productId) => {
        const productToShow = productArray.find(productToFind => productToFind.id === parseInt(productId))
        dispatch(selectedProduct(productToShow));

    };

    
    useEffect(()=>{
       selectedProductHandler(id.id);
    },[id.id]);

    const  incrementHandler = (setQuantity) =>{

        setQuantity(quantity + 1);
       
    };

    const decQuantityHandler = () => {
        if(quantity > 1)
        {
            setQuantity(quantity - 1);
        } 
    }; 

    const addToCartHandler = (productSelected, quantity) => {
        toggleShow();
        let Tquantity;
        let Tprice;

        const checkForProductInArray = products.find(pr => pr.id === productSelected.id)
        
        
            if(checkForProductInArray)
            {   
                
                products.map(item=>{

                    if(item.id === checkForProductInArray.id){
                        item.quantity++ 
                    } 
                })
                let TIncprice =  totalPrice + checkForProductInArray.price;
                let TIncquantity = totalQuantities + quantity;
                dispatch(detailIncDecAddToCart({TIncprice, TIncquantity}));
            }

            else{
                 Tprice = totalPrice + productSelected.price * quantity;
                 Tquantity = totalQuantities + quantity;
                productSelected.quantity = quantity;   
                dispatch(addToCart({productSelected, Tprice, Tquantity}));
            }
       
            // dispatch(addToCart({productSelected, Tprice, Tquantity}));
    };


    
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show);
    



    return (
        <>
        <Nav/>
        <div className = "container mt-100" key = {productSelected.id}>
            <div className="row">
                <div className="col_6">
                    <div className="detail_image">
                        <img src= {productSelected.image} alt= {productSelected.title} />
                    </div>
                </div>
                <div className="col_6">
                    <div className="detail_name">
                        {productSelected.title}
                    </div>
                    <div className="detail_price">
                        <span className="detail_actualPrice"><HiCurrencyRupee/>{Math.round(productSelected.price)}</span>
                    </div>

                    <div className="detail_info">
                        <div className="decInc">
                        <span className="dec" onClick ={decQuantityHandler}><BsDash/></span>
                        <span className="quantity" >{quantity}</span>
                        <span className="inc" onClick ={()=>incrementHandler(setQuantity)} ><HiPlus/></span>
                        <button className="btn-default" onClick={()=>{addToCartHandler(productSelected, quantity)}}>Add To Cart</button>                    
                        </div>
                    </div>

          
                    <Row>
                        <Col xs={6}>
                                <Toast show={show} onClose={toggleShow} delay={950} 
                                animation = {true}
                                autohide
                                >
                                <div className ="ToastMessageDisplay">
                                <Toast.Header >                                    
                                  <span className="msg">Product Added</span>
                                </Toast.Header>    
                                </div>                       
                                </Toast>
                        </Col>  
                    </Row>
                

                  


                    <div className="detail_productDescription">
                        <h3>Details</h3>
                        {productSelected.description}
                    </div>

                </div>
            </div>
         
        </div>
        </>
    )
}

export default Details
