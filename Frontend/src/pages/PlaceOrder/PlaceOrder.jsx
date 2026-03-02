import React, { useContext, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
  const{getTotalCartAmount, token, food_list, cartItems, url}=useContext(StoreContext)
  
  const[data, setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangeHandler=(e)=>{
      const name=e.target.name
      const value=e.target.value
      setData(data=>({...data, [name]:value}))
    }

    //! above we have PlaceOrder and here we have placeOrder
    const placeOrder=async(e)=>{
       e.preventDefault()
       let orderItems=[]
       food_list.map((item)=>{
          if(cartItems[item._id]>0){
            // let itemInfo=item
            let itemInfo={...item}
            itemInfo["quantity"]=cartItems[item._id]
            orderItems.push(itemInfo)
          }
       })
      //  console.log(orderItems)
      let orderData={
          address:data,
          items:orderItems,
          amount:getTotalCartAmount()+40
      }
      let response=await axios.post(url+'/api/order/place', orderData, {headers:{token}})
      if(response.data.success){
         const{session_url}=response.data
         window.location.replace(session_url)
       }
       else{
         alert("Error")
       }
    }

    const navigate=useNavigate()
    useEffect(()=>{
      if(!token){
        navigate('/cart')
      }
      else if(getTotalCartAmount()===0){
        navigate('/cart')
      }
      
    },[token])

    //**for testing */
    // useEffect(()=>{
    //   console.log(data)
    // },[data])

  return (
    <form onSubmit={placeOrder} className='place-order'>
       <div className="place-order-left">
         <p className='title'>Delivery Information</p>

         <div className="multifields">
            <input required onChange={onchangeHandler} value={data.firstName} name='firstName' type="text" placeholder='First Name'/>
            <input required onChange={onchangeHandler} value={data.lastName} name='lastName' type="text" placeholder='Last Name'/>
         </div>

         <input required onChange={onchangeHandler} value={data.email} name='email' type="email" placeholder='Email address'/>
         <input required onChange={onchangeHandler} value={data.street} name='street' type="text" placeholder='Street'/>

         <div className="multifields">
            <input required onChange={onchangeHandler} value={data.city} name='city' type="text" placeholder='City'/>
            <input required onChange={onchangeHandler} value={data.state} name='state' type="text" placeholder='State'/>
         </div>

            <div className="multifields">
            <input required onChange={onchangeHandler} value={data.zipcode} name='zipcode' type="text" placeholder='Zip Code'/>
            <input required onChange={onchangeHandler} value={data.country} name='country' type="text" placeholder='Country'/>
         </div>

         <input required onChange={onchangeHandler} value={data.phone} name='phone' type='text' placeholder='Phone'/>
       </div>


       <div className="place-order-right">
                  <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Charges</p>
              <p>₹{getTotalCartAmount()===0 ? 0 : 40}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0 ? 0 : getTotalCartAmount()+40}</b>
            </div>
          </div>
             {/* //!see app.jsx placeorder route */}
             {/* //!we have used /order there that's why we are using /order here */}
          <button type='submit'>Proceed to Payment</button>
        </div>
       </div>
    </form>
  )
}

export default PlaceOrder