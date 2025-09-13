import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import Scrolltop from "./Scrolltotop"

const Layout  = () => {

  return (
    <div className={`w-full bg-gray-300 `}>
     
        <Scrolltop/>
        <Navbar/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Layout