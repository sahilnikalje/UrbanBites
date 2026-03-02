import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import {toast} from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {
    const{url, setToken}=useContext(StoreContext)
    const[currentState, setCurrentState]=useState('Login')
    //todo for auth
    const[data, setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setData(data=>({...data,[name]:value}))
    }

    //todo login function
    const onLogin=async(e)=>{
        e.preventDefault()
        let newUrl=url
        if(currentState==='Login'){
            newUrl+='/api/user/login'
        }
        else{
            newUrl+='/api/user/register'
        }
        
        //! this will handle both login and register
        try{
          const response=await axios.post(newUrl, data)
          if(response.data.success){
            setToken(response.data.token)
           localStorage.setItem("token",  response.data.token)  
           toast.success(response.data.message)
           setShowLogin(false) 
          }
        }
        catch(err){
           if(err.response && err.response.data && err.response.data.message){
            toast.error(err.response.data.message)
           }
           else{
            toast.error("Something went wrong")
           }
           console.log(err.message)
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
            </div>
            <div className="login-popup-inputs">
                {currentState==='Login' ? <> </> : <input onChange={onChangeHandler} value={data.name} name='name' type='text' placeholder='Type your name here' required/>}

                <input
                   onChange={onChangeHandler} 
                   value={data.email} 
                   name='email'
                   type='email'
                   placeholder='Type your email here'
                   required
                />
                <input
                   onChange={onChangeHandler} 
                   value={data.password}
                   name='password'
                   type='password'
                   placeholder='Type your password here'
                   required
                />

                <button type='submit'>{currentState==='Sign Up' ? "Create Account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type='checkbox' required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currentState==='Login' 
                ? 
                <p>Create n new account? <span onClick={()=>setCurrentState('Sign Up')}>Click here</span></p>  
                :
                <p>Already have an account? <span onClick={()=>setCurrentState('Login')}>Login here</span></p>                      
                 }
            </div>
        </form>
    </div>
  )
}

export default LoginPopup