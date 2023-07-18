import { ArrowLeftOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { AiFillDingtalkCircle } from "react-icons/ai";

interface props{
    subPage?:boolean
}
export const Navbar =({subPage}:props)=>{
    const navigate = useNavigate();
    const login=async()=>{
        localStorage.setItem('client','');
        navigate('/sign-in');
    }
    return(
        <>
        <nav className="flex top-0 flex-row w-full z-50 fixed h-20 bg-white justify-between items-center">
            <div className={`${subPage ?'w-10/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12':'w-10/12 lg:w-9/12 2xl:w-8/12'} m-auto flex items-center justify-between`}>
                {subPage?(
                    <p
                    onClick={()=> navigate('/')}
                    className=" flex items-center hover:cursor-pointer text-2xl text-gray-800"><ArrowLeftOutlined style={{fontSize:18}} className="text-gray-500"/> <span className=" text-gray-500 ml-2 hover:text-blue-600 mb-0.5 flex items-center">back</span></p>
                ):(
                    <p 
                    onClick={()=> navigate('/')}
                    className=" hover:cursor-pointer  text-gray-800"><AiFillDingtalkCircle size={36.5}/></p>
                )}

                <button
                onClick={()=>{
                    login()
                }}
                className="  border-2 hover:border-blue-400 border-gray-300 rounded shadow-lg py-2 px-5 "
                >Login</button>
            </div>
        </nav>
        </>
    )
}