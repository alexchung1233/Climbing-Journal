import React from "react"
import HomePage from "./routes/home-page.js"
import ErrorPage from "./routes/error-page";
import SignInPage  from "./routes/sign-in.js";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./output.css"
import RootLayout from "./layouts/root-layout.js";
import SignUpPage from "./routes/sign-up.js";
import JournalLayout from "./layouts/journal-layout.js";
import JournalPage from "./routes/journal.js";
import AboutPage from "./routes/about.js";

const domNode = document.getElementById('root');
const root = createRoot(domNode)

const router = createBrowserRouter([

    {
        element: < RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                errorElement: <ErrorPage />
            },
            {
                path: "/sign-in/*",
                element: <SignInPage />
            },
            {
                path: "/sign-up/*",
                element: <SignUpPage/>
            },
            {
                path: "/about",
                element: <AboutPage/>
            },
            {
                path: "journal",
                element: < JournalLayout/>,
                children: [
                    {path: "/journal", element: <JournalPage/>}
                ]
            }
        ]
    }
    
])

root.render(<RouterProvider router={router}/>);