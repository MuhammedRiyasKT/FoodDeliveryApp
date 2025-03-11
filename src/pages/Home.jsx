import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import "./Home.css"
import FoodCard from '../components/FoodCard'
import Footer from '../components/Footer'
import appStore from "../../src/assets/app_store.png"
import playStore from "../../src/assets/play_store.png"
import { getAllFoodsApi } from '../services/allApi'
import { Link } from 'react-router-dom'



const Home = () => {
  
  const [allFoods, setAllFoods] = useState([])
  useEffect(()=>{
     getHomeFoods()
  }, [])

  const getHomeFoods = async ()=>{
     try {
      const result = await getAllFoodsApi("")
      console.log('this is home result', result)
      setAllFoods(result.data.slice(0,8))
     } catch (error) {
      console.log(error)
     }
  }

  return (
    <>
    <Navbar />
       <div className='home'>
       <div className='header'>
        <div className='header-contens'>
            <h2>Order your favourite food</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, in, eum nulla enim id sed at dolorum veniam iste repudiandae inventore pariatur? Temporibus ipsa id facilis delectus aut quam aliquid!</p>
           <Link to={'/menu'}> <button>Explore Menu</button></Link>
        </div>
       </div>

       <div className='food-card text-center'>
         <h2>Top dishes For You</h2>
         <FoodCard foods={allFoods} />
       </div>

       <div className='app-download text-center p-5 shadow-lg rounded-3'>
           <h3>For Better Experience Download This App</h3>
           <div className='d-flex gap-3 justify-content-center'>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="appstore" />
           </div>
       </div>
       </div>

       <Footer />
    </>
  )
}

export default Home
