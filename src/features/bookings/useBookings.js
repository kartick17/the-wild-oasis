import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'

export const useBookings = () => {
  const {
    error,
    isLoading,
    data: bookings,
  } = new useQuery({
    queryFn: getBookings,
    queryKey: ['bookings'],
  })

  return { error, isLoading, bookings }
}
