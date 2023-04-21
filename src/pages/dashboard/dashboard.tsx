import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer";
import btc from '../../assets/btcaddress.jpeg';
import tesla from '../../assets/tesla.png';
import neuralink from '../../assets/neuralink.png';
import twitter from '../../assets/twitter.png';
import app from "../../base";

export const Dashboard=()=>{
    const investRef = useRef<any>();
    const btcAddresRef = useRef<any>();
    const returnRef = useRef<any>();
    const [userData,setUserData] = useState<any>({});
    
    const[senderbtc,setSenderBtc]=useState('');
    const[amount,setAmount]=useState(0);
    const[plan,setPlan]=useState('');

    const bitcoinAddress = '18ZUFvWDi36J38p1woVRDFLVQh74ynDPkS';
    const navigate =useNavigate();
    const[btnText,setBtnText]=useState('Copy');

    const investmentIntoView=()=>{
        investRef.current.scrollIntoView({behavior: "smooth",block: 'center' });
    }

    const returnsIntoView=()=>{
        returnRef.current.scrollIntoView({behavior: "smooth",block: 'center' });
    }

    //calculate returns
    const getReturns=(amount:number,plan:string)=>{
        const  rates:any={'1w':2,'1m':3,'6m':5,'1y':7}

        return amount * rates[plan];
    }

    const handleCopyClick=()=> {
        navigator.clipboard.writeText(bitcoinAddress);
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user')!);
        setUserData(user)
        if (!user || Object.keys(user).length < 1) {
            navigate('/');
        }
    },[])

    const listItems=[
        {id:1,text:'Ensure you provide your precise crypto currency wallet address'},
        {id:2,text:'Enter amount you want to invest (minimum $50)'},
        {id:3,text:'Select your investment plan (How Long you want to invest)'},
        {id:4,text:'Analyse your potential return and re-choose plan if neccessary'},
        {id:5,text:'Send exact amount to the provided address'},
        {id:6,text:"That's all! Sit back while we put your capital to work"},
        {id:7,text:'Receive your returns when due in the the address you provided.'},
    ]

    const planOptions=[
        {id:1,plan:'Please select',value:''},
        {id:1,plan:'One week',value:'1w'},
        {id:2,plan:'One month',value:'1m'},
        {id:3,plan:'Six months',value:'6m'},
        {id:4,plan:'One year',value:'1y'},
    ]
    return(
        <>
            <main className=" m-auto">
                {/* nav */}
                <nav className="flex top-0 flex-row w-full fixed h-20 bg-white justify-between items-center">
                    <div className=" w-10/12 lg:w-9/12 m-auto flex items-center  justify-between">
                        <p className=" text-2xl text-gray-800">Dashboard</p>
                        <button
                        onClick={()=>{
                            navigate('/');
                            localStorage.setItem('user',JSON.stringify({}));
                        }}
                        className="  border-2 hover:border-blue-400 border-gray-300 rounded py-2 px-4 "
                        >Logout</button>
                    </div>
                </nav>

                {/* hero */}
                <section className=" mt-20 w-10/12 lg:w-9/12 m-auto text-left ">
                    {/* hero */}
                    <section>
                        <p className=" text-gray-400 mt-2">Musk Investments</p>
                        <p className=" text-xl">Welcome, <span className=" text-blue-700">{userData.name}</span></p>
                        
                        <div className=" text-center my-28">
                            <h1 className=" text-4xl">Invest your Crypo currency in the most reliable stocks</h1>
                            <p className=" mt-2 text-gray-600">Scroll down to learn more or start investing now</p>
                            <button
                            onClick={()=>{
                                investmentIntoView();
                            }}
                            className=" mt-5 hover:bg-blue-400 bg-blue-500 rounded py-2 px-4 text-white "
                            >Invest Now</button>
                        </div>
                    </section>
                </section>

                {/* How to */}
                <section 
                style={{borderTopLeftRadius:100,borderBottomRightRadius:100}}
                className=" bg-blue-50 py-14 ">
                    <div className="">
                        <h1 className=" text-2xl mb-7">How to get started?</h1>
                        
                        <ol className="lg:w-9/12 w-10/12 m-auto">
                            {listItems.map((item)=>
                                <li className=" my-8 text-gray-500" key={item.id}>{`${item.id}. ${item.text}`}</li>
                            )}
                        </ol>
                    </div>
                </section>

                {/* invest now */}
                <section 
                ref={investRef}
                id="invest"
                className=" w-10/12 lg:w-9/12 py-14 m-auto">
                    <h1 className=" text-2xl mb-7">Invest now!</h1>

                    <div className=" w-12/12 lg:w-96 m-auto">
                        <label className=" text-gray-500" htmlFor="yourbtc">Your Bitcoin wallet</label>
                        <input
                        className=" border-2 outline-none focus:border-blue-300 hover:border-blue-200 mb-6 h-12 rounded w-full px-3"
                        type="name" 
                        name="yourbtc"
                        placeholder="Eg. fbdhfvsjvagvghvhvghv   gcgccghcgcgccgh fz" 
                        onChange={(e)=>{
                            setSenderBtc(e.target.value)
                        }}
                        required/>

                        <label className=" text-gray-500" htmlFor="amount">How much do you want to invest?</label>
                        <input
                        className=" border-2 outline-none focus:border-blue-300 hover:border-blue-200 mb-6 h-12 rounded w-full px-3"
                        type="number" 
                        name="amount"
                        placeholder="Minimum $50" 
                        onChange={(e)=>{
                            setAmount(Number(e.target.value))
                        }}
                        required/>

                        <label className=" text-gray-500" htmlFor="amount">Select Plan?</label>
                        <select
                        className=" border-2 outline-none focus:border-blue-300 hover:border-blue-200 mb-8 h-12 rounded w-full px-3"
                        name="amount"
                        placeholder="Eg. One week"
                        onChange={(e)=>{
                            setPlan(e.target.value);
                            returnsIntoView();
                        }}
                        required>
                        {planOptions.map(({id,value,plan})=>
                            <option key={id} value={value}>{plan}</option>
                        )}
                        </select>
                    </div>

                    <hr className="w-96 m-auto"/>

                    {/* btc wallet details */}
                    {(senderbtc && amount>0 && plan)&&(
                        <div className="">
                            <p className=" mt-5 text-2xl">Potential Return : <span className=" text-green-800">{`$${getReturns(amount,plan)}`}</span></p>
                            <p className=" mt-3 text-gray-600">Please send exactly <span className=" font-semibold text-black">${amount}</span> to the bitcoin address below</p>

                            <div className="  bg-slate-100 h-44 w-36 m-auto flext justify-center mt-7 items-center">
                                <img className=" w-full h-full" src={btc} alt="btc address" />
                            </div>

                            <div className="">
                                <input
                                className=" w-80 mr-1 mt-3 lg:mt-0 border-2 outline-none bg-blue-50 focus:border-blue-300 hover:border-blue-200 mb-6 h-10 rounded  px-3"
                                type="text" 
                                ref={btcAddresRef}
                                value={bitcoinAddress}
                                name="amount"
                                required/>

                                <button
                                onClick={()=>{
                                    if (btnText==='Copy') {
                                        handleCopyClick();
                                        setBtnText('Copied');
                                        setTimeout(() => {
                                            setBtnText('Copy')
                                        }, 6000);
                                    }
                                }}
                                className=" lg:mt-5 hover:bg-blue-400 bg-blue-500 rounded py-1.5 px-4 text-white "
                                >{btnText}</button>
                            </div>

                            <p className=" t text-gray-500 mt-3">We're waiting for your payment!</p>
                            <p className=" text-gray-500">You'll receive an email confirmation within minutes after payment</p>
                        </div>
                    )}
                </section>

                <section ref={returnRef} className="flex flex-row justify-between w-10/12  md:w-8/12 lg:w-6/12 py-14 m-auto">
                    <span className=" h-16 w-20 md:h-20 md:w-24 ">
                        <img className=" w-full h-full" src={tesla} alt="tesla" />
                    </span>

                    <span className=" h-16 w-28 md:h-20 md:w-32 ">
                        <img className=" w-full h-full" src={neuralink} alt="image" />
                    </span>

                    <span className=" h-16 w-16 md:h-20 md:w-20">
                        <img className=" w-full h-full" src={twitter} alt="image" />
                    </span>
                </section>

                <Footer/>
            </main>
        </>
    )
}