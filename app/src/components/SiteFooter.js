
import React from 'react'
import { Footer } from "flowbite-react";

export default function SiteFooter() {
  return (
    <Footer container>
      <Footer.Copyright by="My Climbing Journal™" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link>Created by Alex Chung</Footer.Link>
        <Footer.Link>awchung1357@gmail.com</Footer.Link>
        <Footer.Link href="/about">About</Footer.Link>
     </Footer.LinkGroup>
    </Footer>
  );
}