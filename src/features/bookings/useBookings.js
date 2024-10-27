import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export const useBookings = () => {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

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

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE)

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ['bookings', filter, sortBy, page + 1],
    })

  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ['bookings', filter, sortBy, page - 1],
    })

  return { error, isLoading, bookings, count }
}
