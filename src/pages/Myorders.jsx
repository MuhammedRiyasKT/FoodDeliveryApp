import React, { useEffect, useState } from 'react';
import { getUserOrdersApi } from '../services/allApi';
import Navbar from '../components/Navbar';

const Myorders = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUserOrders();
    }, []);

    const getUserOrders = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "authorization": `Bearer ${token}`
            };
            try {
                const response = await getUserOrdersApi(reqHeader);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h2 className="text-center mb-5">My Orders</h2>

                <div className="row g-4">
                    {data.map((order, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Order #{index + 1}</h5>
                                    <span className={`badge ${getStatusBadge(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-box fa-2x text-primary me-3"></i>
                                        <div>
                                            <strong>Items:</strong>
                                            <p className="mb-0">
                                                {order.items.map((item, idx) => (
                                                    <span key={idx}>
                                                        {item.name} x {item.quantity}
                                                        {idx !== order.items.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    </div>

                                    <p><strong>Total Amount:</strong> ${order.amount}.00</p>
                                    <p><strong>Total Items:</strong> {order.items.length}</p>
                                </div>

                                <div className="card-footer bg-white text-center">
                                    <button onClick={getUserOrders} className="btn btn-outline-primary w-100">
                                        <i className="fas fa-map-marker-alt me-2"></i>Track Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

// Helper function for status color
const getStatusBadge = (status) => {
    switch (status) {
        case 'Delivered':
            return 'bg-success';
        case 'Out For Delivery':
            return 'bg-warning text-dark';
        case 'cancelled':
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
};

export default Myorders;
