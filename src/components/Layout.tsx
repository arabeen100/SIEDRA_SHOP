import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
const Layout  = () => {
  return (
    <div className="w-full bg-gray-300">
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout