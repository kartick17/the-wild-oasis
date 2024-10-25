import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

export const useBookings = () => {
  const [searchParams] = useSearchParams()

  // 1) Filter
  const filterValue = searchParams.get('status')
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue }
  // { field: 'totalPrice', value: 6000, method: 'gte' }

  const {
    error,
    isLoading,
    data: bookings,
  } = new useQuery({
    queryFn: () => getBookings({ filter }),
    queryKey: ['bookings', filter],
  })

  return { error, isLoading, bookings }
}
