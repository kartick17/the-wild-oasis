import Row from '../ui/Row'
import Heading from '../ui/Heading'
import CabinTable from '../features/cabins/CabinTable'
import AddCabin from '../features/cabins/AddCabin'
import CabinTableOperations from '../features/cabins/CabinTableOperations'

function Cabins() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <div className='flex flex-col gap-14'>
        <CabinTable />
        <AddCabin />
      </div>
    </>
  )
}

export default Cabins
