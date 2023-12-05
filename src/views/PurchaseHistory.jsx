import React, { useEffect, useState } from "react";
import '../assets/css/purchase-history.css'
import { getOrders } from "../firebase";
import { NETWORKID } from "../constants/chainId"
import Purchase from "../components/Purchase";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const PurchaseHistory = () => {
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        getOrders().then((orders) => {
            orders.filter((item) => {
                item.payment_type = NETWORKID[item.payment_type]
                item.timestamp =  new Date(item.timestamp.seconds * 1000).toLocaleString()
            })
            setPurchases(orders)
        })
    }, [])

    return (
        <div>
            <Menu />
            <div className="container">
            <h2>Purchase History</h2>
                {purchases.map((item) => (
                    <Purchase purchase={item} />
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default PurchaseHistory;