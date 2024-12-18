import Button from '../../ui/Button'
import { useCheckOut } from './useCheckOut'

function CheckOutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut()

  return (
    <Button
      variation='primary'
      size='small'
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  )
}

export default CheckOutButton
