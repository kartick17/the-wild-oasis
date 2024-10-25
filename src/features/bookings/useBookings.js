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

  // 2) Sorting
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction }

  // 3) Pagination
  const page = !searchParams.get('page') ? 1 : +searchParams.get('page')

  const {
    error,
    isLoading,
    data: { data: bookings, count } = {},
  } = new useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    queryKey: ['bookings', filter, sortBy, page],
  })

  return { error, isLoading, bookings, count }
}
