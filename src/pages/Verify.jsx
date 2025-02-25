import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyPaymentApi } from '../services/allApi';


const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "authorization":`Bearer ${token}`
            }
        
        try {
            const response = await verifyPaymentApi(success, orderId, reqHeader);
            setTimeout(() => { 
                if (response?.data?.success === "true") {
                    navigate('/myorders');
                } else {
                    navigate('/');
                }
                
            }, 9000);
        } catch (error) {
            navigate('/');
        }
    }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify h-screen flex flex-col items-center justify-center bg-gray-100'>
            <div className='loader mb-6'></div>
            <h2 className='text-xl font-semibold text-gray-700 animate-pulse'>Verifying your payment, please wait...</h2>
        </div>
    );
};

export default Verify;
