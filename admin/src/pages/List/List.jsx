import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import './List.css'

const List = ({url}) => {
  //! no need to pass url here now, as we are passing it as a prop in app.jsx
  // const url=import.meta.env.VITE_API_URI
  const[list, setList]=useState([])

  const fetchList=async()=>{
     const response=await axios.get(`${url}/api/food/list`)
    //  console.log(response.data)
     if(response.data.success){
        setList(response.data.data)
     }
     else{
      toast.error("Could not fetch the list")
     }
  }

  const removeFood=async(foodId)=>{
    // console.log(foodId)

    //! this will remove the food
    const response=await axios.post(`${url}/api/food/remove`, {id:foodId})

    //! this will fetch the new list again so no need to reload
    await fetchList()

    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Something went wrong")
    }
  }
  useEffect(()=>{
     fetchList()
  },[])

  return (
    <div className='list add flex-col'>
       <p>All Foods List</p>
       <div className="list-table">
         <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
         </div>

            {list.map((item, index)=>{
              return(
                <div key={index} className='list-table-format'>
                   <img src={`${url}/images/`+item.image}/>
                   <p>{item.name}</p>
                   <p>{item.category}</p>
                   <p>₹{item.price}</p>
                   <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
                </div>
              )
            })}
       </div>
    </div>
  )
}

export default List