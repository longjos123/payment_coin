import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../firebase'
import { setAlert, useGlobalState } from '../store'
import { logOutWithCometChat } from '../cometChat'
import { connectWallet } from '../shared/Freshers'
import HeaderCarousel from "./HeaderCarousel";

const Menu = () => {
    const navigate = useNavigate()
    const [isLoggedIn] = useGlobalState('isLoggedIn')
    const [connectedAccount] = useGlobalState('connectedAccount')
    const [cart] = useGlobalState('cart')

    const handleSignOut = () => {
        logout().then((res) => {
            if (res) {
                logOutWithCometChat().then(() => {
                    setAlert('Logged out successfully')
                    navigate('/signin')
                })
            }
        })
    }

    return (
        <header id="home" className="welcome-hero">
            <HeaderCarousel />
            <div className="top-area">
                <div className="header-area">
                    {/* Start Navigation */}
                    <nav
                        className="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy"
                        data-minus-value-desktop={70}
                        data-minus-value-mobile={55}
                        data-speed={1000}
                    >
                        {/* Start Top Search */}
                        <div className="top-search">
                            <div className="container">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-search" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search"
                                    />
                                    <span className="input-group-addon close-search">
                                        <i className="fa fa-times" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* End Top Search */}
                        <div className="container">
                            {/* Start Atribute Navigation */}
                            <div className="attr-nav">
                                <ul>
                                    {/*/.search*/}
                                    {isLoggedIn ? (
                                        <>
                                            <li className="search">
                                                <Link to="/purchase-history">
                                                    Purchase history
                                                </Link>
                                            </li>
                                            {connectedAccount ? null : (
                                                <li>
                                                    <Link
                                                        onClick={connectWallet}
                                                        active="light"
                                                        ripple="light"
                                                    >
                                                        <span className="cursor-pointer">Connect Wallet</span>
                                                    </Link>
                                                </li>
                                            )}
                                            <li className="nav-setting">
                                                <Link to="#" onClick={handleSignOut}>
                                                    <i className="fa fa-sign-out" aria-hidden="true" />
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <li ripple="light">
                                            <Link to="/signin" className="cursor-pointer">
                                                Login
                                            </Link>
                                        </li>
                                    )}

                                    {/*/.search*/}
                                    <li className="search">
                                        <Link to="/cart">
                                            <span className="lnr lnr-cart" />
                                            <span className="badge badge-bg-1">{cart.length}</span>
                                        </Link>
                                    </li>
                                    {/*/.dropdown*/}
                                </ul>
                            </div>
                            {/*/.attr-nav*/}
                            {/* End Atribute Navigation */}
                            {/* Start Header Navigation */}
                            <div className="navbar-header">
                                <button
                                    type="button"
                                    className="navbar-toggle"
                                    data-toggle="collapse"
                                    data-target="#navbar-menu"
                                >
                                    <i className="fa fa-bars" />
                                </button>
                                <Link className="navbar-brand" to="index.html">
                                    furn.
                                </Link>
                            </div>
                            {/*/.navbar-header*/}
                            {/* End Header Navigation */}
                            {/* Collect the nav links, forms, and other content for toggling */}
                            <div
                                className="collapse navbar-collapse menu-ui-design"
                                id="navbar-menu"
                            >
                                <ul
                                    className="nav navbar-nav navbar-center"
                                    data-in="fadeInDown"
                                    data-out="fadeOutUp"
                                >
                                    <li className=" scroll active">
                                        <Link to="/">home</Link>
                                    </li>
                                    <li className="scroll">
                                        <Link to="product/add">Add Product</Link>
                                    </li>
                                </ul>
                                {/*/.nav */}
                            </div>
                            {/* /.navbar-collapse */}
                        </div>
                        {/*/.container*/}
                    </nav>
                    {/*/nav*/}
                    {/* End Navigation */}
                </div>
                {/*/.header-area*/}
                <div className="clearfix" />
            </div>
            {/* /.top-area*/}
            {/* top-area End */}
        </header>

    );
}

export default Menu;