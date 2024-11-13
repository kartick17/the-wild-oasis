import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ButtonIcon from './ButtonIcon'
import { HiOutlineUser } from 'react-icons/hi2'
import Logout from '../features/authentication/Logout'
import DarkModeToggle from './DarkModeToggle'

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`

export default function HeaderMenu() {
  const navigate = useNavigate()

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon>
          <HiOutlineUser onClick={() => navigate('/account')} />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}
