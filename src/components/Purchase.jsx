import React from "react";
import PurchaseDetail from "./PurchaseDetail";

const Purchase = ({ purchase }) => {
    console.log(purchase);

    return (
        <div className="purchase-container mt-10">
            <div className="purchase-header">
                <h4>Purchase ID: {purchase.order}</h4>
                <span>Date: {purchase.timestamp}</span>
            </div>
            <div className="purchase-details">
                <p>Total Price: {purchase.total} {purchase.payment_type}</p>
                <p>Payment Method: {purchase.payment_type}</p>
            </div>
            {purchase.carts.map((item, i) => (
                <PurchaseDetail item={item} key={i} payment_type={purchase.payment_type} />
            ))}
        </div>
    );
}

export default Purchase