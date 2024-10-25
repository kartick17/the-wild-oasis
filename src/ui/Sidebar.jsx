import { Uploader } from '../data/Uploader'
import Logo from './Logo'
import MainNav from './MainNav'

function Sidebar() {
  return (
    <aside className='row-span-full flex flex-col gap-[3.2rem] border-r border-gray-100 px-[3.2rem] py-[2.4rem]'>
      <Logo />
      <MainNav />

      <Uploader />
    </aside>
  )
}

export default Sidebar
