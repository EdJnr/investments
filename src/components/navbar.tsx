import { useNavigate } from "react-router";

export const Navbar =()=>{
    const navigate = useNavigate();
    const logout=async()=>{
        localStorage.setItem('client','');
        navigate('/');
    }
    return(
        <>
        <nav className="flex top-0 flex-row w-full fixed h-20 bg-white justify-between items-center">
            <div className=" w-10/12 lg:w-9/12 m-auto flex items-center  justify-between">
                <p 
                onClick={()=> navigate('/dashboard')}
                className=" hover:cursor-pointer text-2xl text-gray-800">Dashboard</p>
                <button
                onClick={()=>{
                    logout()
                }}
                className="  border-2 hover:border-blue-400 border-gray-300 rounded py-2 px-4 "
                >Logout</button>
            </div>
        </nav>
        </>
    )
}