import { Link } from 'react-router-dom'
import { Navbar } from 'flowbite-react';
import React from 'react'

export default function HomePage() {
return (
    <>
      <div className="flex flex-row min-h-screen justify-center items-center" style={{height: "100vh"}}>
        <h2>
          What are you going to send today?
        </h2>
        <div style={{height: "100vh"}}>
          <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/man-rock-climbing-indoors-rear-view-joe-mcbride.jpg" style={{height:"800px"}}></img>
        </div>
      </div>
      <div id="detail"></div>
    </>
    );
}
