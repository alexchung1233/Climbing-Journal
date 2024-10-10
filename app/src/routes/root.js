import { Link } from 'react-router-dom'
import { Navbar } from 'flowbite-react';
import React from 'react'

export default function Root() {
return (
    <>
      <div id="sidebar">
                 <Navbar fluid rounded>
                <Navbar.Brand>
                <h1 className="text-2xl self-center whitespace-nowrap font-semibold dark:text-white" > <a href="/">My Climbing Journal</a></h1>
                </Navbar.Brand>
            </Navbar>
        <nav>
          <ul>
            <li>
              <a href={`/sign-in`}>Signin</a>
            </li>
            <li>
              <a href={`/journal`}>My Journal</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
    );
}