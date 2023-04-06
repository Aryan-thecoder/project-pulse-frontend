import './Home.css'
import React from 'react'
import HomeHeader from './HomeHeader'
import HomeCard from "./HomeCard"


function Home() {
  return (
    <div>
      <HomeHeader/>
      <br/>
      <br/>
      <HomeCard/>
    </div>
  )
}

export default Home