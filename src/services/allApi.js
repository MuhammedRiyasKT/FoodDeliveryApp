import SERVER_URL from "../services/serverUrl"
import commonAPI from "./commonApi"


//api call for all foods
export const getAllFoodsApi = async (searchKey)=>{
    return await commonAPI("GET", `${SERVER_URL}/allfoods?search=${searchKey}`, "")
}

//api call for user register 

export const userRegisterApi = async (reqBody)=>{
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

export const userLoginApi = async (reqBody)=>{
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody)
}

//api call for add to cart 
export const addToCartApi = async (id, reqHeader)=>{
    return await commonAPI("POST", `${SERVER_URL}/add-cart`, { itemId: id }, reqHeader)
}

//api call for remove cart 
export const removeCartFromApi = async (id, reqHeader)=>{
    return await commonAPI("POST", `${SERVER_URL}/remove-cart`, { itemId: id }, reqHeader)
}

//api call for get cart data
export const getCartDataApi = async (reqHeader)=>{
    return await commonAPI("GET", `${SERVER_URL}/get-cart`, "", reqHeader)
}

//api call for place order
export const placeOrderApi = async (reqBody, reqHeader)=>{
    return await commonAPI("POST", `${SERVER_URL}/place-order`, reqBody, reqHeader)
}

//api call for verify payment
export const verifyPaymentApi = async (success, orderId, reqHeader)=>{
    return await commonAPI("POST", `${SERVER_URL}/verify-order`, { success, orderId }, reqHeader)
}

//api call for user orders 
export const getUserOrdersApi = async (reqHeader)=>{
    return await commonAPI("GET", `${SERVER_URL}/user-orders`, "", reqHeader)
}

