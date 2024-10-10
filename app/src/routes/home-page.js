import { Link } from 'react-router-dom'
import { Navbar } from 'flowbite-react';
import React from 'react'

export default function HomePage() {
return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
          </ul>
        </nav>
      </div>
      <div class="flex flex-row min-h-screen justify-center items-center">
        <h2>
          What are you going to send today?.
        </h2>
          <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/man-rock-climbing-indoors-rear-view-joe-mcbride.jpg"></img>
      </div>
      <div id="detail"></div>
    </>
    );
}