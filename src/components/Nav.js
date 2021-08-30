import React from 'react'
import { Link } from 'react-router-dom'
import {BsFillBagFill} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Navbar } from 'react-bootstrap'
const Nav = () => {
    
    const {totalQuantities} = useSelector(state => state.cartReducer);


    return (
      <>
        <Navbar fixed="top" bg="white" id="nav">
            <div className="container">
                <div className="nav___container">
                   
                    <div className="nav__left">
                        <Link to="/">
                        <Navbar.Brand>
                        <img src="/images/newlogo.png" alt="Logo" />
                        </Navbar.Brand>
                        </Link>
                    </div>
                    <div className="nav__right">
                        <Link to="/cart">
                            <div className="basket">
                                <BsFillBagFill className = "cart-icon"/>
                                <span>{totalQuantities}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Navbar>
      </>

        
    )
}

export default Nav
