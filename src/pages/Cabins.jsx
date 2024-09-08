import { useState } from 'react'
import CabinTable from '../features/cabins/CabinTable'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import CreateCabinForm from '../features/cabins/CreateCabinForm'

function Cabins() {
  const [showCabin, setShowCabin] = useState(false)

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <div className='flex flex-col gap-14'>
        <CabinTable />
        <Button onClick={() => setShowCabin((show) => !show)}>
          Add new cabin
        </Button>

        {showCabin && <CreateCabinForm />}
      </div>
    </>
  )
}

export default Cabins
