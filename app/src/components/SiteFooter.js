
import React from 'react'
import { Footer } from "flowbite-react";

export function SiteFooter() {
  return (
    <Footer container>
      <Footer.Copyright href="#" by="My Climbing Journal™" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link>Alex Chung</Footer.Link>
        <Footer.Link>awchung1357@gmail.com</Footer.Link>
        <Footer.Link href="#">About</Footer.Link>
     </Footer.LinkGroup>
    </Footer>
  );
}