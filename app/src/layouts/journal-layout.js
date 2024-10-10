import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function JournalLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  console.log('User logged in: ', userId)

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in')
    }
  }, [isLoaded])

  if (!isLoaded) return 'Loading...'

  return <Outlet />
}