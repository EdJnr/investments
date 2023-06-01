import { Outlet } from "react-router"
import { Navbar } from "../components/navbar"

export const Default=()=>{
    return(
        <>
            {/* navbar */}
            <Navbar/>

            {/* page */}
            <div
            style={{marginTop:80}}
            className="">
                <Outlet/>
            </div>

            {/* footer */}
        </>
    )
}