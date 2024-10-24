import CabinRow from './CabinRow'
import Spinner from '../../ui/Spinner'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'

function CabinTable() {
  const { isLoading, cabins } = useCabins()
  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get('discount') || 'all'
  let filterCabins = []

  if (filterValue === 'all') filterCabins = cabins
  else if (filterValue === 'no-discount')
    filterCabins = cabins?.filter((cabin) => cabin.discount === 0)
  else if (filterValue === 'with-discount')
    filterCabins = cabins?.filter((cabin) => cabin.discount > 0)

  if (isLoading) return <Spinner />

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 0.95fr 0.05fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filterCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  )
}

export default CabinTable
