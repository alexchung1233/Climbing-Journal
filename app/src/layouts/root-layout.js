import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Navbar } from 'flowbite-react'
import SiteFooter from '../components/SiteFooter'
import { SignOutButton } from '../components/SignOutButton'

const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


export default function RootLayout() {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <div className="topDiv">
        <header className="header">
          <div className="rootDiv">
              <Navbar fluid rounded>
                  <Navbar.Brand>
                  <p className="text-2xl self-center whitespace-nowrap font-semibold dark:text-white" > <a href="/">My Climbing Journal</a></p>
                  </Navbar.Brand>
              </Navbar>
            <SignedIn>
              <Link to="/journal">My Journal</Link>
              <SignOutButton/>
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </SignedOut>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <SiteFooter/>
      </div>
    </ClerkProvider>
  )
};
