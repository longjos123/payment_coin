import React from "react";

const PurchaseDetail = ({ item, payment_type }) => {
    return (
        <div className="product-container">
            <div className="wrapper">
                <div className="image-container">
                    <img src={item.imgURL} alt="Product 1" />
                </div>
            </div>
            <div className="product-info">
                <h3>{item.name}</h3>
                <p>Quantity: {item.qty}</p>
                <p>Price: {item.price} {payment_type}</p>
                <p>Total Price: {item.price * item.qty} {payment_type}</p>
            </div>
        </div>
    );

}
export default PurchaseDetail;