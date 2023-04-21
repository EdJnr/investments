import { useState } from "react";
import Header from "../../components/header";
import Alert from "../../components/alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate=useNavigate();
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');
    const [confirmPpassword,setconfirmPassword] = useState('');

    const [loading,setloading] = useState(false);
    const [alertCard,setAlert] = useState<{state:boolean,message:string,backGround:'red'|'green'}>({
        state:false,
        message:'',
        backGround :'red'
    })

    const headers = {
        'Content-Type': 'application/json',
    };

    const handleSignUp=async(e:any)=>{
        e.preventDefault();
        if (password !== confirmPpassword) {
            setAlert({
                state:true,
                message:'Passwords do not match!',
                backGround:'red'

            })
            return;
        }
        
        try {
            setloading(true);
            const signUp=await axios.post(`http://localhost:3001/api/create`,{
                name:name,
                email:email,
                password:password
            },{
                headers:headers
            });
            console.log(signUp);
            
            setAlert({
                state:true,
                message:'Accounted Created Successfully. Login now.',
                backGround:'green'
            })

            setloading(false)            
        } catch (error) {
            console.log(error);
            
            setloading(false);
            setAlert({state:true,message:'Login failed. Please retry later!', backGround:'green'})
        }
    } 
    return (
        <>
            {alertCard.state&&(
                <Alert handleCancel={()=>setAlert({state:false,message:'',backGround:'red'})} background={alertCard.backGround!} text={alertCard.message}/>
            )}

            <main className=" h-screen">
                <Header/>

                <section
                className=" flex justify-center items-center flex-col"
                style={{
                    height : 'calc(100% - 64px)'
                }}
                >
                    <h6 className=" text-3xl mb-5 ">Create An Account</h6>
                    <form 
                    onSubmit={handleSignUp}
                    className=" w-72"
                    action="">
                        <input
                        className=" border-2 outline-none focus:border-blue-300 hover:border-blue-200 mb-3 h-12 rounded w-full px-3"
                        type="name" 
                        placeholder="What's your name..." 
                        onChange={(e)=>{
                            setAlert({
                                state:false,
                                message:'',
                                backGround:'green'
                            })
                            setName(e.target.value);
                        }}
                        required/>

                        <input
                        className=" border-2 outline-none focus:border-blue-300 hover:border-blue-200 mb-3 h-12 rounded w-full px-3"
                        type="email" 
                        placeholder="Enter your email address" 
                        onChange={(e)=>{
                            setAlert({
                                state:false,
                                message:'',
                                backGround:'green'

                            })
                            setEmail(e.target.value);
                        }}
                        required/>

                        <input
                        className=" border-2 outline-none focus:border-blue-300 hover:border-blue-200 mb-3 h-12 rounded w-full px-3"
                        type="password" 
                        placeholder="Choose a password" 
                        onChange={(e)=>{
                            setAlert({
                                state:false,
                                message:'',
                                backGround:'green'

                            })
                            setPassword(e.target.value);
                        }}
                        required/>

                        <input
                        className=" border-2 outline-none focus:border-blue-300 hover:border-blue-200 mb-3 h-12 rounded w-full px-3"
                        type="password" 
                        placeholder="Confirm password" 
                        onChange={(e)=>{
                            setAlert({
                                state:false,
                                message:'',
                                backGround:'green'

                            })
                            setconfirmPassword(e.target.value);
                        }}
                        required/>

                        {!loading ? <button
                        className=" w-full hover:bg-blue-400 bg-blue-500 rounded py-3 text-white "
                        >Submit</button>
                        :
                        <button
                        className=" w-full hover:bg-blue-400 bg-blue-500 rounded py-3 text-white "
                        >Submiting...</button>}

                        <hr className=" mt-6"/>
                        <p className=" py-3">Already have an account?</p>

                        <button
                        onClick={()=>{
                            navigate('/')
                        }}
                        className=" w-full border-2 hover:border-blue-400 border-gray-300 rounded py-3 "
                        >Log In</button>
                    </form>
                </section>
            </main>
        </>
    );
}
 
export default SignUp;