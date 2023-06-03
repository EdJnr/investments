import { Outlet } from "react-router"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { useLocation } from "react-router-dom"

export const Default=()=>{
    const location = useLocation();
    return(
        <>
            {/* navbar */}
            <Navbar subPage={location.pathname==='/dashboard'?false:true}/>

            {/* page */}
            <div
            style={{marginTop:80}}
            className="">
                <Outlet/>
            </div>

            {/* footer */}
            <Footer/>
        </>
    )
}