import Logo from './Logo'
import MainNav from './MainNav'

function Sidebar() {
  return (
    <aside className='px-[3.2rem] py-[2.4rem] border-r border-gray-100 flex flex-col gap-[3.2rem] row-span-full'>
      <Logo />
      <MainNav />
    </aside>
  )
}

export default Sidebar
