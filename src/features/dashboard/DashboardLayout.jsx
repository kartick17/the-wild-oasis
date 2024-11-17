import styled from 'styled-components'

import Stats from './Stats'
import SalesChart from './SalesChart'
import Spinner from '../../ui/Spinner'
import DurationChart from './DurationChart'
import { useCabins } from '../cabins/useCabins'
import { useRecentStays } from './useRecentStays'
import { useRecentBookings } from './useRecentBookings'
import TodayActivity from '../check-in-out/TodayActivity'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

export default function DashboardLayout() {
  const { cabins, isLoading: isLoading3 } = useCabins()
  const { isLoading: isLoading2, confirmStays } = useRecentStays()
  const { bookings, isLoading: isLoading1, numDays } = useRecentBookings()

  // console.log(bookings)

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmStays={confirmStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmStays={confirmStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}
