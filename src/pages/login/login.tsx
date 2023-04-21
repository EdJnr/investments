import { useState } from "react";
import Header from "../../components/header";
import Alert from "../../components/alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');
    const [loading,setloading] = useState(false);
    const [alertCard,setAlert] = useState({
        state:false,
        message:''
    })

    const handleLogin=async(e:any)=>{
        e.preventDefault();
        
        try {
            setloading(true);
            const user=await axios.get(`http://localhost:3001/api/login/${email}/${password}`);
            
            if (user.data?.data?.length < 1) {
                setAlert({state:true,message:'Invalid email or password!'});
                setloading(false)
                return;
            }
            else if (user.data?.status==='success') {
                // login successful
                const to_localStorage = {...user.data.data[0],password:'#'}
                localStorage.setItem('user',JSON.stringify(to_localStorage));
                navigate('/dashboard');
                setloading(false);
            } 
            else {
                setloading(false);
                setAlert({state:true,message:'Login failed. Please retry later!'}) 
            }
        } catch (error) {
            console.log(error);
            
            setloading(false);
            setAlert({state:true,message:'Login failed. Please retry later!'})
        }
    } 
    return (
        <>
            {alertCard.state&&(
                <Alert handleCancel={()=>setAlert({state:false,message:''})} text={alertCard.message}/>
            )}

            <main className=" h-screen">
                <Header/>

                <section
                className=" flex justify-center items-center flex-col"
                style={{
                    height : 'calc(100% - 64px)'
                }}
                >
                    <h6 className=" text-3xl mb-5 ">Welcome Back</h6>
                    <form 
                    onSubmit={handleLogin}
                    className=" w-72"
                    action="">
                        <input
                        className=" border-2 outline-none focus:border-blue-300 hover:border-blue-200 mb-3 h-12 rounded w-full px-3"
                        type="email" 
                        placeholder="Email Address" 
                        onChange={(e)=>{
                            setAlert({
                                state:false,
                                message:''
                            })
                            setEmail(e.target.value);
                        }}
                        required/>

                        <input
                        className=" border-2 outline-none focus:border-blue-300 hover:border-blue-200 mb-3 h-12 rounded w-full px-3"
                        type="password" 
                        placeholder="Password" 
                        onChange={(e)=>{
                            setAlert({
                                state:false,
                                message:''
                            })
                            setPassword(e.target.value);
                        }}
                        required/>

                        {!loading ? <button
                        className=" w-full hover:bg-blue-400 bg-blue-500 rounded py-3 text-white "
                        >Login</button>
                        :
                        <button
                        className=" w-full hover:bg-blue-400 bg-blue-500 rounded py-3 text-white "
                        >Logging in...</button>}

                        <hr className=" mt-6"/>
                        <p className=" py-3">Don't have an account?</p>

                        <button
                        onClick={()=>{
                            navigate('/sign-up')
                        }}
                        className=" w-full border-2 hover:border-blue-400 border-gray-300 rounded py-3 "
                        >Create an account</button>
                    </form>
                </section>
            </main>
        </>
    );
}
 
export default Login;