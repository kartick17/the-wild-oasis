import { PAGE_SIZE } from '../utils/constants'
import supabase from './supabase'

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests,totalPrice, status, cabins(name), guests(fullName, email)',
      { count: 'exact' },
    )

  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value)
  if (sortBy)
    query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' })

  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    query = query.range(from, to)
  }

  const { data, error, count } = await query

  if (error) {
    console.error(error)
    throw new Error('Bookings could not be loaded')
  }

  return { data, count }
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(*), cabins(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new Error('Bookings could not be loaded')
  }

  return data
}
