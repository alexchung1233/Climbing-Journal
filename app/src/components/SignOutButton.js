
import { useClerk } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <Link onClick={() => signOut({ redirectUrl: '/' })}>Sign out</Link>
  )
}