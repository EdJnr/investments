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
      {id:0,head:'Market Cap Rank',text:coinData?.market_cap_rank},
      {id:1,head:'24h High',text:coinData?.market_data?.high_24h[currency]},
      {id:2,head:'24h Lower',text:coinData?.market_data?.low_24h[currency]},
      {id:3,head:'Circulating Supply',text:coinData?.market_data?.circulating_supply},
      {id:4,head:'Current Price',text:coinData?.market_data?.current_price[currency]},
      {id:5,head:'1y Change',text:coinData?.market_data?.price_change_percentage_1y?.toFixed(2)},
    ]
    return(
      <div className=" w-8/12 m-auto mt-36"> 
        <header className=" flex flex-col items-center">
          <img className=" w-36 h36" src={coinData?.image?.large} alt="" />
          <h2>{coinData?.name}</h2>
        </header>

        <div
        style={{
          width:700,
          height:250
        }}
        className="">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
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
          </ResponsiveContainer>
        </div>

        <section>
          <div className="details">
            {dataArr.map(({id,head,text})=>
              <div key={id} className="">
                <h3>{head}</h3>
                <p>{text}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    )
}