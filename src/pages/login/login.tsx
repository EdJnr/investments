import { useState } from "react";
import Header from "../../components/header";
import Alert from "../../components/alert";
import google from '../../assets/google.png'
import { useNavigate } from "react-router-dom";
import { app, auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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
        //firebase signin
        
        try {
            setloading(true);
            const user = await signInWithEmailAndPassword(auth,email,password);
            localStorage.setItem('client',JSON.stringify(user.user));

            setloading(false);
            navigate('/dashboard')
        } catch (error:any) {            
            setloading(false);
            setAlert({state:true,message:error?.code??'Login failed. Please retry later!'})
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
                    className="w-9/12 sm:w-7/12 md:w-72"
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

                        <p className=" mb-2 py-3">Don't have an account? <span
                        onClick={()=>{
                            navigate('/sign-up')
                        }} 
                        className=" text-blue-900 hover:cursor-pointer font-semibold underline">Sign Up</span></p>
                    
                        <hr className="w-7/12 m-auto"/>
                        <div className="flex justify-center">
                            <p className=" px-4 font-semibold text-gray-600 bg-white" style={{marginTop:-15}}>or</p>
                        </div>
                    </form>

                    <button
                    onClick={()=>{
                        setAlert({
                            state:true,
                            message:'Feature not available at the moment',
                        })
                    }}
                    className="w-9/12 flex justify-center items-center sm:w-7/12 md:w-72 mt-3 border-2 hover:border-blue-400 border-gray-300 rounded py-3 "
                    ><img className=" mr-2 w-5" src={google}/> Continue with Google</button>
                </section>
            </main>
        </>
    );
}
 
export default Login;