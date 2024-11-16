import React from 'react'
import Stat from './Stat'
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'

export default function Stats({ bookings, confirmStays, numDays, cabinCount }) {
  const numBookings = bookings?.length
  const checkIns = confirmStays?.length
  const sales = bookings?.reduce((acc, curr) => acc + curr?.totalPrice, 0)

  // num of checked-in nights / all available  nights(num days * num cabins)
  const occupation =
    confirmStays?.reduce((acc, curr) => acc + curr?.numNights, 0) /
    (numDays * cabinCount)

  return (
    <>
      <Stat
        title='Bookings'
        icon={<HiOutlineBriefcase />}
        color='blue'
        value={numBookings}
      />
      <Stat
        title='Sales'
        icon={<HiOutlineBriefcase />}
        color='green'
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        icon={<HiOutlineCalendarDays />}
        color='indigo'
        value={checkIns}
      />
      <Stat
        title='Occupancy Rate'
        icon={<HiOutlineChartBar />}
        color='green'
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  )
}
