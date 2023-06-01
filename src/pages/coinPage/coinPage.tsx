import { useEffect, useState } from "react"
import CoinStore from "../../stores/coinDetailsStore"
import {CartesianGrid, XAxis, YAxis, Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"
import { useNavigate, useParams } from "react-router-dom"

interface stateTypes{
    currency:'usd'|'eur'|'jpy'
    days:number
}

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

export const CoinPage=()=>{
    const coinStore = CoinStore();
    const params = useParams<string>();
    const navigate = useNavigate();

    const coinData = coinStore?.coinData;

    //component states
    const[states,setState]=useState<stateTypes>({
        currency:'usd',
        days:150
    })
    const{currency,days}=states;

    //update state
    const updateState=(stateName:string,value:any[]|string|number|boolean|'usd'|'eur'|'jpy')=>{
        setState(((current) => ({...current,[stateName]:value})));
    }

    useEffect(()=>{
        params.id ? 
        coinStore.fetchCoin(params.id,currency,days)
        :
        navigate('/dashboard')
    },[])

    const dataArr = [
        {id:0,head:'2th Lower'},
    ]
    return(
        <> 
            <header>
                <img src={coinData?.image.large} alt="" />
                <h2>{coinData?.name}</h2>
            </header>

            <AreaChart
            width={500}
            height={400}
            data={coinStore.graphData}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </>
    )
}