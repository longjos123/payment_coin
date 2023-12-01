import React from "react";
import PurchaseDetail from "./PurchaseDetail";

const Purchase = ({ purchases }) => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Purchar History</h1>
            <ul className="timeline">
                {purchases.map((item, i) => (
                    <PurchaseDetail item={item} key={i} customKey={i} />
                ))}
            </ul>
        </div>
    );
}

export default Purchase