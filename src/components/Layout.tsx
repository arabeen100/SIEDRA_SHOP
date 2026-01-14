import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import Scrolltop from "./Scrolltotop"

const Layout  = () => {

  return (
    <div className={`w-full bg-gray-300 min-h-screen flex flex-col `}>
     
        <Scrolltop/>
        <Navbar/>
        <main className="flex-1">
        <Outlet />
        </main>
        <Footer/>
    </div>
  )
}

export default Layout