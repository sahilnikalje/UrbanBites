import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const[cartItems, setCartItems]=useState({})
    const url=import.meta.env.VITE_API_URI
    const[token, setToken]=useState("")
    const[food_list, setFood_list]=useState([])

//**these functions are to keep the record of the added items and removed items by their id */
//*todo check the console once 
    const addToCart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    //todo remove from cart function
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    }

    //todo total cart amount function
    const getTotalCartAmount=()=>{
        let totalAmount=0
        for(const item in cartItems){ //** we are using for in lopop because the cartItems is an object */
            if(cartItems[item] > 0){
                let itemInfo=food_list.find((product)=>product._id===item)
                   
               if(itemInfo){
                 totalAmount+=itemInfo.price*cartItems[item]
               }
            }
        }
        return totalAmount
    }

    //todo instead of getting food data from the assets, we are fetching it from the db
    const fetchFoodList=async()=>{
        const response=await axios.get(url+'/api/food/list')
        setFood_list(response.data.data)
    }


    //! as we use localstorage, when we refresh the page, user will get logout
    //! to prevent this we use ueeEffect with this condition
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()

          if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
          }
        }
        loadData()
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;