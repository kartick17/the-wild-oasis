import styled from 'styled-components'
import { useUser } from '../features/authentication/useUser'
import Spinner from './Spinner'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  // Load the authenticated user
  const { isLoading, isAuthenticated } = useUser()

  useEffect(function () {
    if (!isAuthenticated && !isLoading) navigate('/login')
  })

  // If there is no authenticate user, redirect to login page
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )

  // If there is a user, render the app
  if (isAuthenticated) return children
}

export default ProtectedRoute
