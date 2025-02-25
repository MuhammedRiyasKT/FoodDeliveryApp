import { createContext, useEffect, useState } from "react";
import { addToCartApi, getAllFoodsApi, getCartDataApi, removeCartFromApi } from "../services/allApi";

export const storeContext = createContext(null)

const StoreContextProvider = (props) =>{
    const [cartItems, setCartItems] = useState({})
    const [cartData, setCartData] = useState([])
    

    useEffect(() => {
        const loadData = async () => {
            await getAllFoods();
            if(sessionStorage.getItem("token")){
                await loadCartData();
            }
        };
        loadData();
    }, []);
    
    
     const getAllFoods = async ()=>{
       try {
        const result = await getAllFoodsApi("")
        setCartData(result.data)
       } catch (error) {
        console.log(error)
       }
     }

     const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "authorization": `Bearer ${token}`
            };
    
            try {
                const response = await addToCartApi(itemId, reqHeader);
                
            } catch (error) {
                console.log(error);
            }
        }
    };

    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}))

        const token = sessionStorage.getItem("token")

        if(token){
            const reqHeader = {
                "authorization": `Bearer ${token}`
            }

            try {
                const response = await removeCartFromApi(itemId, reqHeader)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = cartData.find((product)=>product._id === item)
                totalAmount +=itemInfo.price* cartItems[item]
            }
        }
        return totalAmount;
    }

    const loadCartData = async ()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "authorization": `Bearer ${token}`
            }
            try {
                const response = await getCartDataApi(reqHeader)
                
                setCartItems(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    }

   
    const contexValue = {
        cartItems,
        cartData,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return(
        <storeContext.Provider value={contexValue}>
             {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider;

