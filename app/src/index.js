import React from "react"
import App from "./App"
import Root from "./routes/root"
import ErrorPage from "./routes/error-page";
import SignInPage  from "./routes/sign-in.js";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./output.css"

const domNode = document.getElementById('root');
const root = createRoot(domNode)

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />
    },
    {
        path: "/sign-in/*",
        element: <SignInPage />
    },
    {
        path: "/journal",
        element: <App />
    }
])

root.render(<RouterProvider router={router}/>);