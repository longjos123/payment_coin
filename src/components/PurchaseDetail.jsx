import React from "react";

const PurchaseDetail = ({ item, customKey }) => {
    return (
        <li className="timeline-item">
            <div className="timeline-panel">
                <div className="timeline-heading">
                    <h4 className="timeline-title">Đơn hàng #{customKey+1}</h4>
                    <p>
                        <small className="text-muted">
                            <i className="far fa-clock" /> {item.timestamp}
                        </small>
                    </p>
                </div>
                <div className="timeline-body">
                    <div className="card">
                        <img src={item.cart.imgURL} 
                                alt="Product 1" 
                                className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{item.cart.name}</h5>
                            <p className="card-text">Số tiền: ${item.cart.price}</p>
                            <p className="card-text">Loại coin thanh toán: {item.payment_type}</p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );

}
export default PurchaseDetail;