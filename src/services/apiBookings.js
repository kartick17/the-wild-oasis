import supabase from './supabase'

export async function getBookings({ filter, sortBy }) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests,totalPrice, status, cabins(name), guests(fullName, email)',
    )

  if (filter !== null)
    query = query[filter.method || 'eq'](filter.field, filter.value)

  const { data, error } = await query

  if (error) {
    console.error(error)
    throw new Error('Bookings could not be loaded')
  }

  return data
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new Error('Bookings could not be loaded')
  }

  return data
}
