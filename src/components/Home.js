import React, {useEffect} from 'react'
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux'
import {HiCurrencyRupee} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'
import { setProdcuts } from '../store/actions/productAction'
const Home = () => {
    
    const {productArray} = useSelector((state)=> state.productsReducer);

    const dispatch = useDispatch();

    const fetchproducts = async () => {
        const respone = await axios
                .get('https://fakestoreapi.com/products')
                .catch((err) => {console.log('Err', err)})
                dispatch(setProdcuts(respone.data))
    };


    useEffect(()=> {
        fetchproducts();
        
    },[])



    return (
        <div>
            <Nav/>
            <Header/>
            <div className="container mtb-30">
                <div className="row">
                    {productArray.map((product)=>(
                        <div className="col_3" key={product.id}>
                            <div className="prodcut">
                               <Link to={`/details/${product.id}`}> <img src={product.image}  alt= {product.title}/></Link>
                            </div>
                            <div className="product_name">
                                {product.title}
                            </div>
                            <div className="row">
                                <div className="col_6">
                                    <div className="product__price">
                                        <span className="product__price_text">Price:</span>
                                        <HiCurrencyRupee/>
                                        <span className="actualPrice">
                                            {Math.round(product.price)}
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
